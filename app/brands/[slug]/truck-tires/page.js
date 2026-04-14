import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getTruckBrandPageEligibility } from "../../../lib/pageEligibility";
import { approvedTruckSizes, buildTruckCollectionSchema, getApprovedTruckBrandPage } from "../../../lib/truckData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const page = getApprovedTruckBrandPage(params.slug);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.summary,
    alternates: {
      canonical: `/brands/${params.slug}/truck-tires`,
    },
  };
}

export default function BrandTruckTiresPage({ params }) {
  const eligibility = getTruckBrandPageEligibility(params.slug);

  if (!eligibility.indexable) {
    notFound();
  }

  const page = getApprovedTruckBrandPage(params.slug);
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: page.brand.name, href: `/brands/${page.brand.slug}` },
    { label: "Truck Tires" },
  ];

  return (
    <>
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <JsonLd
        data={buildTruckCollectionSchema({
          name: page.title,
          description: page.summary,
          path: `/brands/${page.brand.slug}/truck-tires`,
        })}
      />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Brand + truck</span>
            <h1>{page.title}</h1>
            <p>{page.summary}</p>
            <div className="hero-actions">
              <Link className="search-button" href="/truck-tires">
                Browse truck tire pages
              </Link>
              <Link className="ghost-link" href={`/brands/${page.brand.slug}`}>
                Back to brand page
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Connected truck sizes</span>
            <ul className="bullet-list">
              {approvedTruckSizes.map((size) => (
                <li key={size.slug}>{size.size} is a common heavy-duty size for brand-led truck research.</li>
              ))}
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
}
