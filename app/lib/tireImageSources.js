export const localTireFallbacks = {
  passenger: "/images/tires/generic-passenger-tire.svg",
  suv: "/images/tires/generic-suv-tire.svg",
  allTerrain: "/images/tires/generic-all-terrain-tire.svg",
  ev: "/images/tires/generic-ev-tire.svg",
  commercial: "/images/tires/commercial-drive-tire.svg",
  commercialSteer: "/images/tires/commercial-steer-tire.svg",
  commercialDrive: "/images/tires/commercial-drive-tire.svg",
  commercialTrailer: "/images/tires/commercial-trailer-tire.svg",
  tread: "/images/tires/tread-closeup.svg",
  road: "/images/tires/hero-tire-road.svg",
  default: "/images/tires/generic-passenger-tire.svg"
};

export const tireImages = localTireFallbacks;

export function imageTypeForProduct(product = {}) {
  const category = `${product.category || ""} ${product.position || ""} ${product.bestFor || ""}`.toLowerCase();
  if (category.includes("steer")) return "commercialSteer";
  if (category.includes("drive")) return "commercialDrive";
  if (category.includes("trailer")) return "commercialTrailer";
  if (category.includes("commercial")) return "commercial";
  if (category.includes("suv") || category.includes("crossover")) return "suv";
  if (category.includes("all-terrain") || category.includes("truck")) return "allTerrain";
  if (category.includes("ev") || category.includes("tesla")) return "ev";
  return "default";
}

export function realImageForProduct(product = {}) {
  return localTireFallbacks[imageTypeForProduct(product)] || localTireFallbacks.default;
}

export function localFallbackForProduct(product = {}) {
  return localTireFallbacks[imageTypeForProduct(product)] || localTireFallbacks.default;
}
