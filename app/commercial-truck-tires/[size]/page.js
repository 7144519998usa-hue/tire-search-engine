import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getCommercialTruckPageEligibility } from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import { commercialTruckSizes, getCommercialTruckSizeBySlug } from "../../lib/tireUniversityData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getCommercialTruckPageEligibility(params.size);
  const size = getCommercialTruckSizeBySlug(params.size);

  if (!size || !eligibility.indexable) {
    return {};
  }

  return {
    title: size.title,
    description: size.summary,
    robots: {
      index: eligibility.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/commercial-truck-tires/${size.slug}`,
    },
    openGraph: {
      title: `${size.title} | TireSearchEngine`,
      description: size.summary,
      url: `${siteUrl}/commercial-truck-tires/${size.slug}`,
    },
  };
}

export default function CommercialTruckTireSizePage({ params }) {
  const eligibility = getCommercialTruckPageEligibility(params.size);
  const size = getCommercialTruckSizeBySlug(params.size);

  if (!size || !eligibility.indexable) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Commercial Truck Tires", href: "/commercial-truck-tires" },
    { label: size.size },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: size.title,
    description: size.summary,
    url: `${siteUrl}/commercial-truck-tires/${size.slug}`,
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Commercial truck size</span>
            <h1>{size.title}</h1>
            <p>{size.summary}</p>
            <div className="hero-actions">
              <Link className="search-button" href="/commercial-truck-tires">
                Back to commercial truck hub
              </Link>
              <Link className="ghost-link" href="/tire-university/fleet-resources">
                Open fleet resources
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best linked with</span>
            <ul className="bullet-list">
              <li>Fleet replacement and cost-per-mile education.</li>
              <li>Truck regulations and winter compliance pages.</li>
              <li>Commercial application pages for steer, drive, and trailer research.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related research paths</span>
            <h2>Continue into related truck research</h2>
          </div>
          <div className="category-grid">
            <Link href="/tire-university/fleet-resources" className="category-card">
              <h3>Fleet resources</h3>
              <p>Read replacement planning, fleet economics, and duty-cycle guidance.</p>
              <span>Read fleet resources</span>
            </Link>
            <Link href="/tire-university/truck-tire-education" className="category-card">
              <h3>Truck tire education</h3>
              <p>Learn the terminology and category differences that support truck tire selection.</p>
              <span>Open truck education</span>
            </Link>
            <Link href="/tire-university/legal" className="category-card">
              <h3>Commercial tire legal pages</h3>
              <p>Use regulation and state-law content to support commercial tire planning.</p>
              <span>View legal pages</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
