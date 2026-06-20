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

export const publicTirePhotoFallbacks = {
  passenger: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Car_tires.jpg",
  suv: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Assorted_stacked_automotive_tires.jpg",
  allTerrain: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tire_tread.jpg",
  ev: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Car_tires.jpg",
  commercial: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Assorted_stacked_automotive_tires.jpg",
  commercialSteer: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Assorted_stacked_automotive_tires.jpg",
  commercialDrive: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tire_tread.jpg",
  commercialTrailer: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Assorted_stacked_automotive_tires.jpg",
  tread: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tire_tread.jpg",
  road: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Tire_tread.jpg",
  default: "https://commons.wikimedia.org/wiki/Special:Redirect/file/Car_tires.jpg"
};

export const tireImages = publicTirePhotoFallbacks;

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

function isUsableProductImage(src = "") {
  const image = String(src || "").trim();
  if (!image) return false;

  const lower = image.toLowerCase();
  if (lower.includes("tireracklogo")) return false;
  if (lower.includes("/logos/")) return false;
  if (lower.endsWith(".svg")) return false;

  return lower.startsWith("https://") || lower.startsWith("http://") || lower.startsWith("/");
}

export function realImageForProduct(product = {}) {
  if (isUsableProductImage(product.image)) return product.image;
  return publicTirePhotoFallbacks[imageTypeForProduct(product)] || publicTirePhotoFallbacks.default;
}

export function localFallbackForProduct(product = {}) {
  return publicTirePhotoFallbacks[imageTypeForProduct(product)] || publicTirePhotoFallbacks.default;
}

export function svgFallbackForProduct(product = {}) {
  return localTireFallbacks[imageTypeForProduct(product)] || localTireFallbacks.default;
}
