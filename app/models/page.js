import ProductGrid from "../components/ProductGrid";
import { getFallbackProducts } from "../lib/tireData";

const modelLinks = [
  ["Bridgestone WeatherPeak", "/models/bridgestone-weatherpeak"],
  ["Firestone All Season", "/models/firestone-all-season"],
  ["Michelin Defender LTX M/S2", "/models/michelin-defender-ltx-ms2"],
  ["Continental PureContact LS", "/models/continental-purecontact-ls"],
  ["Yokohama Avid Ascend", "/models/yokohama-avid-ascend"]
];

export const metadata = {
  title: "Tire Models | Compare Prices, Sizes & Deals",
  description: "Browse tire model pages, common sizes, retailer price options, and product comparisons.",
  alternates: { canonical: "/models" }
};

export default function ModelsPage() {
  const products = getFallbackProducts("", "all-season");

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Tire model directory</p>
        <h1>Compare tire models, sizes, and retailer options.</h1>
        <p>Use model pages for brand-specific searches, then move quickly to product cards and checkout links.</p>
      </div>
      <div className="intent-cards">
        {modelLinks.map(([label, href]) => (
          <a key={href} href={href}>{label}</a>
        ))}
      </div>
      <ProductGrid products={products} placement="models-hub" />
    </section>
  );
}
