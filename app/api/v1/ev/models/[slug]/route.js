import { NextResponse } from "next/server";
import { getEvModelPageData } from "../../../../../lib/evData";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);

  if (!/^[a-z0-9-]+$/i.test(params.slug || "")) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const page = getEvModelPageData(params.slug);

  if (!page) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  const year = searchParams.get("year");
  const zip = searchParams.get("zip");

  return NextResponse.json({
    ...page,
    requestContext: {
      year,
      zip,
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
