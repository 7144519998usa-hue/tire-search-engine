import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await request.json();
  } catch {}

  return new NextResponse(null, {
    status: 204,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
