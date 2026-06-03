const fakeModelTerms = [
  "regional pro",
  "fleet value",
  "retread pro",
  "load force",
  "mileage guard",
  "all-season tires",
  "ev tires",
  "performance tires",
  "touring tires"
];

function hasRealModel(product) {
  const model = String(product?.model || "").toLowerCase();
  return Boolean(model) && !fakeModelTerms.some((term) => model.includes(term));
}

export function isFakeModel(product) {
  return !hasRealModel(product);
}

export function rankTireResults(products = [], context = {}) {
  return [...products]
    .filter((product) => !isFakeModel(product))
    .map((product) => {
      const haystack = [product.category, product.position, product.bestFor].join(" ").toLowerCase();
      let score = 100;
      if (context.intent && haystack.includes(String(context.intent).toLowerCase())) score += 50;
      if (product.isVerified !== false) score += 30;
      if (hasRealModel(product)) score += 25;
      if (typeof product.price === "number") score += 20;
      if (product.tireRackUrl) score += 15;
      if (product.image && !product.image.includes("tireRackLogo")) score += 8;
      if (product.priceSnapshot && !String(product.priceSnapshot).toLowerCase().includes("check current")) score += 5;
      return { product, score };
    })
    .sort((a, b) => b.score - a.score)
    .map((item) => item.product);
}
