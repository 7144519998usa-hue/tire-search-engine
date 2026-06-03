import { NextResponse } from "next/server";
import { normalizeTireSize, parseMalformedNearSlug } from "./app/lib/tireSizeParser";

const rootHost = "tiresearchengine.com";
const canonicalHost = "www.tiresearchengine.com";
const tireIntents = new Set([
  "best",
  "budget",
  "price",
  "comparison",
  "all-season",
  "all-weather",
  "all-terrain",
  "truck",
  "drive",
  "steer",
  "trailer",
  "quiet",
  "winter",
  "summer",
  "wet-road",
  "mud-terrain",
  "performance",
  "commercial"
]);

function normalizeSizeSlug(value = "") {
  return normalizeTireSize(value) || String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function middleware(request) {
  const url = request.nextUrl.clone();
  const host = (request.headers.get("host") || "").toLowerCase();
  const forwardedProto = (request.headers.get("x-forwarded-proto") || "").toLowerCase();
  const isRealDomain = host === rootHost || host === canonicalHost;

  if (!isRealDomain) {
    return NextResponse.next();
  }

  let shouldRedirect = false;

  if (host === rootHost) {
    url.hostname = canonicalHost;
    shouldRedirect = true;
  }

  if (url.protocol === "http:" || forwardedProto === "http") {
    url.protocol = "https:";
    shouldRedirect = true;
  }

  if (url.pathname !== "/" && url.pathname.endsWith("/")) {
    url.pathname = url.pathname.replace(/\/+$/g, "");
    shouldRedirect = true;
  }

  const redirectMap = {
    "/tire-size-guide": "/tire-university/tire-size-guide",
    "/fleet-tire-pricing": "/commercial-truck-tires/fleet-pricing",
    "/recap-vs-new-truck-tires": "/tire-university/retread-vs-new-truck-tires",
    "/commercial-truck-tires/steer": "/commercial-truck-tires/positions/steer",
    "/commercial-truck-tires/drive": "/commercial-truck-tires/positions/drive",
    "/commercial-truck-tires/trailer": "/commercial-truck-tires/positions/trailer",
    "/commercial-truck-tires/fleet": "/commercial-truck-tires/fleet-pricing",
    "/commercial-truck-tires/retread": "/tire-university/retread-vs-new-truck-tires"
  };

  if (redirectMap[url.pathname]) {
    url.pathname = redirectMap[url.pathname];
    shouldRedirect = true;
  }

  const parts = url.pathname.split("/").filter(Boolean);
  if (parts[0] === "tires") {
    const malformedNear = parts[1] ? parseMalformedNearSlug(parts[1]) : null;
    if (malformedNear) {
      url.pathname = `/tires/${malformedNear.size.slug}/near/${malformedNear.cityStateSlug}`;
      shouldRedirect = true;
    } else if (parts.length === 3 && tireIntents.has(parts[1])) {
      url.pathname = `/tires/${normalizeSizeSlug(parts[2])}/${parts[1]}`;
      shouldRedirect = true;
    } else if (parts.length === 3 && /^\d{2,3}$/.test(parts[1]) && /^[\d]{2}r?\d{2}(?:\.\d)?$/i.test(parts[2])) {
      url.pathname = `/tires/${normalizeSizeSlug(`${parts[1]}-${parts[2]}`)}`;
      shouldRedirect = true;
    } else if (parts.length >= 2) {
      const normalizedSize = normalizeSizeSlug(parts[1]);
      if (normalizedSize !== parts[1]) {
        parts[1] = normalizedSize;
        url.pathname = `/${parts.join("/")}`;
        shouldRedirect = true;
      }
    }
  }

  return shouldRedirect ? NextResponse.redirect(url, 308) : NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)"]
};
