const SUSPICIOUS_USER_AGENT_PATTERNS = [
  /python-requests/i,
  /python-urllib/i,
  /curl/i,
  /wget/i,
  /scrapy/i,
  /httpclient/i,
  /go-http-client/i,
  /libwww-perl/i,
  /java\//i,
  /axios/i,
  /node-fetch/i,
  /aiohttp/i,
  /postmanruntime/i,
];

const KNOWN_GOOD_BOT_PATTERNS = [
  /googlebot/i,
  /bingbot/i,
  /applebot/i,
  /duckduckbot/i,
  /slurp/i,
  /linkedinbot/i,
  /twitterbot/i,
  /facebookexternalhit/i,
];

const RATE_LIMIT_RULES = [
  { prefix: "/visit/", windowMs: 60 * 1000, max: 20 },
  { prefix: "/api/affiliate-click", windowMs: 60 * 1000, max: 20 },
  { prefix: "/api/v1/offers/search", windowMs: 60 * 1000, max: 15 },
  { prefix: "/api/v1/installers/search", windowMs: 60 * 1000, max: 30 },
  { prefix: "/api/v1/analytics/event", windowMs: 60 * 1000, max: 45 },
  { prefix: "/api/", windowMs: 60 * 1000, max: 60 },
];

export function getRateStore() {
  if (!globalThis.__tseRateStore) {
    globalThis.__tseRateStore = new Map();
  }

  return globalThis.__tseRateStore;
}

export function getClientIp(request) {
  return (
    request.ip ||
    request.headers.get("cf-connecting-ip") ||
    request.headers.get("x-forwarded-for") ||
    request.headers.get("x-real-ip") ||
    "anonymous"
  );
}

export function getUserAgent(request) {
  return request.headers.get("user-agent") || "";
}

export function isSuspiciousUserAgent(userAgent) {
  if (!userAgent) {
    return true;
  }

  if (KNOWN_GOOD_BOT_PATTERNS.some((pattern) => pattern.test(userAgent))) {
    return false;
  }

  return SUSPICIOUS_USER_AGENT_PATTERNS.some((pattern) => pattern.test(userAgent));
}

export function findRateLimitRule(pathname) {
  return RATE_LIMIT_RULES.find((rule) => pathname.startsWith(rule.prefix)) || null;
}

export function isRateLimited(key, windowMs, max) {
  const store = getRateStore();
  const now = Date.now();
  const existing = store.get(key);

  if (!existing || now - existing.startedAt > windowMs) {
    store.set(key, {
      startedAt: now,
      count: 1,
    });
    return false;
  }

  existing.count += 1;
  store.set(key, existing);
  return existing.count > max;
}

export function isBlockedMethod(method) {
  return ["TRACE", "TRACK", "CONNECT"].includes(String(method || "").toUpperCase());
}
