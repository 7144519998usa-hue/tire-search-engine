import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { siteUrl } from "../lib/siteData";
import { commercialTruckSizes } from "../lib/tireUniversityData";

export const metadata = {
  title: "Commercial Truck Tires",
  description:
    "Commercial truck tire pages for fleets and owner-operators comparing major truck sizes, fleet resources, and compliance-oriented tire education.",
  alternates: {
    canonical: "/commercial-truck-tires",
  },
  openGraph: {
    title: "Commercial Truck Tires | TireSearchEngine",
    description:
      "Browse commercial truck tire sizes, fleet education, and truck-focused tire buying paths.",
    url: `${siteUrl}/commercial-truck-tires`,
  },
};

export default function CommercialTruckTiresPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Commercial Truck Tires" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Commercial Truck Tires",
    description:
      "US-focused commercial truck tire hub linking major truck sizes, fleet resources, and truck tire education.",
    url: `${siteUrl}/commercial-truck-tires`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Commercial truck hub</span>
            <h1>Commercial truck tires for fleets, owner-operators, and heavy-duty replacement planning.</h1>
            <p>
              Browse commercial truck tire paths by size, application, and fleet
              research needs from one marketplace hub.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/truck-tires">
                Browse truck tire categories
              </Link>
              <Link className="ghost-link" href="/truck-tires/long-haul">
                Explore long-haul pages
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Built for</span>
            <ul className="bullet-list">
              <li>Fleet managers and owner-operators.</li>
              <li>Commercial size research and replacement planning.</li>
              <li>Application, position, and education-led truck shopping paths.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Commercial paths</span>
            <h2>Browse the main heavy-duty truck buying paths</h2>
          </div>
          <div className="category-grid">
            <Link href="/truck-tires/steer" className="category-card">
              <h3>Steer tires</h3>
              <p>Compare front-axle truck tire paths for wear control, stability, and highway use.</p>
              <span>Explore steer tires</span>
            </Link>
            <Link href="/truck-tires/drive" className="category-card">
              <h3>Drive tires</h3>
              <p>Move into traction-focused commercial tire paths for linehaul and regional duty cycles.</p>
              <span>Explore drive tires</span>
            </Link>
            <Link href="/truck-tires/trailer" className="category-card">
              <h3>Trailer tires</h3>
              <p>Review trailer tire pages built around durability, scrub resistance, and casing life.</p>
              <span>Explore trailer tires</span>
            </Link>
            <Link href="/truck-tires/regional" className="category-card">
              <h3>Regional truck tires</h3>
              <p>Shop route-focused truck pages for stop-and-go mileage and durable fleet replacement.</p>
              <span>Explore regional pages</span>
            </Link>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Commercial sizes</span>
            <h2>Start with the most important truck sizes</h2>
          </div>
          <div className="category-grid">
            {commercialTruckSizes.map((size) => (
              <Link key={size.slug} href={`/commercial-truck-tires/${size.slug}`} className="category-card">
                <h3>{size.title}</h3>
                <p>{size.summary}</p>
                <span>Open truck size page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Truck education links</span>
            <h2>Research and compliance pages for commercial tire buyers</h2>
          </div>
          <div className="category-grid">
            <Link href="/tire-university/fleet-resources" className="category-card">
              <h3>Fleet resources</h3>
              <p>Steer, drive, replacement-cycle, and cost-per-mile education for truck buyers.</p>
              <span>Read fleet resources</span>
            </Link>
            <Link href="/tire-university/legal" className="category-card">
              <h3>Truck regulations and legal pages</h3>
              <p>US legal and compliance-oriented content for commercial tire research.</p>
              <span>View legal content</span>
            </Link>
            <Link href="/tire-university/truck-tire-education" className="category-card">
              <h3>Truck tire education</h3>
              <p>Educational pages that explain truck categories, sizes, and application differences.</p>
              <span>Read truck education</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
