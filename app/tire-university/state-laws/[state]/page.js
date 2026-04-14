import Link from "next/link";
import { notFound } from "next/navigation";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getStateLawPageEligibility } from "../../../lib/pageEligibility";
import { siteUrl } from "../../../lib/siteData";
import { getStateLawBySlug, tireUniversityStateLaws } from "../../../lib/tireUniversityData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getStateLawPageEligibility(params.state);
  const stateLaw = getStateLawBySlug(params.state);

  if (!stateLaw || !eligibility.indexable) {
    return {};
  }

  return {
    title: `${stateLaw.title} | Tire University`,
    description: stateLaw.summary,
    robots: {
      index: eligibility.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/tire-university/state-laws/${stateLaw.slug}`,
    },
    openGraph: {
      title: `${stateLaw.title} | TireSearchEngine`,
      description: stateLaw.summary,
      url: `${siteUrl}/tire-university/state-laws/${stateLaw.slug}`,
    },
  };
}

export default function StateLawPage({ params }) {
  const eligibility = getStateLawPageEligibility(params.state);
  const stateLaw = getStateLawBySlug(params.state);

  if (!stateLaw || !eligibility.indexable) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tire University", href: "/tire-university" },
    { label: "State Laws", href: "/tire-university/legal" },
    { label: stateLaw.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: stateLaw.title,
    description: stateLaw.summary,
    mainEntityOfPage: `${siteUrl}/tire-university/state-laws/${stateLaw.slug}`,
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">US state law page</span>
            <h1>{stateLaw.title}</h1>
            <p>{stateLaw.summary}</p>
            <div className="hero-actions">
              <Link className="search-button" href="/tires/winter">
                Explore winter and legal tire pages
              </Link>
              <Link className="ghost-link" href="/commercial-truck-tires">
                View commercial truck tire pages
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Coverage focus</span>
            <ul className="bullet-list">
              {stateLaw.keyTopics.map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related commercial pages</span>
            <h2>Keep moving from legal research into tire selection</h2>
          </div>
          <div className="category-grid">
            <Link href="/tires/winter" className="category-card">
              <h3>Winter tires</h3>
              <p>Browse winter-ready category pages tied to legal and seasonal demand.</p>
              <span>Browse winter tires</span>
            </Link>
            <Link href="/commercial-truck-tires" className="category-card">
              <h3>Commercial truck tires</h3>
              <p>Move into fleet and commercial truck tire pages with stronger buying intent.</p>
              <span>Open commercial truck hub</span>
            </Link>
            <Link href="/commercial-truck-tires/295-75r22-5" className="category-card">
              <h3>295/75R22.5 truck tires</h3>
              <p>High-intent commercial truck size page linked from legal and compliance content.</p>
              <span>Open truck size page</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
