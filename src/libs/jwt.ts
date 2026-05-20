import crypto from "crypto";

const SECRET =
  process.env.BACKSTAGE_UPLOAD_SECRET || "fallback-secret-change-me";

export interface BackstageUploadPayload {
  aud: "hirpinia-backstage";
  role: "uploader";
}

/**
 * Generate a JWT token for backstage uploads.
 * This should be used to create the link with ?code=...
 */
export function generateBackstageToken(): string {
  const header = Buffer.from(
    JSON.stringify({ alg: "HS256", typ: "JWT" })
  ).toString("base64url");

  const payload = Buffer.from(
    JSON.stringify({
      aud: "hirpinia-backstage",
      role: "uploader",
      iat: Math.floor(Date.now() / 1000),
    } as BackstageUploadPayload & { iat: number })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", SECRET)
    .update(`${header}.${payload}`)
    .digest("base64url");

  return `${header}.${payload}.${signature}`;
}

/**
 * Verify and decode a backstage upload token.
 */
export function verifyBackstageToken(token: string): BackstageUploadPayload {
  const parts = token.split(".");

  if (parts.length !== 3) {
    throw new Error("Invalid token format");
  }

  const [headerB64, payloadB64, signatureB64] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", SECRET)
    .update(`${headerB64}.${payloadB64}`)
    .digest("base64url");

  if (signatureB64 !== expectedSignature) {
    throw new Error("Invalid token signature");
  }

  const payload = JSON.parse(
    Buffer.from(payloadB64, "base64url").toString("utf-8")
  ) as BackstageUploadPayload & { iat?: number };

  if (payload.aud !== "hirpinia-backstage" || payload.role !== "uploader") {
    throw new Error("Invalid token claims");
  }

  return {
    aud: payload.aud,
    role: payload.role,
  };
}
