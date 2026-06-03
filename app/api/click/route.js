import { NextResponse } from "next/server";
import { validateMerchantTarget } from "../../lib/redirects";

export function GET(request) {
  const url = new URL(request.url);
  const merchant = url.searchParams.get("merchant") || "";
  const target = url.searchParams.get("target") || "";
  const validTarget = validateMerchantTarget(merchant, target);

  if (!validTarget) {
    return NextResponse.redirect(new URL("/shop-tires", request.url), 302);
  }

  console.log("outbound_click", {
    merchant,
    placement: url.searchParams.get("placement") || "",
    tireSize: url.searchParams.get("tireSize") || "",
    destination: validTarget,
    timestamp: new Date().toISOString()
  });

  return NextResponse.redirect(validTarget, 302);
}
