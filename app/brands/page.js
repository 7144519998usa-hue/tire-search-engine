import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { featuredBrandPages, siteUrl } from "../lib/siteData";

export const metadata = {
  title: "Tire Brands",
  description:
    "Browse top tire brands and compare their strengths, popular models, and exact-size shopping paths.",
  alternates: {
    canonical: "/brands",
  },
  openGraph: {
    title: "Tire Brands | TireSearchEngine",
    description:
      "Explore top tire brands like Michelin, Goodyear, Bridgestone, Continental, and more.",
    url: `${siteUrl}/brands`,
  },
};

export default function BrandsHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tire Brands",
    description:
      "A hub page linking to popular tire-brand pages and brand-led shopping paths.",
    url: `${siteUrl}/brands`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Brand hub</span>
            <h1>Compare the tire brands shoppers trust most.</h1>
            <p>
              Compare the strongest tire brands through dedicated brand guides
              and exact-size pages built for faster shopping decisions.
            </p>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best use</span>
            <ul className="bullet-list">
              <li>Brand overviews built for fast comparison.</li>
              <li>Helpful for shoppers narrowing by trust, warranty, and use case.</li>
              <li>Direct paths into size-specific brand pages.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Top brands</span>
            <h2>Explore tire brand pages</h2>
          </div>
          <div className="category-grid">
            {featuredBrandPages.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>View brand page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
