const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.tiresearchengine.com";

export const siteUrl = configuredSiteUrl.replace(/\/+$/g, "");
export const siteName = "Tire Search Engine";
export const gaMeasurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-RVN7E6EE7V";
const configuredIndexable = process.env.NEXT_PUBLIC_INDEXABLE;
export const isIndexable = configuredIndexable
  ? configuredIndexable === "true"
  : process.env.VERCEL_ENV === "production";
export const canonicalHost = new URL(siteUrl).hostname;

export function absoluteUrl(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${siteUrl}${cleanPath}`;
}

export function canonicalPath(path = "/") {
  if (!path || path === "/") {
    return "/";
  }

  return `/${String(path).replace(/^\/+|\/+$/g, "")}`;
}
