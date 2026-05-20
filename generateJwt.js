#!/usr/bin/env node
const crypto = require("crypto");

console.log(process.env.BACKSTAGE_UPLOAD_SECRET);

const SECRET =
  process.env.BACKSTAGE_UPLOAD_SECRET || "fallback-secret-change-me";
const BASE = process.env.BACKSTAGE_BASE_URL || "http://localhost:3000";

function base64url(input) {
  const b64 = Buffer.from(input).toString("base64");
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function sign(data, secret) {
  const sig = crypto.createHmac("sha256", secret).update(data).digest("base64");
  return sig.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function generateToken() {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const payload = base64url(
    JSON.stringify({
      aud: "hirpinia-backstage",
      role: "uploader",
      iat: Math.floor(Date.now() / 1000),
    })
  );
  const signature = sign(`${header}.${payload}`, SECRET);
  return `${header}.${payload}.${signature}`;
}

function main() {
  try {
    const token = generateToken();
    const url = `${BASE.replace(/\/$/, "")}/hirpinia-film-lab/backstage?code=${token}`;
    console.log(url);
  } catch (err) {
    console.error("Failed to generate token:", err);
    process.exit(1);
  }
}

if (require.main === module) main();

module.exports = { generateToken };
