import { google } from "googleapis";
import { Readable } from "stream";

// Lazily create Drive client to avoid throwing during module import (important for builds/tests)
let cachedDrive: ReturnType<typeof google.drive> | null = null;

function initDriveIfNeeded() {
  if (cachedDrive) return cachedDrive;

  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
  const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
  const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;

  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error("Missing Google OAuth configuration in env vars");
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://127.0.0.1"
  );

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  cachedDrive = google.drive({ version: "v3", auth: oauth2Client });
  return cachedDrive;
}

/**
 * Find or create a folder in Google Drive.
 */
export async function findOrCreateFolder(
  folderName: string,
  parentFolderId: string
): Promise<string> {
  const drive = initDriveIfNeeded();

  // Search for existing folder
  const searchResponse = await drive.files.list({
    q: `name='${folderName.replace(/'/g, "\\'")}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed=false`,
    spaces: "drive",
    fields: "files(id)",
    pageSize: 1,
  });

  if (searchResponse.data.files && searchResponse.data.files.length > 0) {
    return searchResponse.data.files[0].id!;
  }

  // Create new folder
  const fileMetadata = {
    name: folderName,
    mimeType: "application/vnd.google-apps.folder",
    parents: [parentFolderId],
  };

  const response = await drive.files.create({
    requestBody: fileMetadata,
    fields: "id",
  });

  if (!response.data.id) {
    throw new Error(`Failed to create folder: ${folderName}`);
  }

  return response.data.id;
}

/**
 * Upload a file to a Google Drive folder.
 */
export async function uploadFileToFolder(
  fileName: string,
  fileStream: ReadableStream<Uint8Array>,
  mimeType: string,
  folderId: string
): Promise<string> {
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType,
    body: Readable.fromWeb(fileStream as never),
  };

  const drive = initDriveIfNeeded();

  const response = await drive.files.create({
    requestBody: fileMetadata,
    media,
    fields: "id, webViewLink",
  });

  if (!response.data.id) {
    throw new Error(`Failed to upload file: ${fileName}`);
  }

  return response.data.id;
}

/**
 * Get the parent backstage folder ID.
 */
export function getBackstageFolderId(): string {
  const id = process.env.HIRPINIA_DRIVE_FOLDER_ID;
  if (!id) throw new Error("Missing HIRPINIA_DRIVE_FOLDER_ID in env vars");
  return id;
}
