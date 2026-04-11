import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../components/AmazonOfferRail";
import Breadcrumbs from "../../../components/Breadcrumbs";
import JsonLd from "../../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../../lib/breadcrumbs";
import { getAmazonOffersForBrandSize } from "../../../lib/amazonOfferCatalog";
import {
  getBrandSizePageData,
  getBrandSizePageUrl,
  getProgrammaticBrandSizeCombos,
} from "../../../lib/programmaticSeo";
import { seoGuides } from "../../../lib/siteData";

export async function generateStaticParams() {
  return getProgrammaticBrandSizeCombos().map((item) => ({
    brand: item.brandSlug,
    size: item.sizeSlug,
  }));
}

export async function generateMetadata({ params }) {
  const page = getBrandSizePageData(params.brand, params.size);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title}: Compare Prices and Suppliers`,
    description: page.description,
    alternates: {
      canonical: page.canonicalPath,
    },
    openGraph: {
      title: `${page.title} | TireSearchEngine`,
      description: page.description,
      url: getBrandSizePageUrl(params.brand, params.size),
    },
  };
}

export default function BrandSizeComparisonPage({ params }) {
  const page = getBrandSizePageData(params.brand, params.size);

  if (!page) {
    notFound();
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.headline,
    description: page.description,
    mainEntityOfPage: getBrandSizePageUrl(params.brand, params.size),
  };
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Brands", href: `/brands/${page.brand.slug}` },
    { label: page.brand.name, href: `/brands/${page.brand.slug}` },
    { label: page.size.size, href: `/tire-size/${params.size}` },
    { label: `${page.brand.name} ${page.size.size}` },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const amazonOffers = getAmazonOffersForBrandSize(params.brand, params.size);
  const relatedGuides = seoGuides.slice(0, 2);

  return (
    <>
      <JsonLd data={articleSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Programmatic comparison page</span>
            <h1>{page.headline}</h1>
            <p>{page.intro}</p>
            <div className="hero-actions">
              <Link className="search-button" href={page.searchHref}>
                Compare live {page.size.size} offers
              </Link>
              <Link className="ghost-link" href={`/brands/${page.brand.slug}`}>
                View {page.brand.name} brand page
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Why this page exists</span>
            <ul className="bullet-list">
              {page.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="guide-grid">
          {page.faq.map((item) => (
            <article key={item.question} className="content-card">
              <h2>{item.question}</h2>
              <p>{item.answer}</p>
            </article>
          ))}
        </section>

        <AmazonOfferRail
          title={`${page.brand.name} ${page.size.size} Amazon offers`}
          intro="These placements can be filled automatically when the imported Amazon catalog matches this brand and tire size combination."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related pages</span>
            <h2>Keep this comparison connected</h2>
            <p>
              Strong internal links help this commercial comparison page stay
              connected to the broader size, brand, guide, and deals graph.
            </p>
          </div>
          <div className="category-grid">
            <Link href={`/tire-size/${params.size}`} className="category-card">
              <h3>{page.size.size} tire-size page</h3>
              <p>
                Broader size page for shoppers who want more brands and
                suppliers before narrowing down again.
              </p>
              <span>View size page</span>
            </Link>
            <Link href={`/brands/${page.brand.slug}`} className="category-card">
              <h3>{page.brand.name} brand guide</h3>
              <p>
                Learn more about {page.brand.name} before comparing this exact
                fitment and deal path.
              </p>
              <span>View brand page</span>
            </Link>
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
                Commercial deal hub for shoppers ready to compare strong Amazon
                offer placements across top tire categories.
              </p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
