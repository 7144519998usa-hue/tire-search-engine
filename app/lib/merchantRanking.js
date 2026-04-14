const MERCHANT_CONFIG = {
  "Tire Rack": {
    tier: 1,
    trustScore: 10,
    epcScore: 9,
    ctrScore: 9,
    shippingScore: 8,
    availabilityScore: 8,
    consumerPriority: 2,
    commercialPriority: 4,
    badge: "Top Trusted Retailer",
  },
  "Discount Tire": {
    tier: 1,
    trustScore: 9,
    epcScore: 6,
    ctrScore: 8,
    shippingScore: 8,
    availabilityScore: 8,
    consumerPriority: 4,
    commercialPriority: 5,
    badge: "Trusted Brand",
  },
  "Priority Tire": {
    tier: 2,
    trustScore: 7,
    epcScore: 10,
    ctrScore: 8,
    shippingScore: 8,
    availabilityScore: 9,
    consumerPriority: 1,
    commercialPriority: 1,
    badge: "Best Value",
  },
  SimpleTire: {
    tier: 2,
    trustScore: 8,
    epcScore: 8,
    ctrScore: 7,
    shippingScore: 9,
    availabilityScore: 8,
    consumerPriority: 3,
    commercialPriority: 2,
    badge: "Fast Delivery",
  },
  Walmart: {
    tier: 3,
    trustScore: 8,
    epcScore: 5,
    ctrScore: 7,
    shippingScore: 7,
    availabilityScore: 8,
    consumerPriority: 5,
    commercialPriority: 3,
    badge: "Alternative Offer",
  },
  Amazon: {
    tier: 3,
    trustScore: 7,
    epcScore: 4,
    ctrScore: 6,
    shippingScore: 8,
    availabilityScore: 7,
    consumerPriority: 6,
    commercialPriority: 5,
    badge: "More Buying Options",
  },
};

const DEFAULT_CONFIG = {
  tier: 3,
  trustScore: 5,
  epcScore: 5,
  ctrScore: 5,
  shippingScore: 5,
  availabilityScore: 5,
  consumerPriority: 99,
  commercialPriority: 99,
  badge: "Available Offer",
};

export const defaultMerchantWeights = {
  epc: 0.4,
  ctr: 0.2,
  price: 0.15,
  trust: 0.15,
  stock: 0.1,
};

export function getMerchantConfig(name = "") {
  return MERCHANT_CONFIG[name] || {
    ...DEFAULT_CONFIG,
    badge: "Available Offer",
  };
}

function getPriceCompetitiveness(price, priceRange) {
  if (!Number.isFinite(price) || !Number.isFinite(priceRange.min) || !Number.isFinite(priceRange.max)) {
    return 5;
  }

  if (priceRange.max === priceRange.min) {
    return 8;
  }

  const normalized = 1 - (price - priceRange.min) / (priceRange.max - priceRange.min);

  return Math.max(1, Math.min(10, Number((normalized * 9 + 1).toFixed(2))));
}

function getContextPriority(config, context) {
  return context === "commercial-truck"
    ? config.commercialPriority
    : config.consumerPriority;
}

function getPriorityBonus(config, context) {
  const priority = getContextPriority(config, context);
  if (!Number.isFinite(priority)) {
    return 0;
  }

  return Math.max(0, 7 - priority) * 0.35;
}

export function scoreMerchantOffer(row, options = {}) {
  const context = options.context || "consumer";
  const weights = {
    ...defaultMerchantWeights,
    ...(options.weights || {}),
  };
  const config = getMerchantConfig(row?.suppliers?.name);
  const price = Number(row?.price);
  const priceCompetitiveness = getPriceCompetitiveness(price, options.priceRange || {});
  const score =
    config.epcScore * weights.epc +
    config.ctrScore * weights.ctr +
    priceCompetitiveness * weights.price +
    config.trustScore * weights.trust +
    config.availabilityScore * weights.stock +
    getPriorityBonus(config, context);

  return {
    score: Number(score.toFixed(3)),
    badge: config.badge,
    tier: config.tier,
    merchantName: row?.suppliers?.name || "Offer partner",
    priceCompetitiveness,
    shippingScore: config.shippingScore,
    trustScore: config.trustScore,
    epcScore: config.epcScore,
    ctrScore: config.ctrScore,
    isPrimaryMarketplaceOffer: getContextPriority(config, context) <= 3,
  };
}

export function rankMerchantOffers(rows = [], options = {}) {
  const prices = rows.map((row) => Number(row.price)).filter(Number.isFinite);
  const priceRange = {
    min: prices.length ? Math.min(...prices) : NaN,
    max: prices.length ? Math.max(...prices) : NaN,
  };

  return rows
    .map((row) => ({
      ...row,
      merchantRanking: scoreMerchantOffer(row, {
        ...options,
        priceRange,
      }),
    }))
    .sort((a, b) => {
      if (b.merchantRanking.score !== a.merchantRanking.score) {
        return b.merchantRanking.score - a.merchantRanking.score;
      }

      return Number(a.price) - Number(b.price);
    });
}
