import { sizeToSlug } from "./tireData.js";

export function getTireBadges(product, pageContext = {}) {
  const badges = [];
  const productSize = sizeToSlug(product?.size || "");
  const contextSize = pageContext.size_slug || (pageContext.size ? sizeToSlug(pageContext.size) : "");
  const productSizeSlug = product?.size_slug || productSize;
  const isRelated = pageContext.isRelated || String(pageContext.placement || "").includes("related");
  const category = `${product?.category || ""} ${product?.position || ""}`.toLowerCase();
  const pageType = String(pageContext.type || "").toLowerCase();
  const isCommercialProduct = category.includes("commercial");

  if (isRelated) {
    badges.push(pageType.includes("commercial") ? "Related Commercial Size" : "Related Size");
  } else if (pageContext.isFallback) {
    badges.push("Retailer Search");
  } else if (contextSize && productSizeSlug === contextSize && !(pageType.includes("passenger") && isCommercialProduct)) {
    badges.push("Exact Size Match");
  } else if (!contextSize && !isRelated) {
    badges.push("Retailer Search");
  }

  if (product?.isVerified === true || typeof product?.price === "number" || product?.tireRackUrl) {
    badges.push("Verified Product");
  }

  if (typeof product?.price === "number") {
    badges.push("Price Available");
  } else {
    badges.push("Check Retailer");
  }

  if (category.includes("commercial")) {
    badges.push("Commercial");
  }

  if (pageContext.position && product?.position === pageContext.position) {
    badges.push(`${pageContext.position} position`);
  }

  return [...new Set(badges)].slice(0, 4);
}
