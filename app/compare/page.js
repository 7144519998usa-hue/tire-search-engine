import JsonLd from "../components/JsonLd";
import { comparisons } from "../lib/comparisonData";
import { breadcrumbSchema } from "../lib/schema";

export const metadata = {
  title: "Tire Comparisons | Brands, Categories, Retailers & Truck Tires",
  description: "Compare tire brands, tire categories, retailer paths, and commercial truck tire decisions before choosing an exact-size tire.",
  alternates: { canonical: "/compare" }
};

export default function ComparePage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Compare" }])} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Tire comparison hub</p>
          <h1>Tire comparisons</h1>
          <p>Use these comparisons to narrow brand, category, retailer, and commercial truck tire decisions before moving to an exact-size page.</p>
        </div>
        <div className="intent-cards">
          {comparisons.map((comparison) => (
            <a key={comparison.slug} href={`/compare/${comparison.slug}`}>{comparison.title}</a>
          ))}
        </div>
      </section>
    </>
  );
}
