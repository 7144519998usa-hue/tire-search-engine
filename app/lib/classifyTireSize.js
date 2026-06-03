import { parseTireSize } from "./tireSizeParser.js";

const commercialSlugPatterns = [
  /^9r22-5$/,
  /^10r22-5$/,
  /^11r22-5$/,
  /^11r24-5$/,
  /^12r22-5$/
];

const knownCommercialRims = new Set(["17.5", "19.5", "22.5", "24.5"]);

export function classifyTireSize(sizeSlug = "", product = {}) {
  const rawValue = String(sizeSlug || product.size || "").trim();
  const slug = rawValue
    .toLowerCase()
    .replace(/\./g, "-")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  const metadata = `${product.vehicle_type || ""} ${product.commercial_size_type || ""} ${product.position || ""} ${product.category || ""}`.toLowerCase();
  if (metadata.includes("commercial") || ["steer", "drive", "trailer"].some((term) => metadata.includes(term))) {
    return "commercial_truck";
  }

  if (commercialSlugPatterns.some((pattern) => pattern.test(slug))) {
    return "commercial_truck";
  }

  const parsed = parseTireSize(rawValue);
  if (parsed?.commercial || knownCommercialRims.has(String(parsed?.rimDiameter || ""))) {
    return "commercial_truck";
  }

  if (parsed?.rimDiameter && Number(parsed.rimDiameter) >= 20 && Number(parsed.width || 0) >= 265) {
    return "light_truck";
  }

  return "passenger";
}

export function isCommercialClassification(classification = "") {
  return classification === "commercial_truck";
}
