export const realTireImages = {
  passenger: "https://static.tirerack.com/content/dam/tires/michelin/mi_primacy_tour_as_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  suv: "https://static.tirerack.com/content/dam/tires/bfgoodrich/bfg_allterrain_ta_ko2_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  allTerrain: "https://static.tirerack.com/content/dam/tires/bfgoodrich/bfg_allterrain_ta_ko2_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  ev: "https://static.tirerack.com/content/dam/tires/michelin/mi_primacy_tour_as_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  commercial: "https://www.tirerack.com/content/dam/tires/mickey_thompson/mt_baja_boss_at_full.jpg",
  commercialSteer: "https://www.tirerack.com/content/dam/tires/mickey_thompson/mt_baja_boss_at_full.jpg",
  commercialDrive: "https://static.tirerack.com/content/dam/tires/bfgoodrich/bfg_allterrain_ta_ko2_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  commercialTrailer: "https://www.tirerack.com/content/dam/tires/mickey_thompson/mt_baja_boss_at_full.jpg",
  tread: "https://static.tirerack.com/content/dam/tires/bfgoodrich/bfg_allterrain_ta_ko2_full.jpg?impolicy=tow-pdp-thumb&imwidth=600",
  road: "https://static.tirerack.com/content/dam/tires/michelin/mi_primacy_tour_as_full.jpg?impolicy=tow-pdp-thumb&imwidth=900",
  default: "https://static.tirerack.com/content/dam/tires/michelin/mi_primacy_tour_as_full.jpg?impolicy=tow-pdp-thumb&imwidth=600"
};

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
  return realTireImages[imageTypeForProduct(product)] || realTireImages.default;
}

export function localFallbackForProduct(product = {}) {
  return localTireFallbacks[imageTypeForProduct(product)] || localTireFallbacks.default;
}
