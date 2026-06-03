import JsonLd from "../../../../components/JsonLd";
import InternalLinkPanel from "../../../../components/InternalLinkPanel";
import ProductGrid from "../../../../components/ProductGrid";
import RetailerSearchFallback from "../../../../components/RetailerSearchFallback";
import { vehicleFaqs } from "../../../../lib/faqData";
import { getInternalLinks } from "../../../../lib/internalLinks";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../../../lib/schema";
import { descriptionForVehicleYear, robotsForPage, titleForVehicleYear } from "../../../../lib/seo";
import { getStrictProducts, getVehicleFitment, sizeToSlug, vehicleFitments } from "../../../../lib/tireData";
import { vehicleDisplayName } from "../../../../lib/vehicleNames";

export function generateStaticParams() {
  return vehicleFitments.map((fitment) => ({
    make: fitment.make,
    model: fitment.model,
    year: fitment.year
  }));
}

function resolveFitment(params) {
  return getVehicleFitment(params) || {
    make: params.make,
    model: params.model,
    year: params.year,
    label: `${vehicleDisplayName(params.make)} ${vehicleDisplayName(params.model)} ${params.year}`.trim(),
    size: "225/65R17",
    intent: "all-season",
    focus: "replacement tire options by size, retailer, and value"
  };
}

export function generateMetadata({ params }) {
  const fitment = resolveFitment(params);
  const path = `/vehicles/${params.make}/${params.model}/${params.year}`;
  const products = getStrictProducts({ size: fitment.size, intent: fitment.intent, limit: 1 });

  return {
    title: titleForVehicleYear(fitment),
    description: descriptionForVehicleYear(fitment),
    alternates: { canonical: path },
    robots: robotsForPage({ products })
  };
}

export default function VehicleTirePage({ params }) {
  const fitment = resolveFitment(params);
  const products = getStrictProducts({ size: fitment.size, intent: fitment.intent });
  const path = `/vehicles/${params.make}/${params.model}/${params.year}`;
  const links = getInternalLinks({ size: fitment.size, make: fitment.make, model: fitment.model });
  const faqs = vehicleFaqs(fitment);

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Vehicles" }, { name: `${fitment.label} tires` }])} />
      {products.length ? <JsonLd data={itemListSchema({ title: `${fitment.label} tires`, products, path })} /> : null}
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Vehicle tire comparison</p>
          <h1>{fitment.label} tires</h1>
          <p>{fitment.year} {vehicleDisplayName(fitment.make)} {vehicleDisplayName(fitment.model)} tire size can vary by trim. Confirm your tire size on the driver-side door placard before buying.</p>
        </div>
        <div className="intent-cards">
          <a href={`/tires/${sizeToSlug(fitment.size)}`}>Exact-size page: {fitment.size}</a>
          <a href={`/tires/${sizeToSlug(fitment.size)}/price`}>Compare {fitment.size} prices</a>
          <a href={`/tires/${sizeToSlug(fitment.size)}/all-season`}>All-season {fitment.size} tires</a>
        </div>
        {products.length ? (
          <ProductGrid products={products} placement={`vehicle-${params.make}-${params.model}-${params.year}`} pageContext={{ size: fitment.size, type: "passenger" }} />
        ) : (
          <RetailerSearchFallback size={fitment.size} intent={fitment.intent} placement={`vehicle-${params.make}-${params.model}-${params.year}-empty`} />
        )}
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">Fitment warning</p>
          </div>
          <p className="section-note">Likely OEM tire sizes are starting points only. Trim, wheel package, load rating, and speed rating must be confirmed on the vehicle placard or retailer site.</p>
        </section>
        <section className="section compact-section">
          <div className="section-heading compact-heading">
            <p className="kicker">Vehicle tire notes</p>
          </div>
          <div className="info-grid">
            <article>
              <h2>OEM size path</h2>
              <p>{fitment.size} is the exact-size research path for this page. Use it to compare tire categories and retailer availability before checkout.</p>
            </article>
            <article>
              <h2>Common replacement checks</h2>
              <p>Confirm trim, wheel package, load rating, speed rating, TPMS compatibility, installation availability, and current retailer price.</p>
            </article>
          </div>
        </section>
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
        <InternalLinkPanel links={links} />
        <p className="fitment-note">Reviewed by TireSearchEngine Editorial Team. Updated June 3, 2026. Sources: retailer fitment tools, vehicle placard guidance, tire sidewall specifications, and the TireSearchEngine methodology.</p>
      </section>
    </>
  );
}
