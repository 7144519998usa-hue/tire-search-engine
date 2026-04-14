import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { getTruckHubBySlug, truckApplications, truckPositions, approvedTruckSizes, buildTruckCollectionSchema, getTruckPageLeadCard } from "../lib/truckData";

export const metadata = {
  title: "Truck Tires",
  description:
    "Browse truck tires by size, position, and application through TireSearchEngine's broad tire marketplace.",
  alternates: {
    canonical: "/truck-tires",
  },
};

export default function TruckTiresHubPage() {
  const page = getTruckHubBySlug("truck-tires");
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Truck Tires" }];
  const leadCard = getTruckPageLeadCard(page);

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={buildTruckCollectionSchema({
          name: page.title,
          description: page.description,
          path: "/truck-tires",
        })}
      />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">{page.eyebrow}</span>
            <h1>{page.heroTitle}</h1>
            <p>{page.description}</p>
            <div className="hero-actions">
              <Link className="search-button" href="/commercial-truck-tires">
                Browse commercial truck tires
              </Link>
              <Link className="ghost-link" href="/tires">
                Back to the tire marketplace
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Fleet-ready path</span>
            <ul className="bullet-list">
              <li>{leadCard.heading}</li>
              <li>Truck sizes, applications, and position pages built for commercial buyers.</li>
              <li>Built to help buyers move from research into commercial tire options.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Truck applications</span>
            <h2>Start with the duty cycle or route type</h2>
          </div>
          <div className="category-grid">
            {truckApplications.map((application) => (
              <Link key={application.slug} href={`/truck-tires/${application.slug}`} className="category-card">
                <h3>{application.title}</h3>
                <p>{application.summary}</p>
                <span>Open application page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Truck positions and sizes</span>
            <h2>Move from broad truck demand into high-intent buying pages</h2>
          </div>
          <div className="category-grid">
            {truckPositions.map((position) => (
              <Link key={position.slug} href={`/truck-tires/${position.slug}`} className="category-card">
                <h3>{position.title}</h3>
                <p>{position.summary}</p>
                <span>View position page</span>
              </Link>
            ))}
            {approvedTruckSizes.map((size) => (
              <Link key={size.slug} href={`/truck-tires/${size.slug}`} className="category-card">
                <h3>{size.title}</h3>
                <p>{size.summary}</p>
                <span>Open size page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
