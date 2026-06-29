const allowedHostsByMerchant = {
  "tire-rack": [
    "tirerack.com",
    "www.tirerack.com",
    "anrdoezrs.net",
    "www.anrdoezrs.net",
    "jdoqocy.com",
    "www.jdoqocy.com",
    "kqzyfj.com",
    "www.kqzyfj.com",
    "pjatr.com",
    "www.pjatr.com",
    "tkqlhce.com",
    "www.tkqlhce.com",
    "tqlkg.com",
    "www.tqlkg.com"
  ],
  mavis: ["mavis.com", "www.mavis.com", "dpbolvw.net", "www.dpbolvw.net"],
  amazon: ["amazon.com", "www.amazon.com"]
};

export function merchantSlug(value = "") {
  return String(value || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function buildGoUrl({
  merchant = "",
  href = "",
  placement = "",
  tireSize = "",
  productId = "",
  offerLabel = "",
  offerType = "",
  targetKind = ""
} = {}) {
  if (String(href || "").startsWith("#") || String(href || "").startsWith("/")) {
    return href;
  }

  const params = new URLSearchParams({ target: href });
  if (merchant) params.set("merchant", merchantSlug(merchant));
  if (placement) params.set("placement", placement);
  if (tireSize) params.set("tireSize", tireSize);
  if (productId) params.set("productId", productId);
  if (offerLabel) params.set("offerLabel", offerLabel);
  if (offerType) params.set("offerType", offerType);
  if (targetKind) params.set("targetKind", targetKind);
  return `/api/click?${params.toString()}`;
}

export function validateMerchantTarget(merchant = "", target = "") {
  try {
    const slug = merchantSlug(merchant);
    const parsed = new URL(target);
    const allowedHosts = allowedHostsByMerchant[slug] || [];
    if (!["http:", "https:"].includes(parsed.protocol)) return "";
    if (!allowedHosts.includes(parsed.hostname.toLowerCase())) return "";
    return parsed.toString();
  } catch {
    return "";
  }
}
