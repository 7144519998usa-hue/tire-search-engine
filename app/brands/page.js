import ProductGrid from "../components/ProductGrid";
import { priorityBrands, brandSlug, getBrandSummary } from "../lib/brandData";

export const metadata = {
  title: "Tire Brands | Compare Models, Sizes & Retailer Paths",
  description: "Browse Michelin, Goodyear, Bridgestone, Continental, Pirelli, BFGoodrich, Firestone, Cooper, Falken, Yokohama, and other tire brand paths.",
  alternates: { canonical: "/brands" }
};

export default function BrandsPage() {
  const featuredProducts = priorityBrands.flatMap((brand) => getBrandSummary(brand).products.slice(0, 1)).slice(0, 12);

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Tire brand directory</p>
        <h1>Compare tire brands by models, sizes, and retailer paths.</h1>
        <p>Use brand pages to review strengths, popular models, common sizes, and safe retailer links before buying.</p>
      </div>
      <div className="intent-cards">
        {priorityBrands.map((brand) => (
          <a key={brand} href={`/brands/${brandSlug(brand)}`}>{brand}</a>
        ))}
      </div>
      <ProductGrid products={featuredProducts} placement="brands-hub" />
    </section>
  );
}
