import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { seoGuides, siteUrl } from "../lib/siteData";

export const metadata = {
  title: "Tire Buying Guides",
  description:
    "Browse tire buying guides built around high-intent shopper questions, category comparisons, and strong internal linking.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "Tire Buying Guides | TireSearchEngine",
    description:
      "Read tire buying guides for all-season, SUV, truck, and premium tire categories.",
    url: `${siteUrl}/guides`,
  },
};

export default function GuidesHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Guides" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tire Buying Guides",
    description:
      "A hub page linking to tire buying guides and informational-to-commercial SEO paths.",
    url: `${siteUrl}/guides`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Guide hub</span>
            <h1>Tire buying guides for the searches drivers make before they buy.</h1>
            <p>
              These guide pages support informational traffic and connect it to
              tire-size, brand, vehicle, and deal pages.
            </p>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Role in the site</span>
            <ul className="bullet-list">
              <li>Information-to-commercial bridge.</li>
              <li>Supports internal links into money pages.</li>
              <li>Targets broader category demand.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Buying guides</span>
            <h2>Explore guide pages</h2>
          </div>
          <div className="category-grid">
            {seoGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="category-card">
                <h3>{guide.title}</h3>
                <p>{guide.intro}</p>
                <span>Read guide</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
