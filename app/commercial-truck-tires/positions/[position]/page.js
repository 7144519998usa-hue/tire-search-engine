import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import CommercialLeadForm from "../../../components/CommercialLeadForm";
import ProductGrid from "../../../components/ProductGrid";
import RetailerSearchFallback from "../../../components/RetailerSearchFallback";
import { breadcrumbSchema, itemListSchema } from "../../../lib/schema";
import { commercialPositions, getRelatedProducts, getStrictProducts } from "../../../lib/tireData";

export function generateStaticParams() {
  return Object.keys(commercialPositions).map((position) => ({ position }));
}

export function generateMetadata({ params }) {
  const page = commercialPositions[params.position];
  if (!page) return {};
  const products = getStrictProducts({ size: page.size, intent: page.intent, commercialOnly: true, position: page.intent, limit: 1 });

  return {
    title: `${page.title} | Compare Prices & Tire Rack Options`,
    description: page.subtitle,
    alternates: { canonical: `/commercial-truck-tires/positions/${params.position}` },
    robots: products.length ? { index: true, follow: true } : { index: false, follow: true }
  };
}

export default function CommercialPositionPage({ params }) {
  const page = commercialPositions[params.position];
  if (!page) notFound();

  const products = getStrictProducts({ size: page.size, intent: page.intent, commercialOnly: true, position: page.intent });
  const relatedProducts = getRelatedProducts({ size: page.size, commercialOnly: true, limit: 6 });
  const path = `/commercial-truck-tires/positions/${params.position}`;

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires", href: "/commercial-truck-tires" }, { name: page.title }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: page.title, products, path })} /> : null}
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Commercial truck tire position</p>
          <h1>{page.title}</h1>
          <p>{page.subtitle}</p>
        </div>
        {products.length ? (
          <ProductGrid products={products} placement={`commercial-${params.position}`} pageContext={{ size: page.size, position: page.intent }} />
        ) : (
          <RetailerSearchFallback size={page.size} intent={page.intent} commercial placement={`commercial-${params.position}-empty`} />
        )}
        <CommercialLeadForm size={page.size} position={page.intent} />
        {relatedProducts.length ? (
          <section className="related-products" aria-label="Other popular truck tire sizes">
            <div className="section-heading compact-heading">
              <p className="kicker">Other popular truck tire sizes</p>
            </div>
            <p className="section-note">Other commercial sizes are shown for comparison only. Confirm exact size and axle position before buying.</p>
            <ProductGrid products={relatedProducts} placement={`commercial-${params.position}-related`} pageContext={{ size: page.size, isRelated: true }} />
          </section>
        ) : null}
      </section>
    </>
  );
}
