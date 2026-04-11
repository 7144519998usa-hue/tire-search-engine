import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../components/AmazonOfferRail";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getAmazonOffersForBrand } from "../../lib/amazonOfferCatalog";
import {
  featuredBrandPages,
  getBrandPageBySlug,
  seoGuides,
  siteUrl,
  sizeToSlug,
  featuredSizes,
} from "../../lib/siteData";

export async function generateStaticParams() {
  return featuredBrandPages.map((brand) => ({ slug: brand.slug }));
}

export async function generateMetadata({ params }) {
  const brand = getBrandPageBySlug(params.slug);

  if (!brand) {
    return {};
  }

  return {
    title: `${brand.name} Tires`,
    description: brand.description,
    alternates: {
      canonical: `/brands/${brand.slug}`,
    },
    openGraph: {
      title: `${brand.name} Tires | TireSearchEngine`,
      description: brand.description,
      url: `${siteUrl}/brands/${brand.slug}`,
    },
  };
}

export default function BrandPage({ params }) {
  const brand = getBrandPageBySlug(params.slug);

  if (!brand) {
    notFound();
  }

  const brandSchema = {
    "@context": "https://schema.org",
    "@type": "Brand",
    name: brand.name,
    description: brand.description,
  };
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands/michelin" },
    { label: brand.name },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const amazonOffers = getAmazonOffersForBrand(brand.slug);
  const relatedGuides = seoGuides.slice(0, 3);
  const relatedComparisons = featuredSizes.slice(0, 2);

  return (
    <>
      <JsonLd data={brandSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Brand guide</span>
            <h1>{brand.headline}</h1>
            <p>{brand.description}</p>
            <div className="hero-actions">
              <Link className="search-button" href={brand.searchHref}>
                Shop {brand.name} tire comparisons
              </Link>
              <Link className="ghost-link" href="/">
                See more brands
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Best known for</span>
            <ul className="bullet-list">
              {brand.bestFor.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <AmazonOfferRail
          title={`${brand.name} tires on Amazon`}
          intro={`Imported Amazon offers for ${brand.name} can appear here when the catalog includes this brand and the right tire fitments.`}
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related buying paths</span>
            <h2>Continue your {brand.name} tire research</h2>
            <p>
              Jump from brand research into commercial comparisons and buyer
              guides that support stronger internal linking.
            </p>
          </div>
          <div className="category-grid">
            <Link href={brand.searchHref} className="category-card">
              <h3>Compare {brand.name} tire prices</h3>
              <p>
                Review available size-based offers and supplier pricing for
                shoppers ready to buy.
              </p>
              <span>View live offers</span>
            </Link>
            {relatedComparisons.map((size) => (
              <Link
                key={size.size}
                href={`/compare/${brand.slug}/${sizeToSlug(size.size)}`}
                className="category-card"
              >
                <h3>{brand.name} {size.size} tires</h3>
                <p>
                  Targeted comparison page for shoppers searching this brand
                  with a specific tire size in mind.
                </p>
                <span>View size-specific page</span>
              </Link>
            ))}
            {relatedGuides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="category-card">
                <h3>{guide.title}</h3>
                <p>{guide.intro}</p>
                <span>Read guide</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>
                Give {brand.name} shoppers another commercial path into the
                site&apos;s strongest Amazon-ready offer hub.
              </p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
