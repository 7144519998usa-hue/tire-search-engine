import { buildGoUrl } from "./redirects.js";
import { buildMavisUrl } from "./tireData.js";

const mavisSpecialOffers = [
  {
    brand: "Pirelli",
    savings: "Save up to $250",
    detail: "Select sets of 4 tires",
    expires: "Valid through 6/30/26",
    query: "Pirelli tires",
    tone: "premium"
  },
  {
    brand: "Continental",
    savings: "Save $160",
    detail: "Select sets of 4 tires",
    expires: "Valid through 6/30/26",
    query: "Continental tires",
    tone: "touring"
  },
  {
    brand: "Goodyear",
    savings: "Save up to $130",
    detail: "Select sets of 4 tires",
    expires: "Valid through 6/30/26",
    query: "Goodyear tires",
    tone: "daily"
  },
  {
    brand: "Michelin",
    savings: "Save $130",
    detail: "Sets of 4 tires",
    expires: "Valid through 7/5/26",
    query: "Michelin tires",
    tone: "premium"
  },
  {
    brand: "BFGoodrich",
    savings: "Save $130",
    detail: "Sets of 4 tires",
    expires: "Valid through 7/5/26",
    query: "BFGoodrich tires",
    tone: "truck"
  },
  {
    brand: "Firestone",
    savings: "Save $120",
    detail: "Select sets of 4 tires",
    expires: "Valid through 6/30/26",
    query: "Firestone tires",
    tone: "daily"
  },
  {
    brand: "Cooper",
    savings: "Save $120",
    detail: "Select sets of 4 tires",
    expires: "Valid through 6/30/26",
    query: "Cooper tires",
    tone: "value"
  },
  {
    brand: "Mavis",
    savings: "SUV tires from $87.49",
    detail: "Everyday low-price path",
    expires: "Check current local price",
    query: "SUV tires",
    tone: "value"
  }
];

function slug(value = "") {
  return String(value).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function getMavisSpecialOffers(limit = mavisSpecialOffers.length) {
  return mavisSpecialOffers.slice(0, limit).map((offer, index) => {
    const destination = buildMavisUrl({ query: offer.query });
    const placement = `hero-mavis-special-${index + 1}-${slug(offer.brand)}`;

    return {
      ...offer,
      placement,
      href: buildGoUrl({
        merchant: "Mavis",
        href: destination,
        placement,
        tireSize: offer.brand
      })
    };
  });
}
