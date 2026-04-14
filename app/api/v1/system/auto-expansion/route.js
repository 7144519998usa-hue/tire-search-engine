import { NextResponse } from "next/server";
import { getAutoExpansionReport } from "../../../../lib/autoExpansion";

export async function GET() {
  return NextResponse.json(getAutoExpansionReport(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
