import JsonLd from "../../../../components/JsonLd";
import ProductGrid from "../../../../components/ProductGrid";
import RetailerSearchFallback from "../../../../components/RetailerSearchFallback";
import CommercialLeadForm from "../../../../components/CommercialLeadForm";
import { breadcrumbSchema, itemListSchema } from "../../../../lib/schema";
import { getRelatedProducts, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../../../lib/tireData";
import { formatCityState } from "../../../../lib/tireSizeParser";

export function generateStaticParams() {
  return tireSizes
    .filter((size) => size.includes("R22.5") || size.includes("R24.5") || size.includes("R17.5"))
    .slice(0, 12)
    .map((size) => ({ size: sizeToSlug(size), cityState: "houston-tx" }));
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const cityState = formatCityState(params.cityState);
  const products = getStrictProducts({ size, commercialOnly: true, limit: 1 });
  return {
    title: `${size} Truck Tires Near ${cityState} | Commercial Tire Paths`,
    description: `Compare ${size} truck tire retailer and quote paths near ${cityState}. Confirm position, load range, casing, and availability before purchase.`,
    alternates: { canonical: `/commercial-truck-tires/${params.size}/near/${params.cityState}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function CommercialNearPage({ params }) {
  const size = slugToSize(params.size);
  const cityState = formatCityState(params.cityState);
  const products = getStrictProducts({ size, commercialOnly: true });
  const relatedProducts = getRelatedProducts({ size, commercialOnly: true, limit: 6 });
  const path = `/commercial-truck-tires/${params.size}/near/${params.cityState}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires", href: "/commercial-truck-tires" }, { name: `${size} Truck Tires`, href: `/commercial-truck-tires/${params.size}` }, { name: `Near ${cityState}` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${size} commercial truck tires near ${cityState}`, products, path })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Commercial truck tire location page</p>
          <h1>{size} Truck Tires Near {cityState}</h1>
          <p>Compare exact-size commercial tire paths for local availability, fleet sourcing, owner-operator replacement, and supplier quote requests.</p>
        </div>
        {products.length ? <ProductGrid products={products} placement="commercial-near-size" pageContext={{ size }} /> : <RetailerSearchFallback size={size} commercial placement="commercial-near-size-empty" />}
        <CommercialLeadForm size={size} cityState={cityState} />
        {relatedProducts.length ? (
          <section className="related-products" aria-label="Popular nearby commercial sizes">
            <div className="section-heading compact-heading"><p className="kicker">Popular nearby commercial sizes</p></div>
            <p className="section-note">Other commercial sizes are shown for comparison only. Confirm exact size and load range before buying.</p>
            <ProductGrid products={relatedProducts} placement="commercial-near-related" pageContext={{ size, isRelated: true }} />
          </section>
        ) : null}
      </section>
    </>
  );
}
