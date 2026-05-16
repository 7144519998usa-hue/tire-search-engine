import { featuredBrandPages, sizeToSlug } from "./siteData";

const knownBrands = new Map(
  featuredBrandPages.map((brand) => [brand.name.toLowerCase(), brand.name]),
);

function slugifySegment(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function parseVehicleQuery(value = "") {
  const cleaned = String(value)
    .trim()
    .replace(/\btires?\b/gi, "")
    .replace(/\s+/g, " ")
    .trim();
  const match = cleaned.match(/^(\d{4})\s+([a-z0-9]+)\s+(.+)$/i);

  if (!match) {
    return null;
  }

  return {
    year: match[1],
    make: slugifySegment(match[2]),
    model: slugifySegment(match[3]),
  };
}

function isExactSizeQuery(value = "") {
  return /^\d{3}\/\d{2}R\d{2}$/i.test(String(value).trim());
}

export function resolveSearchDestination(rawValue = "") {
  const value = String(rawValue).trim();

  if (!value) {
    return null;
  }

  if (isExactSizeQuery(value)) {
    return `/tires/${sizeToSlug(value.toUpperCase())}`;
  }

  const brandMatch = knownBrands.get(value.toLowerCase());
  if (brandMatch) {
    return `/brands/${slugifySegment(brandMatch)}`;
  }

  const vehicleMatch = parseVehicleQuery(value);
  if (vehicleMatch) {
    return `/vehicles/${vehicleMatch.make}/${vehicleMatch.model}/${vehicleMatch.year}`;
  }

  // Keep unknown searches in the existing result flow instead of sending users
  // into a dead-end query route that does not yet have a dedicated text-search renderer.
  return `/search?size=${encodeURIComponent(value)}`;
}
