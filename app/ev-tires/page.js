import ProductGrid from "../components/ProductGrid";
import { getFallbackProducts } from "../lib/tireData";

export const metadata = {
  title: "EV Tires | Compare Electric Vehicle Tire Deals",
  description: "Compare EV tire replacement options, Tesla tire pages, quiet all-season choices, and retailer checkout links.",
  alternates: { canonical: "/ev-tires" }
};

export default function EvTiresPage() {
  const products = getFallbackProducts("235/45R18", "ev");

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Electric vehicle tires</p>
        <h1>EV tires for Tesla and electric vehicle replacement searches.</h1>
        <p>Compare quiet, efficient, and all-season tire options from Tire Rack, Mavis, and Amazon.</p>
      </div>
      <div className="intent-cards">
        <a href="/vehicles/tesla">Tesla tires</a>
        <a href="/vehicles/tesla/model-3/2025">Tesla Model 3 tires</a>
        <a href="/vehicles/tesla/model-y/2025">Tesla Model Y tires</a>
      </div>
      <ProductGrid products={products} placement="ev-tires" />
    </section>
  );
}
