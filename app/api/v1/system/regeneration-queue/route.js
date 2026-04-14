import { NextResponse } from "next/server";
import { buildPageRegistry } from "../../../../lib/pageRegistry";
import { buildRegenerationQueue } from "../../../../lib/regenerationQueue";

export async function GET() {
  return NextResponse.json({
    generatedAt: new Date().toISOString(),
    items: buildRegenerationQueue(buildPageRegistry()),
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
