import { google } from "googleapis";
import { Readable } from "stream";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const HIRPINIA_DRIVE_FOLDER_ID = process.env.HIRPINIA_DRIVE_FOLDER_ID;

if (
  !GOOGLE_CLIENT_ID ||
  !GOOGLE_CLIENT_SECRET ||
  !GOOGLE_REFRESH_TOKEN ||
  !HIRPINIA_DRIVE_FOLDER_ID
) {
  throw new Error("Missing Google OAuth configuration in env vars");
}

// Initialize OAuth2 client
const oauth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  process.env.GOOGLE_OAUTH_REDIRECT_URI || "http://127.0.0.1"
);

oauth2Client.setCredentials({
  refresh_token: GOOGLE_REFRESH_TOKEN,
});

const drive = google.drive({ version: "v3", auth: oauth2Client });

/**
 * Find or create a folder in Google Drive.
 */
export async function findOrCreateFolder(
  folderName: string,
  parentFolderId: string
): Promise<string> {
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
  fileBuffer: Buffer,
  mimeType: string,
  folderId: string
): Promise<string> {
  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType,
    body: Readable.from(fileBuffer),
  };

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
  return HIRPINIA_DRIVE_FOLDER_ID!;
}
