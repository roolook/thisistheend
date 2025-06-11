import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { transcript } = await req.json();

  if (!Array.isArray(transcript) || transcript.length === 0) {
    return NextResponse.json({ error: "Valid transcript array is required" }, { status: 400 });
  }

  // Call the Render backend for analysis
  const response = await fetch("https://finalytbackend.onrender.com/api/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ transcript }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    return NextResponse.json({ error: errorData.error || 'Analysis failed' }, { status: response.status });
  }

  const result = await response.json();
  return NextResponse.json(result);
}
