import { NextRequest, NextResponse } from "next/server";
import { YoutubeTranscript } from "youtube-transcript";

function extractVideoId(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  // Already a bare video id
  if (/^[\w-]{11}$/.test(raw)) return raw;

  try {
    const url = new URL(raw.startsWith("http") ? raw : `https://${raw}`);
    const host = url.hostname.replace(/^www\./, "");

    if (host === "youtu.be") {
      const id = url.pathname.split("/").filter(Boolean)[0];
      return id && /^[\w-]{11}$/.test(id) ? id : null;
    }

    if (host.endsWith("youtube.com") || host.endsWith("youtube-nocookie.com")) {
      const v = url.searchParams.get("v");
      if (v && /^[\w-]{11}$/.test(v)) return v;

      const parts = url.pathname.split("/").filter(Boolean);
      // /embed/ID, /shorts/ID, /live/ID
      if (
        parts.length >= 2 &&
        ["embed", "shorts", "live", "v"].includes(parts[0]) &&
        /^[\w-]{11}$/.test(parts[1])
      ) {
        return parts[1];
      }
    }
  } catch {
    return null;
  }

  return null;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const url = typeof body?.url === "string" ? body.url : "";

    if (!url.trim()) {
      return NextResponse.json(
        { error: "YouTube URL is required" },
        { status: 400 },
      );
    }

    const videoId = extractVideoId(url);
    if (!videoId) {
      return NextResponse.json(
        {
          error:
            "Invalid YouTube URL. Paste a full link like https://www.youtube.com/watch?v=... or https://youtu.be/...",
        },
        { status: 400 },
      );
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    const text = transcript
      .map((t) => t.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    if (!text) {
      return NextResponse.json(
        {
          error:
            "No captions found for this video. Try a public video with subtitles enabled.",
        },
        { status: 422 },
      );
    }

    return NextResponse.json({ success: true, text, videoId });
  } catch (error) {
    console.error("YouTube Transcript Error:", error);
    return NextResponse.json(
      {
        error:
          "Failed to fetch transcript. The video might not have captions, is private/restricted, or is temporarily unavailable.",
      },
      { status: 500 },
    );
  }
}
