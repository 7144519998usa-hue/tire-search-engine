import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { siteUrl, sizeToSlug } from "../lib/siteData";
import { tireCategories } from "../lib/tireCategories";

export const metadata = {
  title: "Tires",
  description:
    "Shop tires by category, exact size, and vehicle fitment through a US-focused tire marketplace built for comparison shopping.",
  alternates: {
    canonical: "/tires",
  },
  openGraph: {
    title: "Tires | TireSearchEngine",
    description:
      "Browse tire categories, exact sizes, and high-intent shopping paths built for US drivers.",
    url: `${siteUrl}/tires`,
  },
};

export default function TiresHubPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Tires" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tires",
    description:
      "US-focused tire hub for browsing by category, tire size, and commercial intent.",
    url: `${siteUrl}/tires`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">US tire marketplace</span>
            <h1>Shop tires by size, category, and vehicle with a US-first comparison path.</h1>
            <p>
              Browse exact tire sizes, vehicle categories, seasonal tire types,
              and commercial shopping paths built for US drivers and US
              merchants.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/search?size=205/55R16">
                Start with a tire size
              </Link>
              <Link className="ghost-link" href="/vehicles">
                Shop by vehicle
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Browse by</span>
            <ul className="bullet-list">
              <li>Vehicle type and tire use case.</li>
              <li>Exact tire size and brand.</li>
              <li>Seasonal and truck/SUV categories.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Tire categories</span>
            <h2>Explore the main tire categories</h2>
          </div>
          <div className="category-grid">
            {tireCategories.map((category) => (
              <Link key={category.slug} href={`/tires/${category.slug}`} className="category-card">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>Browse category</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Popular size paths</span>
            <h2>Jump straight into top replacement sizes</h2>
          </div>
          <div className="category-grid">
            {tireCategories[6].sizeValues.map((size) => (
              <Link key={size} href={`/tires/${sizeToSlug(size)}`} className="category-card">
                <h3>{size} tires</h3>
                <p>
                  Exact-size landing page for shoppers comparing brands,
                  merchants, and current replacement options.
                </p>
                <span>View tire size</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
