import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { featuredSizes, siteUrl, sizeToSlug } from "../../lib/siteData";

export const metadata = {
  title: "Tire Sizes",
  description:
    "Browse popular tire sizes and move into exact-size comparison pages built for US replacement shoppers.",
  alternates: {
    canonical: "/tires/sizes",
  },
  openGraph: {
    title: "Tire Sizes | TireSearchEngine",
    description:
      "Explore popular consumer tire sizes and exact-size buying paths.",
    url: `${siteUrl}/tires/sizes`,
  },
};

export default function TireSizesHubPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tires", href: "/tires" },
    { label: "Sizes" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Size hub</span>
            <h1>Browse popular tire sizes and compare exact-fit replacement paths.</h1>
            <p>
              This hub gives shoppers a clean path into the site&apos;s strongest
              exact-size pages without relying on internal search.
            </p>
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Popular sizes</span>
            <h2>Start with a common replacement size</h2>
          </div>
          <div className="category-grid">
            {featuredSizes.map((size) => (
              <Link key={size.size} href={`/tires/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
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
