import { NextRequest, NextResponse } from "next/server";
import { verifyBackstageToken } from "@/libs/jwt";
import {
  findOrCreateFolder,
  uploadFileToFolder,
  getBackstageFolderId,
} from "@/libs/google-drive";

const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_FILES = 10;

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
        { error: "Invalid or expired authorization code" },
        { status: 401 }
      );
    }

    // Parse form data
    const formData = await request.formData();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const files = formData.getAll("media") as File[];

    // Validate inputs
    if (!firstName?.trim() || !lastName?.trim()) {
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

    // Validate file sizes
    for (const file of files) {
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

    // Upload all files
    const uploadedFiles = [];

    for (const file of files) {
      const buffer = await file.arrayBuffer();
      const fileId = await uploadFileToFolder(
        file.name,
        Buffer.from(buffer),
        file.type,
        userFolderId
      );

      uploadedFiles.push({
        name: file.name,
        id: fileId,
        size: file.size,
      });
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
