import JsonLd from "../../components/JsonLd";
import ConversionActionPanel from "../../components/ConversionActionPanel";
import ProductGrid from "../../components/ProductGrid";
import RetailerSearchFallback from "../../components/RetailerSearchFallback";
import CommercialLeadForm from "../../components/CommercialLeadForm";
import { breadcrumbSchema, itemListSchema } from "../../lib/schema";
import { getRelatedProducts, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../lib/tireData";

export function generateStaticParams() {
  return tireSizes.filter((size) => size.includes("R22.5") || size.includes("R24.5") || size.includes("R17.5")).map((size) => ({ size: sizeToSlug(size) }));
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const products = getStrictProducts({ size, commercialOnly: true, limit: 1 });
  return {
    title: `${size} Commercial Truck Tires | Steer, Drive, Trailer & Quotes`,
    description: `Compare ${size} commercial truck tire paths for steer, drive, trailer, fleet replacement, supplier quotes, load range, casing value, and fitment checks.`,
    alternates: { canonical: `/commercial-truck-tires/${params.size}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function CommercialSizePage({ params }) {
  const size = slugToSize(params.size);
  const products = getStrictProducts({ size, commercialOnly: true });
  const pricedCount = products.filter((product) => typeof product.price === "number").length;
  const relatedProducts = getRelatedProducts({ size, commercialOnly: true, limit: 6 });
  const path = `/commercial-truck-tires/${params.size}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires", href: "/commercial-truck-tires" }, { name: `${size} Truck Tires` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${size} commercial truck tires`, products, path })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Commercial truck tire size</p>
          <h1>{size} Commercial Truck Tires</h1>
          <p>Compare {size} steer, drive, trailer, and fleet replacement paths without mixing passenger tire results. Confirm load range, casing, axle position, route type, and application with the retailer or supplier.</p>
        </div>
        <div className="intent-cards">
          <a href={`/commercial-truck-tires/${params.size}/steer`}>Steer tires</a>
          <a href={`/commercial-truck-tires/${params.size}/drive`}>Drive tires</a>
          <a href={`/commercial-truck-tires/${params.size}/trailer`}>Trailer tires</a>
        </div>
        <ConversionActionPanel
          size={size}
          intent="commercial truck"
          commercial
          productCount={products.length}
          pricedCount={pricedCount}
          placement="commercial-size-top"
        />
        {products.length ? <ProductGrid products={products} placement="commercial-size" pageContext={{ size }} /> : <RetailerSearchFallback size={size} commercial placement="commercial-size-empty" />}
        <CommercialLeadForm size={size} />
        {relatedProducts.length ? (
          <section className="related-products" aria-label="Popular nearby commercial sizes">
            <div className="section-heading compact-heading"><p className="kicker">Popular nearby commercial sizes</p></div>
            <p className="section-note">Other commercial sizes are shown for comparison only. Confirm exact size and load range before buying.</p>
            <ProductGrid products={relatedProducts} placement="commercial-size-related" pageContext={{ size, isRelated: true }} />
          </section>
        ) : null}
      </section>
    </>
  );
}
