import JsonLd from "../../../components/JsonLd";
import ProductGrid from "../../../components/ProductGrid";
import RetailerSearchFallback from "../../../components/RetailerSearchFallback";
import CommercialLeadForm from "../../../components/CommercialLeadForm";
import { breadcrumbSchema, itemListSchema } from "../../../lib/schema";
import { getRelatedProducts, getStrictProducts, sizeToSlug, slugToSize, tireSizes } from "../../../lib/tireData";

const positions = ["steer", "drive", "trailer"];

export function generateStaticParams() {
  return tireSizes
    .filter((size) => size.includes("R22.5") || size.includes("R24.5") || size.includes("R17.5"))
    .flatMap((size) => positions.map((position) => ({ size: sizeToSlug(size), position })));
}

export function generateMetadata({ params }) {
  const size = slugToSize(params.size);
  const products = getStrictProducts({ size, intent: params.position, commercialOnly: true, position: params.position, limit: 1 });
  return {
    title: `${size} ${params.position} Truck Tires | Compare Commercial Options`,
    description: `Compare ${size} ${params.position} commercial truck tire paths, Tire Rack options, supplier search links, and fitment notes.`,
    alternates: { canonical: `/commercial-truck-tires/${params.size}/${params.position}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function CommercialSizePositionPage({ params }) {
  const size = slugToSize(params.size);
  const products = getStrictProducts({ size, intent: params.position, commercialOnly: true, position: params.position });
  const relatedProducts = getRelatedProducts({ size, commercialOnly: true, limit: 6 });
  const label = params.position.replace(/-/g, " ");
  const path = `/commercial-truck-tires/${params.size}/${params.position}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires", href: "/commercial-truck-tires" }, { name: `${size} Truck Tires`, href: `/commercial-truck-tires/${params.size}` }, { name: `${label} tires` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${size} ${label} commercial truck tires`, products, path })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Commercial {label} tire comparison</p>
          <h1>{size} {label} Truck Tires</h1>
          <p>Main results only include {size} tires for the {label} position. Related commercial sizes are separated below.</p>
        </div>
        {products.length ? <ProductGrid products={products} placement={`commercial-${params.position}-size`} pageContext={{ size, position: params.position }} /> : <RetailerSearchFallback size={size} intent={label} commercial placement={`commercial-${params.position}-empty`} />}
        <CommercialLeadForm size={size} position={label} />
        {relatedProducts.length ? (
          <section className="related-products" aria-label="Popular nearby commercial sizes">
            <div className="section-heading compact-heading"><p className="kicker">Popular nearby commercial sizes</p></div>
            <p className="section-note">Other commercial sizes are shown for comparison only. Confirm exact size and axle position before buying.</p>
            <ProductGrid products={relatedProducts} placement={`commercial-${params.position}-related`} pageContext={{ size, isRelated: true }} />
          </section>
        ) : null}
      </section>
    </>
  );
}
