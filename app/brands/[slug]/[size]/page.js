import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../components/AmazonOfferRail";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { getAmazonOffersForBrandSize } from "../../../lib/amazonOfferCatalog";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getBrandSizePageEligibility } from "../../../lib/pageEligibility";
import { getBrandPageBySlug, getFeaturedSizeBySlug, siteUrl } from "../../../lib/siteData";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getBrandSizePageEligibility(params.slug, params.size);
  const brand = getBrandPageBySlug(params.slug);
  const size = getFeaturedSizeBySlug(params.size);

  if (!brand || !size || !eligibility.indexable) {
    return {};
  }

  return {
    title: `${brand.name} ${size.size} Tires`,
    description: `${brand.name} ${size.size} tires for shoppers comparing brand trust, fitment, and price.`,
    robots: {
      index: eligibility.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/brands/${brand.slug}/${params.size}`,
    },
    openGraph: {
      title: `${brand.name} ${size.size} Tires | TireSearchEngine`,
      description: `Brand-plus-size page for ${brand.name} ${size.size} tires.`,
      url: `${siteUrl}/brands/${brand.slug}/${params.size}`,
    },
  };
}

export default function BrandSizePage({ params }) {
  const eligibility = getBrandSizePageEligibility(params.slug, params.size);
  const brand = getBrandPageBySlug(params.slug);
  const size = getFeaturedSizeBySlug(params.size);

  if (!brand || !size || !eligibility.indexable) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: "/brands" },
    { label: brand.name, href: `/brands/${brand.slug}` },
    { label: size.size },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${brand.name} ${size.size} Tires`,
    description: `${brand.name} ${size.size} tires for US shoppers comparing exact size and brand intent.`,
    url: `${siteUrl}/brands/${brand.slug}/${params.size}`,
  };
  const amazonOffers = getAmazonOffersForBrandSize(brand.slug, params.size);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Brand + size</span>
            <h1>{brand.name} {size.size} tires for shoppers narrowing from brand trust to exact fitment.</h1>
            <p>
              Compare this brand and exact tire size in one place before moving
              into current offers and broader brand research.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href={`/search?size=${encodeURIComponent(size.size)}`}>
                Compare {size.size} offers
              </Link>
              <Link className="ghost-link" href={`/brands/${brand.slug}`}>
                View {brand.name} brand page
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Helpful for</span>
            <ul className="bullet-list">
              <li>Shoppers narrowing from brand trust to exact fitment.</li>
              <li>Comparing current offers for one tire size.</li>
              <li>Researching replacement options before checkout.</li>
            </ul>
          </aside>
        </section>

        <AmazonOfferRail
          title={`${brand.name} ${size.size} Amazon offers`}
          intro="Imported Amazon offers matching this brand and exact size will render here automatically."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related paths</span>
            <h2>Continue comparing from this brand-size page</h2>
          </div>
          <div className="category-grid">
            <Link href={`/tires/${params.size}`} className="category-card">
              <h3>{size.size} tire-size page</h3>
              <p>Broader exact-size page for more brands and shopping paths.</p>
              <span>View tire-size page</span>
            </Link>
            <Link href={`/brands/${brand.slug}`} className="category-card">
              <h3>{brand.name} tire guide</h3>
              <p>Brand-level page for broader research before choosing a fitment.</p>
              <span>View brand page</span>
            </Link>
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>Curated deal hub for US tire shoppers ready to compare checkout options.</p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
