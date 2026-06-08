import JsonLd from "../../components/JsonLd";
import ConversionActionPanel from "../../components/ConversionActionPanel";
import InternalLinkPanel from "../../components/InternalLinkPanel";
import ProductGrid from "../../components/ProductGrid";
import RelatedSizeCards from "../../components/RelatedSizeCards";
import RetailerSearchFallback from "../../components/RetailerSearchFallback";
import { entityCoverageForSize } from "../../lib/entityCoverage";
import { tireSizeFaqs } from "../../lib/faqData";
import { getTireResults } from "../../lib/getTireResults";
import { getInternalLinks } from "../../lib/internalLinks";
import { isCommercialTireSize } from "../../lib/getRelatedSizes";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../lib/schema";
import { descriptionForTireSize, robotsForPage, titleForTireSize } from "../../lib/seo";
import { getRelatedSizeCards, getRelatedSizeLinks, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../lib/tireData";

export function generateStaticParams() {
  return tireSizes.map((size) => ({ size: sizeToSlug(size) }));
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const products = getStrictProducts({ size, limit: 1 });
  return {
    title: titleForTireSize(size),
    description: descriptionForTireSize(size),
    alternates: { canonical: `/tires/${params.size}` },
    robots: robotsForPage({ products })
  };
}

export default function TireSizePage({ params }) {
  const size = slugToSize(params.size);
  const { exactProducts: products, relatedProducts } = getTireResults({ size });
  const pricedCount = products.filter((product) => typeof product.price === "number").length;
  const pageType = isCommercialTireSize(size) ? "commercial" : "passenger";
  const commercialPage = pageType === "commercial";
  const relatedSizeCards = getRelatedSizeCards(size, { type: commercialPage ? "commercial" : "passenger", limit: 6 });
  const path = `/tires/${params.size}`;
  const internalLinks = getInternalLinks({ size, commercial: commercialPage });
  const entities = entityCoverageForSize({ size, relatedSizeCards });
  const faqs = tireSizeFaqs(size, relatedSizeCards);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Tires", href: "/shop-tires" }, { name: `${size} Tires` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${size} tires`, products, path })} /> : null}
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Exact-size tire comparison</p>
          <h1>{size} Tires: Compare Prices, Brands & Options</h1>
          <p>Only exact {size} tire matches appear in the main results. Confirm tire size, load rating, speed rating, and fitment on the retailer site before buying.</p>
        </div>
        <div className="intent-cards">
          <a href={`/tires/${params.size}/best`}>Best {size} tires</a>
          <a href={`/tires/${params.size}/budget`}>Budget {size} tires</a>
          <a href={`/tires/${params.size}/all-season`}>All-season {size} tires</a>
        </div>
        <ConversionActionPanel
          size={size}
          commercial={commercialPage}
          productCount={products.length}
          pricedCount={pricedCount}
          placement="size-page-top"
        />
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">Size guide</p>
          </div>
          <div className="info-grid">
            <article>
              <h2>What {size} means</h2>
              <p>{size} identifies the tire dimensions used for fitment. Match this size exactly unless a qualified installer confirms an alternative.</p>
            </article>
            <article>
              <h2>Buying considerations</h2>
              <p>Compare category, load rating, speed rating, installation, shipping, current price, and whether the retailer fitment tool matches your vehicle.</p>
            </article>
          </div>
        </section>
        <div className="info-grid">
          <article>
            <h2>Vehicles using this size</h2>
            <div className="mini-link-row">
              {entities.vehicles.length ? entities.vehicles.map((item) => <a key={item.href} href={item.href}>{item.label}</a>) : <a href="/vehicles">Find tires by vehicle</a>}
            </div>
          </article>
          <article>
            <h2>Brands available in this size</h2>
            <div className="mini-link-row">
              {entities.brands.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </div>
          </article>
          <article>
            <h2>Tire categories available</h2>
            <div className="mini-link-row">
              {entities.categories.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </div>
          </article>
          <article>
            <h2>Common alternatives</h2>
            <div className="mini-link-row">
              {entities.alternatives.map((item) => <a key={item.href} href={item.href}>{item.label}</a>)}
            </div>
          </article>
        </div>
        {products.length ? (
          <ProductGrid products={products} placement="size-page" pageContext={{ size, size_slug: params.size, type: pageType }} />
        ) : (
          <RetailerSearchFallback size={size} placement="size-page-empty" />
        )}
        {(commercialPage ? relatedProducts.length : relatedSizeCards.length) ? (
          <section className="related-products" aria-label="Other popular tire sizes">
            <div className="section-heading compact-heading">
              <p className="kicker">{commercialPage ? "Related commercial truck sizes" : "Related passenger and light-truck sizes"}</p>
            </div>
            <p className="section-note">
              {commercialPage
                ? "Commercial tire alternatives depend on axle position, load range, casing, and application. Confirm specs with the supplier before purchase."
                : "These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying."}
            </p>
            {commercialPage ? (
              <ProductGrid products={relatedProducts} placement="related-size-products" pageContext={{ size, size_slug: params.size, type: pageType, isRelated: true }} />
            ) : (
              <RelatedSizeCards sizes={relatedSizeCards} />
            )}
          </section>
        ) : null}
        <div className="link-band">
          {getRelatedSizeLinks(size).map((item) => (
            <a key={item.href} href={item.href}>{item.label}</a>
          ))}
        </div>
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">FAQ</p>
          </div>
          <div className="faq-list">
            {faqs.map((faq) => (
              <details key={faq.question}>
                <summary>{faq.question}</summary>
                <p>{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
        <InternalLinkPanel links={internalLinks} />
        <p className="fitment-note">Reviewed by the Tire Search Engine editorial team. Updated June 3, 2026. Sources: retailer fitment tools, tire sidewall specifications, manufacturer information, and the Tire Search Engine methodology.</p>
      </section>
    </>
  );
}
