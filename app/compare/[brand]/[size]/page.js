import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../../components/AmazonOfferRail";
import JsonLd from "../../../components/JsonLd";
import { getAmazonOffersForBrandSize } from "../../../lib/amazonOfferCatalog";
import {
  getBrandSizePageData,
  getBrandSizePageUrl,
  getProgrammaticBrandSizeCombos,
} from "../../../lib/programmaticSeo";

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
  const amazonOffers = getAmazonOffersForBrandSize(params.brand, params.size);

  return (
    <>
      <JsonLd data={articleSchema} />
      <main className="page-shell guide-shell">
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
      </main>
    </>
  );
}
