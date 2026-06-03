import ProductGrid from "../../components/ProductGrid";
import { getFallbackProducts, searchProducts } from "../../lib/tireData";

function titleCaseSlug(value = "") {
  return String(value || "")
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function generateMetadata({ params }) {
  const label = titleCaseSlug(params.slug);
  return {
    title: `${label} Tires | Prices, Sizes & Deals`,
    description: `Compare ${label} tire results, common sizes, retailer price options, and checkout links.`,
    alternates: { canonical: `/models/${params.slug}` }
  };
}

export default function TireModelPage({ params }) {
  const label = titleCaseSlug(params.slug);
  const products = searchProducts(label);
  const fallbackProducts = products.length ? products : getFallbackProducts("", "all-season");

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Tire model search</p>
        <h1>{label} tires</h1>
        <p>Compare available tire cards, matching sizes, retailer price options, and marketplace listings.</p>
      </div>
      <ProductGrid products={fallbackProducts} placement={`model-${params.slug}`} />
    </section>
  );
}
