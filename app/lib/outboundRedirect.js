import "server-only";
import crypto from "crypto";
import { getServerEnv } from "./env";

const encoder = new TextEncoder();

function base64UrlEncode(value) {
  return Buffer.from(value)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function base64UrlDecode(value) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  return Buffer.from(`${normalized}${padding}`, "base64");
}

function getKey(secret) {
  return crypto.createHash("sha256").update(encoder.encode(secret)).digest();
}

function isAllowedHost(url) {
  const { allowlistedOutboundHosts } = getServerEnv();
  const allowlist = allowlistedOutboundHosts
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);

  return allowlist.includes(url.hostname.toLowerCase());
}

export function buildProtectedRedirectHref({
  destination,
  merchant = "",
  surface = "",
  placement = "",
  score = "",
}) {
  const { redirectSecret } = getServerEnv();

  if (!destination || !redirectSecret) {
    return "#";
  }

  let parsed;
  try {
    parsed = new URL(destination);
  } catch {
    return "#";
  }

  if (!isAllowedHost(parsed)) {
    return "#";
  }

  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(redirectSecret), iv);
  const payload = JSON.stringify({
    destination: parsed.toString(),
    merchant,
    surface,
    placement,
    score,
    issuedAt: Date.now(),
  });
  const encrypted = Buffer.concat([cipher.update(payload, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  const token = [iv, authTag, encrypted].map(base64UrlEncode).join(".");

  return `/visit/${token}`;
}

export function resolveProtectedRedirectToken(token) {
  const { redirectSecret } = getServerEnv();

  if (!redirectSecret || !token) {
    return null;
  }

  const [ivPart, tagPart, encryptedPart] = String(token).split(".");
  if (!ivPart || !tagPart || !encryptedPart) {
    return null;
  }

  try {
    const decipher = crypto.createDecipheriv(
      "aes-256-gcm",
      getKey(redirectSecret),
      base64UrlDecode(ivPart)
    );
    decipher.setAuthTag(base64UrlDecode(tagPart));
    const decrypted = Buffer.concat([
      decipher.update(base64UrlDecode(encryptedPart)),
      decipher.final(),
    ]).toString("utf8");
    const payload = JSON.parse(decrypted);
    const parsed = new URL(payload.destination);

    if (!isAllowedHost(parsed)) {
      return null;
    }

    return {
      destination: parsed.toString(),
      merchant: payload.merchant || "",
      surface: payload.surface || "",
      placement: payload.placement || "",
      score: payload.score ?? "",
      issuedAt: payload.issuedAt || 0,
    };
  } catch {
    return null;
  }
}
