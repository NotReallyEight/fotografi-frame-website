import { NextRequest, NextResponse } from "next/server";
import { verifyBackstageToken } from "@/libs/jwt";
import {
  findOrCreateFolder,
  uploadFileToFolder,
  getBackstageFolderId,
} from "@/libs/google-drive";

const MAX_FILE_SIZE = 250 * 1024 * 1024; // 250 MB per file
const MAX_FILES = 25;
const ALLOWED_EXTENSIONS = [
  ".jpg",
  ".jpeg",
  ".png",
  ".gif",
  ".webp",
  ".avif",
  ".heic",
  ".heif",
  ".mp4",
  ".mov",
  ".webm",
  ".m4v",
  ".avi",
  ".mkv",
];

const hasAllowedExtension = (fileName: string) => {
  const lowerCaseName = fileName.toLowerCase();

  return ALLOWED_EXTENSIONS.some((extension) =>
    lowerCaseName.endsWith(extension)
  );
};

export async function POST(request: NextRequest) {
  try {
    // Extract and validate the code token from query params
    const code = request.nextUrl.searchParams.get("code");

    if (!code) {
      return NextResponse.json(
        { error: "Missing authorization code" },
        { status: 401 }
      );
    }

    try {
      verifyBackstageToken(code);
    } catch {
      return NextResponse.json(
        { error: "Invalid authorization code" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const rawFirstName = formData.get("firstName");
    const rawLastName = formData.get("lastName");
    const rawFiles = formData.getAll("media");

    if (typeof rawFirstName !== "string" || typeof rawLastName !== "string") {
      return NextResponse.json(
        {
          error: "First name and last name must be text values",
        },
        {
          status: 400,
        }
      );
    }

    if (!rawFiles.every((value) => value instanceof File)) {
      return NextResponse.json(
        { error: "All media entries must be files" },
        { status: 400 }
      );
    }

    const firstName = rawFirstName;
    const lastName = rawLastName;
    const files = rawFiles;

    // Validate inputs
    if (!firstName.trim() || !lastName.trim()) {
      return NextResponse.json(
        { error: "First name and last name are required" },
        { status: 400 }
      );
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: "At least one file is required" },
        { status: 400 }
      );
    }

    if (files.length > MAX_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_FILES} files allowed per submission` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (!hasAllowedExtension(file.name)) {
        return NextResponse.json(
          { error: `File ${file.name} is not a supported media type` },
          { status: 400 }
        );
      }

      // Validate file sizes
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
          },
          { status: 400 }
        );
      }
    }

    // Create folder path: "FirstName_LastName"
    const folderName = `${firstName.trim()}_${lastName.trim()}`;
    const parentFolderId = getBackstageFolderId();

    // Find or create the user's folder
    const userFolderId = await findOrCreateFolder(folderName, parentFolderId);

    // Upload all files in small batches to keep memory pressure low
    const uploadedFiles = [];

    for (let index = 0; index < files.length; index += 2) {
      const batch = files.slice(index, index + 2);

      const batchResults = await Promise.all(
        batch.map(async (file) => {
          const fileId = await uploadFileToFolder(
            file.name,
            file.stream(),
            file.type,
            userFolderId
          );

          return {
            name: file.name,
            id: fileId,
            size: file.size,
          };
        })
      );

      uploadedFiles.push(...batchResults);
    }

    return NextResponse.json({
      success: true,
      message: `Successfully uploaded ${uploadedFiles.length} file(s) to ${folderName}`,
      uploadedFiles,
      folderName,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
