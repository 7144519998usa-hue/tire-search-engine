import { getRelatedProducts, productCatalog, validateProductForPage } from "./tireData.js";
import { rankTireResults } from "./rankTireResults.js";

const commercialIntents = new Set(["drive", "steer", "trailer", "regional-haul", "long-haul", "mixed-service", "retread"]);

export function getTireResults({ size = "", intent = "", commercialOnly = false, position = "", limit = 24 } = {}) {
  const exactProducts = productCatalog.filter((product) =>
    validateProductForPage(product, {
      size,
      intent,
      commercialOnly: commercialOnly || commercialIntents.has(intent),
      position
    })
  );

  return {
    exactProducts: rankTireResults(exactProducts, { size, intent }).slice(0, limit),
    relatedProducts: getRelatedProducts({ size, commercialOnly: commercialOnly || commercialIntents.has(intent), limit: 6 }),
    isCommercialIntent: commercialOnly || commercialIntents.has(intent)
  };
}
