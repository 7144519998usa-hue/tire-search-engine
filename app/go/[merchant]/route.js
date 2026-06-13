import { recordOutboundClick } from "../../lib/clickStore.js";
import { validateMerchantTarget } from "../../lib/redirects.js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  try {
    const url = new URL(request.url);
    const merchant = params?.merchant || "";
    const target = url.searchParams.get("target") || "";
    const validTarget = validateMerchantTarget(merchant, target);

    if (!validTarget) {
      return Response.redirect(new URL("/shop-tires", request.url), 302);
    }

    await recordOutboundClick({
      merchant,
      placement: url.searchParams.get("placement") || "",
      tireSize: url.searchParams.get("tireSize") || "",
      destination: validTarget,
      path: url.pathname,
      referrer: request.headers.get("referer") || "",
      userAgent: request.headers.get("user-agent") || ""
    }).catch((error) => {
      console.error("tse_outbound_click_record_failed", error?.message || String(error));
    });

    return Response.redirect(validTarget, 302);
  } catch (error) {
    console.error("tse_go_redirect_failed", error?.message || String(error));
    return Response.redirect(new URL("/shop-tires", request.url), 302);
  }
}
