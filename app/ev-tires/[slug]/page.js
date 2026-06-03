import ProductGrid from "../../components/ProductGrid";
import { getFallbackProducts } from "../../lib/tireData";

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
    title: `${label} EV Tires | Compare Deals`,
    description: `Compare ${label} EV tire options, quiet replacement tires, and retailer checkout links.`,
    alternates: { canonical: `/ev-tires/${params.slug}` }
  };
}

export default function EvTireDetailPage({ params }) {
  const label = titleCaseSlug(params.slug);
  const products = getFallbackProducts("235/45R18", "ev");

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">EV tire comparison</p>
        <h1>{label} EV tires</h1>
        <p>Compare EV-friendly replacement tires with product cards visible immediately.</p>
      </div>
      <ProductGrid products={products} placement={`ev-${params.slug}`} />
    </section>
  );
}
