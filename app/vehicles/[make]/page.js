import JsonLd from "../../components/JsonLd";
import ProductGrid from "../../components/ProductGrid";
import RelatedSizeCards from "../../components/RelatedSizeCards";
import RetailerSearchFallback from "../../components/RetailerSearchFallback";
import { breadcrumbSchema, itemListSchema } from "../../lib/schema";
import { getRelatedSizeCards, getStrictProducts, vehicleFitments } from "../../lib/tireData";
import { vehicleDisplayName } from "../../lib/vehicleNames";

export function generateMetadata({ params }) {
  const make = vehicleDisplayName(params.make);
  const makeFitments = vehicleFitments.filter((fitment) => fitment.make === params.make);
  const size = makeFitments[0]?.size || "225/65R17";
  const products = getStrictProducts({ size, intent: makeFitments[0]?.intent || "all-season", limit: 1 });
  return {
    title: `${make} Tires | Compare Prices & Deals`,
    description: `Compare ${make} tire replacement pages, common sizes, Tire Rack links, Mavis installed options, and Amazon marketplace choices.`,
    alternates: { canonical: `/vehicles/${params.make}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function VehicleMakePage({ params }) {
  const make = vehicleDisplayName(params.make);
  const makeFitments = vehicleFitments.filter((fitment) => fitment.make === params.make);
  const size = makeFitments[0]?.size || "225/65R17";
  const intent = makeFitments[0]?.intent || "all-season";
  const products = getStrictProducts({ size, intent });
  const relatedSizeCards = getRelatedSizeCards(size, { type: "passenger", limit: 6 });

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Vehicles" }, { name: `${make} tires` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${make} tire options`, products, path: `/vehicles/${params.make}` })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Vehicle tire hub</p>
          <h1>{make} tires</h1>
          <p>Compare tire options by year, model, common replacement size, and retailer.</p>
        </div>
        {makeFitments.length ? (
          <div className="intent-cards">
            {makeFitments.map((fitment) => (
              <a key={`${fitment.make}-${fitment.model}-${fitment.year}`} href={`/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`}>
                {fitment.label}
              </a>
            ))}
          </div>
        ) : null}
        {products.length ? (
          <ProductGrid products={products} placement={`vehicle-make-${params.make}`} />
        ) : (
          <RetailerSearchFallback size={size} intent={intent} placement={`vehicle-make-${params.make}-empty`} />
        )}
        {relatedSizeCards.length ? (
          <section className="related-products" aria-label="Related tire sizes">
            <div className="section-heading compact-heading">
              <p className="kicker">Related passenger and light-truck sizes</p>
            </div>
            <p className="section-note">These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying.</p>
            <RelatedSizeCards sizes={relatedSizeCards} />
          </section>
        ) : null}
      </section>
    </>
  );
}
