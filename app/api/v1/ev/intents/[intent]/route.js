import { NextResponse } from "next/server";
import { getEvIntentPageData } from "../../../../../lib/evData";

export async function GET(request, { params }) {
  const { searchParams } = new URL(request.url);

  if (!/^[a-z0-9-]+$/i.test(params.intent || "")) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const page = getEvIntentPageData(params.intent);

  if (!page) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }

  return NextResponse.json({
    ...page,
    requestContext: {
      zip: searchParams.get("zip"),
      size: searchParams.get("size"),
    },
  }, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
