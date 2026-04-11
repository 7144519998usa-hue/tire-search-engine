import Link from "next/link";
import Breadcrumbs from "../components/Breadcrumbs";
import JsonLd from "../components/JsonLd";
import { buildBreadcrumbSchema } from "../lib/breadcrumbs";
import { featuredSizes, siteUrl, sizeToSlug } from "../lib/siteData";

export const metadata = {
  title: "Tire Sizes",
  description:
    "Browse popular tire sizes and move into exact tire-size landing pages built for comparison shopping and strong internal linking.",
  alternates: {
    canonical: "/tire-sizes",
  },
  openGraph: {
    title: "Tire Sizes | TireSearchEngine",
    description:
      "Explore popular tire sizes and compare the fitments shoppers search most.",
    url: `${siteUrl}/tire-sizes`,
  },
};

export default function TireSizesHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tire Sizes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Tire Sizes",
    description:
      "A hub page linking to popular tire-size landing pages and commercial comparison paths.",
    url: `${siteUrl}/tire-sizes`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Tire size hub</span>
            <h1>Shop the tire sizes drivers search for most.</h1>
            <p>
              This hub page connects high-demand tire sizes to deeper
              comparison pages, brand guides, and buying paths.
            </p>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Why this page matters</span>
            <ul className="bullet-list">
              <li>High-level crawl hub for tire-size intent.</li>
              <li>Clean path into commercial comparison pages.</li>
              <li>Supports both SEO and shopper navigation.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Popular tire sizes</span>
            <h2>Choose a tire size to compare</h2>
          </div>
          <div className="category-grid">
            {featuredSizes.map((size) => (
              <Link key={size.size} href={`/tire-size/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>View tire-size page</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
