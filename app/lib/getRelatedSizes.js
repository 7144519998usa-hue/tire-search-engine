import { parseTireSize } from "./tireSizeParser.js";
import { classifyTireSize, isCommercialClassification } from "./classifyTireSize.js";

function sizeSlug(size = "") {
  const parsed = parseTireSize(size);
  if (parsed) {
    return parsed.slug;
  }
  return String(size || "").trim().toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function isCommercialTireSize(size = "") {
  return isCommercialClassification(classifyTireSize(size));
}

function relatedScore(current, candidate) {
  const currentParsed = parseTireSize(current);
  const candidateParsed = parseTireSize(candidate);
  if (!currentParsed || !candidateParsed) return 999;

  const rimPenalty = Math.abs(Number(currentParsed.rimDiameter || 0) - Number(candidateParsed.rimDiameter || 0)) * 100;
  const widthPenalty = Math.abs(Number(currentParsed.width || 0) - Number(candidateParsed.width || 0));
  const ratioPenalty = Math.abs(Number(currentParsed.aspectRatio || 0) - Number(candidateParsed.aspectRatio || 0)) * 2;

  return rimPenalty + widthPenalty + ratioPenalty;
}

export function getRelatedSizes({ currentSize = "", sizes = [], type = "", limit = 8 } = {}) {
  const currentSlug = sizeSlug(currentSize);
  const currentClassification = classifyTireSize(currentSize);
  const commercialPage = type === "commercial" || isCommercialClassification(currentClassification);

  return sizes
    .filter((size) => sizeSlug(size) !== currentSlug)
    .filter((size) => isCommercialClassification(classifyTireSize(size)) === commercialPage)
    .sort((a, b) => relatedScore(currentSize, a) - relatedScore(currentSize, b))
    .slice(0, limit);
}
