import { NextResponse } from "next/server";
import { searchInstallers } from "../../../../lib/evData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const zip = searchParams.get("zip") || "";
  const radius = Number(searchParams.get("radius") || 25);

  if (zip && !/^\d{5}$/.test(zip)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (!Number.isFinite(radius) || radius < 1 || radius > 100) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  return NextResponse.json({
    installers: searchInstallers(zip, radius),
    meta: {
      zip,
      radius,
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
