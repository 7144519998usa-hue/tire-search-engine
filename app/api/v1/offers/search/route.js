import { NextResponse } from "next/server";
import { searchEvOffers } from "../../../../lib/evData";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const context = body?.context || {};
  const fitment = body?.fitment || {};
  const filters = body?.filters || {};
  const sort = body?.sort || {};
  const allowedPageTypes = new Set(["ev_model", "ev_intent", "ev_brand"]);
  const allowedSortModes = new Set(["best_value", "merchant_epc", "price_first", "range_first"]);

  if (context.page_type && !allowedPageTypes.has(context.page_type)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (sort.mode && !allowedSortModes.has(sort.mode)) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  if (String(fitment.size || "").length > 32) {
    return NextResponse.json({ error: "invalid_request" }, { status: 400 });
  }

  const result = searchEvOffers({
    modelSlug: context.page_type === "ev_model" ? context.page_key : "",
    intentSlug: context.page_type === "ev_intent" ? context.page_key : "",
    brandSlug: context.page_type === "ev_brand" ? context.page_key : "",
    fitmentSize: fitment.size || "",
    filters: {
      season: filters.season || [],
      evBadges: filters.ev_badges || [],
      loadDesignation: filters.load_designation || [],
      teslaMarks: filters.oem_markings?.tesla || [],
    },
    sortMode: sort.mode || "best_value",
  });

  return NextResponse.json(result, {
    headers: {
      "Cache-Control": "no-store",
    },
  });
}
