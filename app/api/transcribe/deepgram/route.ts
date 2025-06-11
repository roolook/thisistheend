import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { youtube_url } = await req.json();

  // Call the Render backend for transcription
  const response = await fetch("https://finalytbackend.onrender.com/api/yt-to-text", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: youtube_url }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json({ error: errorData.error || 'Transcription failed' }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json(data);
}
