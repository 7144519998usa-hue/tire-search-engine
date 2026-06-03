import { productCatalog, sizeToSlug } from "./tireData.js";

export const priorityBrands = [
  "Michelin",
  "Goodyear",
  "Bridgestone",
  "Continental",
  "Pirelli",
  "BFGoodrich",
  "Firestone",
  "Cooper",
  "Falken",
  "Toyo",
  "Yokohama",
  "Hankook",
  "Kumho",
  "General",
  "Nitto"
];

export function brandSlug(value = "") {
  return String(value || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function brandNameFromSlug(slug = "") {
  return priorityBrands.find((brand) => brandSlug(brand) === slug) || slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function getBrandProducts(brand = "") {
  const slug = brandSlug(brand);
  return productCatalog.filter((product) => brandSlug(product.brand) === slug);
}

export function getBrandSummary(brand = "") {
  const name = brandNameFromSlug(brand);
  const products = getBrandProducts(name);
  const sizes = [...new Set(products.map((product) => product.size))].slice(0, 8);
  const models = [...new Set(products.map((product) => product.model))].slice(0, 8);

  return {
    name,
    slug: brandSlug(name),
    products,
    sizes,
    models,
    sizeLinks: sizes.map((size) => ({ href: `/tires/${sizeToSlug(size)}`, label: `${size} tires` }))
  };
}
