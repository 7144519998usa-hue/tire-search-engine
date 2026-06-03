import { hasAiLanguage } from "./humanizeCopy.js";

export const qualitySignals = {
  intro: 1,
  faq: 1,
  schema: 1,
  internalLinks: 1,
  products: 1,
  canonical: 1,
  images: 1
};

export function scorePageQuality({
  intro = "",
  faqs = [],
  schemaTypes = [],
  internalLinks = {},
  products = [],
  canonical = "",
  images = [],
  allowWithoutProducts = false
} = {}) {
  const linkCount = Object.values(internalLinks || {}).flat().filter((link) => link?.href).length;
  const score = [
    intro && String(intro).length >= 80 && !hasAiLanguage(intro),
    Array.isArray(faqs) && faqs.length >= 2,
    Array.isArray(schemaTypes) && schemaTypes.length > 0,
    linkCount >= 4,
    allowWithoutProducts || products.length > 0,
    Boolean(canonical),
    Array.isArray(images) ? images.length > 0 : Boolean(images)
  ].filter(Boolean).length;

  return {
    score,
    maxScore: Object.keys(qualitySignals).length,
    indexable: score >= 5 && (allowWithoutProducts || products.length > 0),
    linkCount
  };
}

export function robotsFromQuality(quality) {
  return quality?.indexable ? { index: true, follow: true } : { index: false, follow: true };
}

export function isSitemapEligible(context = {}) {
  return scorePageQuality(context).indexable;
}
