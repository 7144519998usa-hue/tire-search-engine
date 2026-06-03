import ProductGrid from "../components/ProductGrid";
import { getProducts } from "../lib/tireData";

export const metadata = {
  title: "Shop Tire Deals | Tire Rack, Mavis & Amazon Backup Options",
  description: "Browse tire product cards with Tire Rack and Mavis prioritized, plus Amazon marketplace options for broader selection.",
  alternates: { canonical: "/shop-tires" }
};

export default function ShopTiresPage() {
  const products = getProducts({ limit: 24 });

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Product-first tire shopping</p>
        <h1>Shop tire deals by size, truck position, and retailer.</h1>
        <p>Products appear first so you can compare Tire Rack, Mavis, and Amazon options quickly.</p>
      </div>
      <ProductGrid products={products} placement="shop-tires" />
    </section>
  );
}
