import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import {
  buildTruckCollectionSchema,
  getTruckApplicationBySlug,
  getTruckHubBySlug,
  getTruckPageLeadCard,
  getTruckPositionBySlug,
  getTruckSizeBySlug,
  approvedTruckSizes,
  truckApplications,
  truckPositions,
} from "../../lib/truckData";
import {
  getTruckApplicationPageEligibility,
  getTruckPositionPageEligibility,
  getTruckSizePageEligibility,
} from "../../lib/pageEligibility";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const size = getTruckSizeBySlug(params.slug);
  const application = getTruckApplicationBySlug(params.slug);
  const position = getTruckPositionBySlug(params.slug);
  const entity = size || application || position;

  if (!entity) {
    return {};
  }

  return {
    title: entity.title,
    description: entity.summary,
    alternates: {
      canonical: `/truck-tires/${params.slug}`,
    },
  };
}

export default function TruckTiresDynamicPage({ params }) {
  const size = getTruckSizeBySlug(params.slug);
  const application = getTruckApplicationBySlug(params.slug);
  const position = getTruckPositionBySlug(params.slug);
  const entity = size || application || position;

  if (!entity) {
    notFound();
  }

  const eligibility = size
    ? getTruckSizePageEligibility(params.slug)
    : application
      ? getTruckApplicationPageEligibility(params.slug)
      : getTruckPositionPageEligibility(params.slug);

  if (!eligibility.indexable) {
    notFound();
  }

  const leadCard = getTruckPageLeadCard(entity);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Truck Tires", href: "/truck-tires" },
    { label: entity.title },
  ];
  const relatedSizes = size
    ? approvedTruckSizes.filter((item) => item.slug !== size.slug).slice(0, 2)
    : approvedTruckSizes.filter((item) =>
        application ? item.applications.includes(application.slug) : item.positions.includes(position.slug)
      );
  const relatedApplications = truckApplications.filter((item) =>
    size ? size.applications.includes(item.slug) : true
  );

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={buildTruckCollectionSchema({
          name: entity.title,
          description: entity.summary,
          path: `/truck-tires/${params.slug}`,
        })}
      />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Truck tire path</span>
            <h1>{entity.title}</h1>
            <p>{entity.summary}</p>
            <div className="hero-actions">
              <Link className="search-button" href={leadCard.ctaHref}>
                {leadCard.ctaLabel}
              </Link>
              <Link className="ghost-link" href="/truck-tires">
                Back to truck hub
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best next steps</span>
            <ul className="bullet-list">
              <li>{leadCard.body}</li>
              <li>Compare truck options by application, position, and common heavy-duty sizes.</li>
              <li>Move into research, pricing, and fleet-quote paths from the same marketplace flow.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related truck pages</span>
            <h2>Continue into related truck buying paths</h2>
          </div>
          <div className="category-grid">
            {relatedApplications.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/truck-tires/${item.slug}`} className="category-card">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span>Open application page</span>
              </Link>
            ))}
            {relatedSizes.slice(0, 3).map((item) => (
              <Link key={item.slug} href={`/truck-tires/${item.slug}`} className="category-card">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span>Open size page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
