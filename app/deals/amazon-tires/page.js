import Link from "next/link";
import AmazonOfferRail from "../../components/AmazonOfferRail";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getTopAmazonOffers } from "../../lib/amazonOfferCatalog";
import { featuredBrandPages, featuredSizes, seoGuides, siteUrl, sizeToSlug } from "../../lib/siteData";

export const metadata = {
  title: "Top Amazon Tire Deals",
  description:
    "Browse Amazon tire deals mapped to the most-searched tire sizes, brands, and buying-guide pages on TireSearchEngine.",
  alternates: {
    canonical: "/deals/amazon-tires",
  },
  openGraph: {
    title: "Top Amazon Tire Deals | TireSearchEngine",
    description:
      "Find Amazon tire deals connected to top tire sizes, leading brands, and high-intent tire shopping paths.",
    url: `${siteUrl}/deals/amazon-tires`,
  },
};

export default function AmazonDealsPage() {
  const offers = getTopAmazonOffers(12);
  const relatedSizes = featuredSizes.slice(0, 4);
  const relatedBrands = featuredBrandPages.slice(0, 4);
  const relatedGuides = seoGuides.slice(0, 3);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Top Amazon Tire Deals",
    description:
      "A curated Amazon tire-deals page connected to the site's size, brand, and guide content.",
    url: `${siteUrl}/deals/amazon-tires`,
  };
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Deals", href: "/deals/amazon-tires" },
    { label: "Amazon Tires" },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Amazon deal hub</span>
            <h1>Top Amazon tire deals for the sizes and categories shoppers search most.</h1>
            <p>
              This page brings together the highest-priority Amazon tire offers so
              shoppers can move from research into a size, brand, or vehicle page
              and then click through to buy.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/search?size=205/55R16">
                Compare live tire offers
              </Link>
              <Link className="ghost-link" href="/">
                Back to homepage
              </Link>
            </div>
          </div>

          <aside className="size-hero-panel">
            <span className="panel-kicker">Best use for this page</span>
            <ul className="bullet-list">
              <li>Internal linking target from commercial buying guides.</li>
              <li>Extra monetization path from brand and size pages.</li>
              <li>Curated Amazon offer hub for high-intent traffic.</li>
            </ul>
          </aside>
        </section>

        <AmazonOfferRail
          title="Featured Amazon tire deals"
          intro="These imported Amazon offers are prioritized for the most valuable sizes, brands, and vehicle-driven searches."
          items={offers}
          limit={12}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Explore by size</span>
            <h2>Top tire-size pages</h2>
          </div>
          <div className="category-grid">
            {relatedSizes.map((size) => (
              <Link key={size.size} href={`/tire-size/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>View size page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Explore by brand</span>
            <h2>Top brand pages</h2>
          </div>
          <div className="category-grid">
            {relatedBrands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>View brand page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Buying guides</span>
            <h2>High-intent guide pages</h2>
          </div>
          <div className="category-grid">
            {relatedGuides.map((guide) => (
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
