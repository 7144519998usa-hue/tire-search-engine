import { NextResponse } from "next/server";
import { buildPageRegistry, getPageRegistrySummary } from "../../../../lib/pageRegistry";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get("mode") || "summary";

  if (mode === "full") {
    return NextResponse.json({
      summary: getPageRegistrySummary(),
      entries: buildPageRegistry(),
    }, {
      headers: {
        "Cache-Control": "no-store",
      },
    });
  }

  return NextResponse.json(getPageRegistrySummary(), {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
