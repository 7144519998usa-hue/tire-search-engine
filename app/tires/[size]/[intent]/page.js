import JsonLd from "../../../components/JsonLd";
import ConversionActionPanel from "../../../components/ConversionActionPanel";
import InternalLinkPanel from "../../../components/InternalLinkPanel";
import ProductGrid from "../../../components/ProductGrid";
import RelatedSizeCards from "../../../components/RelatedSizeCards";
import RetailerSearchFallback from "../../../components/RetailerSearchFallback";
import { getTireResults } from "../../../lib/getTireResults";
import { getInternalLinks } from "../../../lib/internalLinks";
import { isCommercialTireSize } from "../../../lib/getRelatedSizes";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../../lib/schema";
import { descriptionForTireIntent, faqsForTireIntent, introForTireIntent, labelForIntent, robotsForPage, sitemapIntents, titleForTireIntent } from "../../../lib/seo";
import { getRelatedSizeCards, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../../lib/tireData";

const intents = sitemapIntents;

export function generateStaticParams() {
  return tireSizes.flatMap((size) =>
    intents.map((intent) => ({ size: sizeToSlug(size), intent }))
  );
}

function intentLabel(intent = "") {
  return labelForIntent(intent);
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const label = intentLabel(params.intent);
  const products = getStrictProducts({ size, intent: params.intent, limit: 1 });
  return {
    title: titleForTireIntent(size, params.intent),
    description: descriptionForTireIntent(size, params.intent),
    alternates: { canonical: `/tires/${params.size}/${params.intent}` },
    robots: robotsForPage({ products })
  };
}

export default function TireIntentPage({ params }) {
  const size = slugToSize(params.size);
  const label = intentLabel(params.intent);
  const { exactProducts: products, relatedProducts, isCommercialIntent } = getTireResults({ size, intent: params.intent });
  const pricedCount = products.filter((product) => typeof product.price === "number").length;
  const pageType = isCommercialIntent || isCommercialTireSize(size) ? "commercial" : "passenger";
  const commercialPage = pageType === "commercial";
  const relatedSizeCards = getRelatedSizeCards(size, { type: commercialPage ? "commercial" : "passenger", limit: 6 });
  const path = `/tires/${params.size}/${params.intent}`;
  const internalLinks = getInternalLinks({ size, commercial: commercialPage });
  const intro = introForTireIntent(size, params.intent);
  const faqs = faqsForTireIntent(size, params.intent);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: `${size} Tires`, href: `/tires/${params.size}` }, { name: `${label} ${size} tires`, href: path }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${label} ${size} tires`, products, path })} /> : null}
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Intent-focused tire comparison</p>
          <h1>{label} {size} tires</h1>
          <p>{intro}</p>
        </div>
        <ConversionActionPanel
          size={size}
          intent={label}
          commercial={commercialPage}
          productCount={products.length}
          pricedCount={pricedCount}
          placement={`intent-${params.intent}-top`}
        />
        {products.length ? (
          <ProductGrid products={products} placement={`intent-${params.intent}`} pageContext={{ size, size_slug: params.size, type: pageType, position: params.intent }} />
        ) : (
          <RetailerSearchFallback size={size} intent={label} commercial={isCommercialIntent} placement={`intent-${params.intent}-empty`} />
        )}
        {(commercialPage ? relatedProducts.length : relatedSizeCards.length) ? (
          <section className="related-products" aria-label="Related sizes">
            <div className="section-heading compact-heading">
              <p className="kicker">{commercialPage ? "Related commercial truck sizes" : "Related passenger and light-truck sizes"}</p>
            </div>
            <p className="section-note">
              {commercialPage
                ? "Commercial tire alternatives depend on axle position, load range, casing, and application. Confirm specs with the supplier before purchase."
                : "These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying."}
            </p>
            {commercialPage ? (
              <ProductGrid products={relatedProducts} placement={`intent-${params.intent}-related`} pageContext={{ size, size_slug: params.size, type: pageType, isRelated: true }} />
            ) : (
              <RelatedSizeCards sizes={relatedSizeCards} />
            )}
          </section>
        ) : null}
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
      </section>
    </>
  );
}
