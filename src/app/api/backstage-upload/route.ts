import { NextRequest, NextResponse } from "next/server";
import { verifyBackstageToken } from "@/libs/jwt";
import {
  createResumableUploadSession,
  findOrCreateFolder,
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

type UploadFileDescriptor = {
  name: string;
  size: number;
  type: string;
};

const hasAllowedExtension = (fileName: string) => {
  const lowerCaseName = fileName.toLowerCase();

  return ALLOWED_EXTENSIONS.some((extension) =>
    lowerCaseName.endsWith(extension)
  );
};

const isUploadFileDescriptor = (
  value: unknown
): value is UploadFileDescriptor => {
  if (!value || typeof value !== "object") {
    return false;
  }

  const candidate = value as Partial<UploadFileDescriptor>;

  return (
    typeof candidate.name === "string" &&
    typeof candidate.size === "number" &&
    Number.isFinite(candidate.size) &&
    candidate.size >= 0 &&
    typeof candidate.type === "string"
  );
};

export async function POST(request: NextRequest) {
  try {
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

    const body = await request.json().catch(() => null);

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const {
      firstName,
      lastName,
      files: rawFiles,
    } = body as {
      firstName?: unknown;
      lastName?: unknown;
      files?: unknown;
    };

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return NextResponse.json(
        { error: "First name and last name must be text values" },
        { status: 400 }
      );
    }

    if (!Array.isArray(rawFiles) || !rawFiles.every(isUploadFileDescriptor)) {
      return NextResponse.json(
        { error: "All media entries must be valid file descriptors" },
        { status: 400 }
      );
    }

    const files = rawFiles;

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

      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          {
            error: `File ${file.name} exceeds ${MAX_FILE_SIZE / (1024 * 1024)}MB limit`,
          },
          { status: 400 }
        );
      }
    }

    const folderName = `${firstName.trim()}_${lastName.trim()}`;
    const parentFolderId = getBackstageFolderId();
    const userFolderId = await findOrCreateFolder(folderName, parentFolderId);

    const uploadSessions: Array<UploadFileDescriptor & { uploadUrl: string }> =
      [];

    for (let index = 0; index < files.length; index += 2) {
      const batch = files.slice(index, index + 2);

      const batchResults = await Promise.all(
        batch.map(async (file) => {
          const uploadUrl = await createResumableUploadSession({
            fileName: file.name,
            mimeType: file.type,
            folderId: userFolderId,
            fileSize: file.size,
          });

          return {
            name: file.name,
            size: file.size,
            type: file.type,
            uploadUrl,
          };
        })
      );

      uploadSessions.push(...batchResults);
    }

    return NextResponse.json({
      success: true,
      message: `Ready to upload ${uploadSessions.length} file(s) to ${folderName}`,
      folderName,
      uploadSessions,
    });
  } catch (error) {
    console.error("Upload error:", error);

    return NextResponse.json(
      { error: "Upload failed. Please try again." },
      { status: 500 }
    );
  }
}
