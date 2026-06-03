import { NextResponse } from "next/server";
import { validateMerchantTarget } from "../../lib/redirects";

export function GET(request, { params }) {
  const url = new URL(request.url);
  const target = url.searchParams.get("target") || "";
  const validTarget = validateMerchantTarget(params.merchant, target);

  if (!validTarget) {
    return NextResponse.redirect(new URL("/shop-tires", request.url), 302);
  }

  return NextResponse.redirect(validTarget, 302);
}

