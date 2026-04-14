import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../components/AmazonOfferRail";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { getAmazonOffersForSize } from "../../../lib/amazonOfferCatalog";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getCategorySizePageEligibility } from "../../../lib/pageEligibility";
import { getFeaturedSizeBySlug, siteUrl, sizeToSlug } from "../../../lib/siteData";
import { getTireCategoryBySlug } from "../../../lib/tireCategories";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  const eligibility = getCategorySizePageEligibility(params.slug, params.size);
  const category = getTireCategoryBySlug(params.slug);
  const size = getFeaturedSizeBySlug(params.size);

  if (!category || !size || !eligibility.indexable) {
    return {};
  }

  return {
    title: `${category.title} in ${size.size}`,
    description: `Compare ${category.title.toLowerCase()} in ${size.size} across top brands, shopping paths, and live offer pages.`,
    robots: {
      index: eligibility.indexable,
      follow: true,
    },
    alternates: {
      canonical: `/tires/${category.slug}/${params.size}`,
    },
    openGraph: {
      title: `${category.title} ${size.size} | TireSearchEngine`,
      description: `Category-plus-size page for ${category.title.toLowerCase()} in ${size.size}.`,
      url: `${siteUrl}/tires/${category.slug}/${params.size}`,
    },
  };
}

export default function CategorySizePage({ params }) {
  const eligibility = getCategorySizePageEligibility(params.slug, params.size);
  const category = getTireCategoryBySlug(params.slug);
  const size = getFeaturedSizeBySlug(params.size);

  if (!category || !size || !eligibility.indexable) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tires", href: "/tires" },
    { label: category.title, href: `/tires/${category.slug}` },
    { label: size.size },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: `${category.title} ${size.size}`,
    description: `Category-plus-size page for ${category.title.toLowerCase()} in ${size.size}.`,
    url: `${siteUrl}/tires/${category.slug}/${params.size}`,
  };
  const amazonOffers = getAmazonOffersForSize(size.size);
  const relatedBrands = category.brands.slice(0, 4);

  return (
    <>
      <JsonLd data={pageSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Category + size</span>
            <h1>{category.title} in {size.size} for US shoppers comparing exact fitment and tire type.</h1>
            <p>
              This intersection page targets shoppers who already know the tire
              category they want and the exact size they need.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href={`/search?size=${encodeURIComponent(size.size)}`}>
                Compare {size.size} offers
              </Link>
              <Link className="ghost-link" href={`/tires/${category.slug}`}>
                View {category.title.toLowerCase()}
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Why it matters</span>
            <ul className="bullet-list">
              <li>Combines exact-size and category intent in one page.</li>
              <li>Supports long-tail US search behavior.</li>
              <li>Feeds shoppers into brands, deals, and vehicle pages.</li>
            </ul>
          </aside>
        </section>

        <AmazonOfferRail
          title={`${category.shortLabel} ${size.size} Amazon offers`}
          intro="Amazon-ready offers for this category-size intersection can render here when they match the exact size."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related links</span>
            <h2>Move deeper from this intersection page</h2>
          </div>
          <div className="category-grid">
            <Link href={`/tires/${sizeToSlug(size.size)}`} className="category-card">
              <h3>{size.size} tire-size page</h3>
              <p>Compare brands and shopping paths for this exact tire size.</p>
              <span>View tire-size page</span>
            </Link>
            {relatedBrands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}/${params.size}`} className="category-card">
                <h3>{brand.name} {size.size} tires</h3>
                <p>Brand-plus-size page tied to this exact replacement fitment.</p>
                <span>View brand-size page</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>Curated deal hub for US tire shoppers ready to compare live offers.</p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
