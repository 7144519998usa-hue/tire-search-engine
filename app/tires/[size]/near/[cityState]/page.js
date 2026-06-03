import JsonLd from "../../../../components/JsonLd";
import ProductGrid from "../../../../components/ProductGrid";
import RelatedSizeCards from "../../../../components/RelatedSizeCards";
import RetailerSearchFallback from "../../../../components/RetailerSearchFallback";
import { isCommercialTireSize } from "../../../../lib/getRelatedSizes";
import { breadcrumbSchema, itemListSchema } from "../../../../lib/schema";
import { getRelatedProducts, getRelatedSizeCards, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../../../lib/tireData";
import { formatCityState } from "../../../../lib/tireSizeParser";

export function generateStaticParams() {
  return tireSizes.slice(0, 12).map((size) => ({ size: sizeToSlug(size), cityState: "houston-tx" }));
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const cityState = formatCityState(params.cityState);
  const products = getStrictProducts({ size, limit: 1 });
  return {
    title: `${size} Tires Near ${cityState} | Compare Retailer Paths`,
    description: `Compare ${size} tire retailer paths near ${cityState}. Confirm availability, installation, fitment, shipping, and price on the retailer site.`,
    alternates: { canonical: `/tires/${params.size}/near/${params.cityState}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function TireNearPage({ params }) {
  const size = slugToSize(params.size);
  const cityState = formatCityState(params.cityState);
  const products = getStrictProducts({ size });
  const commercialPage = isCommercialTireSize(size);
  const relatedProducts = getRelatedProducts({ size, commercialOnly: commercialPage, limit: 6 });
  const relatedSizeCards = getRelatedSizeCards(size, { type: commercialPage ? "commercial" : "passenger", limit: 6 });
  const path = `/tires/${params.size}/near/${params.cityState}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: `${size} Tires`, href: `/tires/${params.size}` }, { name: `Near ${cityState}` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${size} tires near ${cityState}`, products, path })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Local tire retailer paths</p>
          <h1>{size} Tires Near {cityState}</h1>
          <p>Review exact-size tire options and retailer paths before checking local installation, shipping, and current availability.</p>
        </div>
        {products.length ? <ProductGrid products={products} placement="near-size" pageContext={{ size }} /> : <RetailerSearchFallback size={size} placement="near-size-empty" />}
        {(commercialPage ? relatedProducts.length : relatedSizeCards.length) ? (
          <section className="related-products" aria-label="Related tire sizes">
            <div className="section-heading compact-heading"><p className="kicker">{commercialPage ? "Related commercial truck sizes" : "Related passenger and light-truck sizes"}</p></div>
            <p className="section-note">
              {commercialPage
                ? "Commercial tire alternatives depend on axle position, load range, casing, and application. Confirm specs with the supplier before purchase."
                : "These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying."}
            </p>
            {commercialPage ? (
              <ProductGrid products={relatedProducts} placement="near-size-related" pageContext={{ size, isRelated: true, type: "commercial" }} />
            ) : (
              <RelatedSizeCards sizes={relatedSizeCards} />
            )}
          </section>
        ) : null}
      </section>
    </>
  );
}
