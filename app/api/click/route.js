import { NextResponse } from "next/server";
import { recordOutboundClick } from "../../lib/clickStore";
import { validateMerchantTarget } from "../../lib/redirects";

export const runtime = "nodejs";

export async function GET(request) {
  const url = new URL(request.url);
  const merchant = url.searchParams.get("merchant") || "";
  const target = url.searchParams.get("target") || "";
  const validTarget = validateMerchantTarget(merchant, target);

  if (!validTarget) {
    return NextResponse.redirect(new URL("/shop-tires", request.url), 302);
  }

  await recordOutboundClick({
    merchant,
    placement: url.searchParams.get("placement") || "",
    tireSize: url.searchParams.get("tireSize") || "",
    destination: validTarget,
    path: url.pathname,
    referrer: request.headers.get("referer") || "",
    userAgent: request.headers.get("user-agent") || ""
  }).catch(() => null);

  return NextResponse.redirect(validTarget, 302);
}
