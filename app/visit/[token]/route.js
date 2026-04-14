import { NextResponse } from "next/server";
import { resolveProtectedRedirectToken } from "../../lib/outboundRedirect";

function buildResponse(status) {
  return new NextResponse("Not found", {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

export async function GET(request, { params }) {
  const payload = resolveProtectedRedirectToken(params.token);

  if (!payload?.destination) {
    return buildResponse(404);
  }

  try {
    const redirectUrl = new URL(payload.destination);
    redirectUrl.searchParams.set("utm_source", "tiresearchengine");
    redirectUrl.searchParams.set("utm_medium", "affiliate");

    return NextResponse.redirect(redirectUrl, {
      status: 307,
      headers: {
        "Cache-Control": "no-store",
        "X-Robots-Tag": "noindex, nofollow, noarchive",
      },
    });
  } catch {
    return buildResponse(404);
  }
}
