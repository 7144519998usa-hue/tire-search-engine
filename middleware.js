import { NextResponse } from "next/server";
import {
  findRateLimitRule,
  getClientIp,
  getUserAgent,
  isBlockedMethod,
  isRateLimited,
  isSuspiciousUserAgent,
} from "./app/lib/requestSecurity";

function unauthorizedResponse() {
  return new NextResponse("Unauthorized", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Protected preview"',
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function methodNotAllowedResponse() {
  return new NextResponse("Method not allowed", {
    status: 405,
    headers: {
      "Cache-Control": "no-store",
      "Allow": "GET, HEAD, OPTIONS, POST",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function forbiddenResponse() {
  return new NextResponse("Not found", {
    status: 404,
    headers: {
      "Cache-Control": "no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function rateLimitedResponse(windowMs) {
  const retryAfter = Math.ceil(windowMs / 1000);

  return new NextResponse("Too many requests", {
    status: 429,
    headers: {
      "Cache-Control": "no-store",
      "Retry-After": String(retryAfter),
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}

function addSecurityHeaders(response, nonProduction) {
  if (nonProduction) {
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  response.headers.set("X-DNS-Prefetch-Control", "off");
  response.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  response.headers.set("Cross-Origin-Resource-Policy", "same-origin");
  response.headers.set("Origin-Agent-Cluster", "?1");
  return response;
}

function hasValidPreviewAuth(request) {
  const username = process.env.TSE_PREVIEW_USERNAME;
  const password = process.env.TSE_PREVIEW_PASSWORD;

  if (!username || !password) {
    return false;
  }

  const authHeader = request.headers.get("authorization");
  if (!authHeader?.startsWith("Basic ")) {
    return false;
  }

  try {
    const decoded = atob(authHeader.slice(6));
    const [providedUser, providedPass] = decoded.split(":");
    return providedUser === username && providedPass === password;
  } catch {
    return false;
  }
}

export function middleware(request) {
  const env = process.env.TSE_ENV || process.env.VERCEL_ENV || "local";
  const isLocal = env === "local";
  const isProduction = env === "production";
  const pathname = request.nextUrl.pathname;
  const userAgent = getUserAgent(request);
  const clientIp = getClientIp(request);
  const edgeSharedSecret = process.env.TSE_EDGE_SHARED_SECRET;
  const protectedOriginPrefixes = ["/api/", "/visit/"];

  if (isBlockedMethod(request.method)) {
    return methodNotAllowedResponse();
  }

  if (!isLocal && !isProduction) {
    const credentialsConfigured =
      Boolean(process.env.TSE_PREVIEW_USERNAME) && Boolean(process.env.TSE_PREVIEW_PASSWORD);

    if (!credentialsConfigured) {
      return forbiddenResponse();
    }

    if (!hasValidPreviewAuth(request)) {
      return unauthorizedResponse();
    }
  }

  if (pathname.startsWith("/api/import-csv")) {
    return forbiddenResponse();
  }

  if (
    isProduction &&
    edgeSharedSecret &&
    protectedOriginPrefixes.some((prefix) => pathname.startsWith(prefix)) &&
    request.headers.get("x-tse-edge-secret") !== edgeSharedSecret
  ) {
    return forbiddenResponse();
  }

  if (pathname.startsWith("/api/v1/")) {
    const internalApiKey = process.env.TSE_INTERNAL_API_KEY;
    const providedKey = request.headers.get("x-tse-internal-key");

    if (!internalApiKey || providedKey !== internalApiKey) {
      return forbiddenResponse();
    }
  }

  if (
    (pathname.startsWith("/visit/") ||
      pathname.startsWith("/api/affiliate-click") ||
      pathname.startsWith("/api/v1/offers/search") ||
      pathname.startsWith("/api/v1/installers/search")) &&
    isSuspiciousUserAgent(userAgent)
  ) {
    return forbiddenResponse();
  }

  const rateLimitRule = findRateLimitRule(pathname);
  if (rateLimitRule && isRateLimited(`${pathname}:${clientIp}`, rateLimitRule.windowMs, rateLimitRule.max)) {
    return rateLimitedResponse(rateLimitRule.windowMs);
  }

  const response = NextResponse.next();
  return addSecurityHeaders(response, !isProduction);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|txt|xml)$).*)",
  ],
};
