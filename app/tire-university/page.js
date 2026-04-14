import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { siteUrl } from "../lib/siteData";
import { tireUniversitySections, tireUniversityStateLaws } from "../lib/tireUniversityData";

export const metadata = {
  title: "Tire University",
  description:
    "Structured tire education for US drivers, truck owners, and fleets covering buying guides, tire sizes, legal rules, and commercial truck resources.",
  alternates: {
    canonical: "/tire-university",
  },
  openGraph: {
    title: "Tire University | TireSearchEngine",
    description:
      "Explore Tire University for tire education, state laws, size guidance, and fleet resources.",
    url: `${siteUrl}/tire-university`,
  },
};

export default function TireUniversityPage() {
  const breadcrumbItems = [{ label: "Home", href: "/" }, { label: "Tire University" }];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tire University",
    description:
      "A US-focused tire education center linking buying guides, size education, state laws, and commercial truck resources.",
    url: `${siteUrl}/tire-university`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Authority center</span>
            <h1>Tire University for US tire education, legal guidance, and stronger buying confidence.</h1>
            <p>
              Tire University is the structured learning center for shoppers
              researching tire sizes, state laws, truck tire basics, and buying
              decisions before moving into comparison pages.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/tires">
                Browse tire categories
              </Link>
              <Link className="ghost-link" href="/truck-tires">
                Explore truck & commercial pages
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">What you will learn</span>
            <ul className="bullet-list">
              <li>Tire size, category, and fitment basics.</li>
              <li>State law and winter requirement guidance.</li>
              <li>Truck, fleet, and work-vehicle education.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Core learning paths</span>
            <h2>Explore Tire University sections</h2>
          </div>
          <div className="category-grid">
            {tireUniversitySections.map((section) => (
              <Link key={section.slug} href={`/tire-university/${section.slug}`} className="category-card">
                <h3>{section.title}</h3>
                <p>{section.intro}</p>
                <span>Open section</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">State law coverage</span>
            <h2>Featured US state tire law pages</h2>
          </div>
          <div className="category-grid">
            {tireUniversityStateLaws.map((state) => (
              <Link
                key={state.slug}
                href={`/tire-university/state-laws/${state.slug}`}
                className="category-card"
              >
                <h3>{state.title}</h3>
                <p>{state.summary}</p>
                <span>Read state guidance</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
