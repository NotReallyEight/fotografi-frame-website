import { NextRequest, NextResponse } from "next/server";
import { verifyBackstageToken } from "@/libs/jwt";

export const maxDuration = 60;

const MAX_CHUNK_SIZE = 4 * 1024 * 1024; // 4 MB

export async function PUT(request: NextRequest) {
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

    const uploadUrl = request.headers.get("x-upload-url");
    const contentRange = request.headers.get("content-range");
    const contentType =
      request.headers.get("content-type") || "application/octet-stream";
    const contentLengthHeader = request.headers.get("content-length");

    if (!uploadUrl || !contentRange) {
      return NextResponse.json(
        { error: "Missing upload session headers" },
        { status: 400 }
      );
    }

    const contentLength = Number(contentLengthHeader ?? "0");

    if (!Number.isFinite(contentLength) || contentLength <= 0) {
      return NextResponse.json(
        { error: "Invalid chunk size" },
        { status: 400 }
      );
    }

    if (contentLength > MAX_CHUNK_SIZE) {
      return NextResponse.json(
        { error: `Chunk exceeds ${MAX_CHUNK_SIZE / (1024 * 1024)}MB limit` },
        { status: 413 }
      );
    }

    let parsedUploadUrl: URL;

    try {
      parsedUploadUrl = new URL(uploadUrl);
    } catch {
      return NextResponse.json(
        { error: "Invalid upload URL" },
        { status: 400 }
      );
    }

    if (
      parsedUploadUrl.protocol !== "https:" ||
      parsedUploadUrl.hostname !== "www.googleapis.com" ||
      !parsedUploadUrl.pathname.startsWith("/upload/drive/v3/files")
    ) {
      return NextResponse.json(
        { error: "Unsupported upload target" },
        { status: 400 }
      );
    }

    if (!request.body) {
      return NextResponse.json({ error: "Empty chunk" }, { status: 400 });
    }

    const upstreamResponse = await fetch(parsedUploadUrl, {
      method: "PUT",
      headers: {
        "Content-Type": contentType,
        "Content-Range": contentRange,
        "Content-Length": String(contentLength),
      },
      body: request.body,
      duplex: "half",
    } as RequestInit & { duplex: "half" });

    const responseHeaders = new Headers();
    const range = upstreamResponse.headers.get("range");
    const location = upstreamResponse.headers.get("location");
    const upstreamContentType = upstreamResponse.headers.get("content-type");

    if (range) {
      responseHeaders.set("range", range);
    }

    if (location) {
      responseHeaders.set("location", location);
    }

    if (upstreamContentType) {
      responseHeaders.set("content-type", upstreamContentType);
    }

    return new NextResponse(upstreamResponse.body, {
      status: upstreamResponse.status,
      headers: responseHeaders,
    });
  } catch (error) {
    console.error("Chunk proxy error:", error);

    return NextResponse.json({ error: "Chunk upload failed" }, { status: 500 });
  }
}
