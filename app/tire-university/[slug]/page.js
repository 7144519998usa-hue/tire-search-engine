import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getTireUniversitySectionEligibility } from "../../lib/pageEligibility";
import { siteUrl } from "../../lib/siteData";
import {
  getTireUniversitySectionBySlug,
  tireUniversitySections,
  tireUniversityStateLaws,
} from "../../lib/tireUniversityData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getTireUniversitySectionEligibility(params.slug);
  const section = getTireUniversitySectionBySlug(params.slug);

  if (!section || !eligibility.indexable) {
    return {};
  }

  return {
    title: `${section.title} | Tire University`,
    description: section.intro,
    robots: {
      index: eligibility.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/tire-university/${section.slug}`,
    },
    openGraph: {
      title: `${section.title} | Tire University | TireSearchEngine`,
      description: section.intro,
      url: `${siteUrl}/tire-university/${section.slug}`,
    },
  };
}

export default function TireUniversitySectionPage({ params }) {
  const eligibility = getTireUniversitySectionEligibility(params.slug);
  const section = getTireUniversitySectionBySlug(params.slug);

  if (!section || !eligibility.indexable) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tire University", href: "/tire-university" },
    { label: section.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: section.title,
    description: section.intro,
    mainEntityOfPage: `${siteUrl}/tire-university/${section.slug}`,
  };

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">{section.eyebrow}</span>
            <h1>{section.title}</h1>
            <p>{section.intro}</p>
            <div className="hero-actions">
              <Link className="search-button" href={section.relatedLinks[0]?.href || "/tires"}>
                Explore linked pages
              </Link>
              <Link className="ghost-link" href="/tire-university">
                Back to Tire University
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Inside this section</span>
            <ul className="bullet-list">
              {section.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related tire pages</span>
            <h2>Continue from this section into useful next steps</h2>
          </div>
          <div className="category-grid">
            {section.relatedLinks.map((link) => (
              <Link key={link.href} href={link.href} className="category-card">
                <h3>{link.label}</h3>
                <p>
                  Continue from this educational section into a related tire,
                  fitment, or truck page.
                </p>
                <span>Open linked page</span>
              </Link>
            ))}
            {params.slug === "legal" ? (
              tireUniversityStateLaws.map((state) => (
                <Link
                  key={state.slug}
                  href={`/tire-university/state-laws/${state.slug}`}
                  className="category-card"
                >
                  <h3>{state.title}</h3>
                  <p>{state.summary}</p>
                  <span>Read state page</span>
                </Link>
              ))
            ) : null}
          </div>
        </section>
      </main>
    </>
  );
}
