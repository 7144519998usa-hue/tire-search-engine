import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getTruckIntersectionEligibility } from "../../../lib/pageEligibility";
import { buildTruckCollectionSchema, getTruckApplicationBySlug, getTruckPageLeadCard, getTruckSizeBySlug, getApprovedTruckIntersections } from "../../../lib/truckData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getTruckIntersectionEligibility(params.slug, params.application);

  if (!eligibility.indexable) {
    return {};
  }

  const { size, application } = eligibility.entity;

  return {
    title: `${size.size} ${application.title}`,
    description: `${size.size} ${application.title.toLowerCase()} page for truck buyers comparing approved heavy-duty replacement paths.`,
    alternates: {
      canonical: `/truck-tires/${params.slug}/${params.application}`,
    },
  };
}

export default function TruckIntersectionPage({ params }) {
  const eligibility = getTruckIntersectionEligibility(params.slug, params.application);

  if (!eligibility.indexable) {
    notFound();
  }

  const size = getTruckSizeBySlug(params.slug);
  const application = getTruckApplicationBySlug(params.application);
  const leadCard = getTruckPageLeadCard(application);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Truck Tires", href: "/truck-tires" },
    { label: size.size, href: `/truck-tires/${size.slug}` },
    { label: application.title },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={buildTruckCollectionSchema({
          name: `${size.size} ${application.title}`,
          description: `${size.summary} ${application.summary}`,
          path: `/truck-tires/${size.slug}/${application.slug}`,
        })}
      />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Truck size + application</span>
            <h1>{size.size} tires for {application.title.toLowerCase()}</h1>
            <p>
              Compare this exact truck size within a route-specific commercial
              application path built for heavy-duty replacement research.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href={leadCard.ctaHref}>
                {leadCard.ctaLabel}
              </Link>
              <Link className="ghost-link" href={`/truck-tires/${size.slug}`}>
                Back to {size.size}
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best used for</span>
            <ul className="bullet-list">
              <li>Exact-size plus application search demand.</li>
              <li>Commercial tire buyers narrowing by size and duty cycle.</li>
              <li>Fleet pricing, quote requests, and follow-on research.</li>
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
}
