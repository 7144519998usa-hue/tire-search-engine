import { rankMerchantOffers } from "./merchantRanking";
import { buildProtectedRedirectHref } from "./outboundRedirect";
import { hasSupabaseConfig, supabase } from "./supabaseClient";

const fallbackTires = [
  { id: 1, brand: "Michelin", model: "Defender 2", size: "205/55R16" },
  { id: 2, brand: "Goodyear", model: "Assurance MaxLife", size: "205/55R16" },
  { id: 3, brand: "BFGoodrich", model: "Trail-Terrain T/A", size: "225/65R17" },
  { id: 4, brand: "Pirelli", model: "Scorpion AS Plus 3", size: "275/55R20" },
];

const fallbackSuppliers = [
  { id: 1, name: "Tire Rack" },
  { id: 2, name: "Priority Tire" },
  { id: 3, name: "SimpleTire" },
  { id: 4, name: "Discount Tire" },
  { id: 5, name: "Walmart" },
  { id: 6, name: "Amazon" },
];

const fallbackPrices = [
  {
    id: 101,
    tire_id: 1,
    supplier_id: 1,
    price: 146.49,
    affiliate_link: "https://www.tirerack.com/",
  },
  {
    id: 102,
    tire_id: 1,
    supplier_id: 2,
    price: 141.49,
    affiliate_link: "https://www.prioritytire.com/",
  },
  {
    id: 103,
    tire_id: 2,
    supplier_id: 3,
    price: 134.95,
    affiliate_link: "https://simpletire.com/",
  },
  {
    id: 104,
    tire_id: 3,
    supplier_id: 1,
    price: 198.5,
    affiliate_link: "https://www.tirerack.com/",
  },
  {
    id: 105,
    tire_id: 4,
    supplier_id: 4,
    price: 256.25,
    affiliate_link: "https://www.discounttire.com/",
  },
  {
    id: 106,
    tire_id: 3,
    supplier_id: 5,
    price: 201.99,
    affiliate_link: "https://www.walmart.com/",
  },
  {
    id: 107,
    tire_id: 4,
    supplier_id: 6,
    price: 259.0,
    affiliate_link: "https://www.amazon.com/",
  },
];
const fallbackResultCache = new Map();

export function normalizeTireSize(value = "") {
  return value.trim().toUpperCase();
}

function buildRows(prices, tires, suppliers, size, options = {}) {
  const rows = prices
    .map((priceRow) => ({
      ...priceRow,
      tires: tires.find((tire) => tire.id === priceRow.tire_id),
      suppliers: suppliers.find((supplier) => supplier.id === priceRow.supplier_id),
    }))
    .filter((row) => (size ? row.tires?.size === size : true))
    .map((row) => ({
      ...row,
      affiliate_link: buildProtectedRedirectHref({
        destination: row.affiliate_link,
        merchant: row.suppliers?.name || "",
        surface: "search-results",
        placement: "ranked-offer",
      }),
    }));

  return rankMerchantOffers(rows, options);
}

function deriveFilters(rows) {
  return {
    brands: [...new Set(rows.map((row) => row.tires?.brand).filter(Boolean))],
    suppliers: [...new Set(rows.map((row) => row.suppliers?.name).filter(Boolean))],
  };
}

export async function getSearchResults(size = "", options = {}) {
  if (!hasSupabaseConfig || !supabase) {
    const cacheKey = JSON.stringify({
      size,
      context: options.context || "consumer",
      weights: options.weights || null,
    });

    if (fallbackResultCache.has(cacheKey)) {
      return fallbackResultCache.get(cacheKey);
    }

    const rows = buildRows(
      fallbackPrices,
      fallbackTires,
      fallbackSuppliers,
      size,
      options
    );

    const result = {
      rows,
      ...deriveFilters(rows),
      usedFallbackData: true,
    };

    fallbackResultCache.set(cacheKey, result);
    return result;
  }

  try {
    const [pricesResponse, tiresResponse, suppliersResponse] = await Promise.all([
      supabase.from("prices").select("*"),
      supabase.from("tires").select("*"),
      supabase.from("suppliers").select("*"),
    ]);

    if (pricesResponse.error || tiresResponse.error || suppliersResponse.error) {
      throw new Error("Supabase query failed");
    }

    const rows = buildRows(
      pricesResponse.data ?? [],
      tiresResponse.data ?? [],
      suppliersResponse.data ?? [],
      size,
      options
    );

    return {
      rows,
      ...deriveFilters(rows),
    };
  } catch (error) {
    const rows = buildRows(
      fallbackPrices,
      fallbackTires,
      fallbackSuppliers,
      size,
      options
    );

    return {
      rows,
      ...deriveFilters(rows),
      usedFallbackData: true,
    };
  }
}
