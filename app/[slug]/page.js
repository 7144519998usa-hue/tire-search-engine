import { notFound } from "next/navigation";
import JsonLd from "../components/JsonLd";
import ProductGrid from "../components/ProductGrid";
import RelatedSizeCards from "../components/RelatedSizeCards";
import RetailerSearchFallback from "../components/RetailerSearchFallback";
import { isCommercialTireSize } from "../lib/getRelatedSizes";
import { legacyLandingPages } from "../lib/legacyPages";
import { breadcrumbSchema, itemListSchema } from "../lib/schema";
import { getRelatedProducts, getRelatedSizeCards, getStrictProducts } from "../lib/tireData";

export function generateStaticParams() {
  return Object.keys(legacyLandingPages).map((slug) => ({ slug }));
}

function getLanding(slug = "") {
  return legacyLandingPages[slug] || null;
}

export function generateMetadata({ params }) {
  const landing = getLanding(params.slug);
  if (!landing) {
    return {};
  }
  const products = getStrictProducts({ size: landing.size, intent: landing.intent, limit: 1 });

  return {
    title: `${landing.title} | Compare Prices & Deals`,
    description: landing.description,
    alternates: { canonical: landing.canonical },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function LegacyLandingPage({ params }) {
  const landing = getLanding(params.slug);

  if (!landing) {
    notFound();
  }

  const products = getStrictProducts({ size: landing.size, intent: landing.intent });
  const commercialPage = ["drive", "steer", "trailer", "truck"].includes(landing.intent) || isCommercialTireSize(landing.size);
  const relatedProducts = getRelatedProducts({ size: landing.size, commercialOnly: commercialPage, limit: 6 });
  const relatedSizeCards = getRelatedSizeCards(landing.size, { type: commercialPage ? "commercial" : "passenger", limit: 6 });

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: landing.title, href: landing.canonical }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: landing.title, products, path: landing.canonical })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Product-first tire comparison</p>
          <h1>{landing.title}</h1>
          <p>{landing.description}</p>
        </div>
        {products.length ? (
          <ProductGrid products={products} placement={`legacy-${params.slug}`} pageContext={{ size: landing.size, position: landing.intent }} />
        ) : (
          <RetailerSearchFallback size={landing.size} intent={landing.intent} placement={`legacy-${params.slug}-empty`} />
        )}
        {(commercialPage ? relatedProducts.length : relatedSizeCards.length) ? (
          <section className="related-products" aria-label="Related tire sizes">
            <div className="section-heading compact-heading">
              <p className="kicker">{commercialPage ? "Related commercial truck sizes" : "Related passenger and light-truck sizes"}</p>
            </div>
            <p className="section-note">
              {commercialPage
                ? "Commercial tire alternatives depend on axle position, load range, casing, and application. Confirm specs with the supplier before purchase."
                : "These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying."}
            </p>
            {commercialPage ? (
              <ProductGrid products={relatedProducts} placement={`legacy-${params.slug}-related`} pageContext={{ size: landing.size, isRelated: true, type: "commercial" }} />
            ) : (
              <RelatedSizeCards sizes={relatedSizeCards} />
            )}
          </section>
        ) : null}
      </section>
    </>
  );
}
