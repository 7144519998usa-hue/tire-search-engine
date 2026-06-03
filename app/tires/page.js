import JsonLd from "../components/JsonLd";
import ProductGrid from "../components/ProductGrid";
import { breadcrumbSchema, itemListSchema } from "../lib/schema";
import { getFallbackProducts, sizeToSlug, tireSizes } from "../lib/tireData";

export const metadata = {
  title: "Tires | Compare Sizes, Prices & Deals",
  description: "Browse tire sizes, commercial truck tire pages, retailer price options, and tire deals.",
  alternates: { canonical: "/tires" }
};

export default function TiresHubPage() {
  const products = getFallbackProducts("", "truck");

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Tires" }])} />
      <JsonLd data={itemListSchema({ title: "Tire size and deal options", products, path: "/tires" })} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Tire size hub</p>
          <h1>Compare tires by size, price, and category.</h1>
          <p>Start with a tire size or commercial position, then compare Tire Rack, Mavis, and Amazon shopping options.</p>
        </div>
        <div className="intent-cards">
          {tireSizes.slice(0, 24).map((size) => (
            <a key={size} href={`/tires/${sizeToSlug(size)}`}>{size} tires</a>
          ))}
        </div>
        <ProductGrid products={products} placement="tires-hub" />
      </section>
    </>
  );
}
