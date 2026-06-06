import JsonLd from "../../../components/JsonLd";
import InternalLinkPanel from "../../../components/InternalLinkPanel";
import ProductGrid from "../../../components/ProductGrid";
import RelatedSizeCards from "../../../components/RelatedSizeCards";
import RetailerSearchFallback from "../../../components/RetailerSearchFallback";
import TireCategoryImage from "../../../components/TireCategoryImage";
import { vehicleFaqs } from "../../../lib/faqData";
import { getTireResults } from "../../../lib/getTireResults";
import { getInternalLinks } from "../../../lib/internalLinks";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../../lib/schema";
import { descriptionForVehicleModel, titleForVehicleModel } from "../../../lib/seo";
import { getRelatedSizeCards, sizeToSlug, vehicleFitments, vehicleSlug } from "../../../lib/tireData";
import { vehicleDisplayName } from "../../../lib/vehicleNames";

export function generateStaticParams() {
  const unique = new Map(vehicleFitments.map((fitment) => [`${fitment.make}/${fitment.model}`, { make: fitment.make, model: fitment.model }]));
  return [...unique.values()];
}

export function generateMetadata({ params }) {
  const make = vehicleDisplayName(params.make);
  const model = vehicleDisplayName(params.model);
  return {
    title: titleForVehicleModel(params.make, params.model),
    description: descriptionForVehicleModel(params.make, params.model),
    alternates: { canonical: `/vehicles/${params.make}/${params.model}` }
  };
}

export default function VehicleModelPage({ params }) {
  const fitments = vehicleFitments.filter((fitment) => fitment.make === vehicleSlug(params.make) && fitment.model === vehicleSlug(params.model));
  const primary = fitments[0];
  const { exactProducts: products } = getTireResults({ size: primary?.size || "225/65R17", intent: primary?.intent || "all-season" });
  const commonSizes = [...new Set(fitments.map((fitment) => fitment.size))];
  const relatedSizeCards = primary ? getRelatedSizeCards(primary.size, { type: "passenger", limit: 5 }) : [];
  const links = getInternalLinks({ size: primary?.size || "", make: params.make, model: params.model });
  const faqs = primary ? vehicleFaqs(primary) : [];

  return (
    <>
    <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Vehicles", href: "/vehicles" }, { name: `${vehicleDisplayName(params.make)} ${vehicleDisplayName(params.model)} tires` }])} />
    {products.length ? <JsonLd data={itemListSchema({ title: `${vehicleDisplayName(params.make)} ${vehicleDisplayName(params.model)} tires`, products, path: `/vehicles/${params.make}/${params.model}` })} /> : null}
    <JsonLd data={faqSchema(faqs)} />
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Vehicle tire guide</p>
        <h1>{vehicleDisplayName(params.make)} {vehicleDisplayName(params.model)} Tires</h1>
        <p>Review common tire sizes, year pages, and retailer paths. Trim and wheel packages can change tire size, so confirm the placard or owner documentation before buying.</p>
      </div>
      <div className="visual-callout">
        <TireCategoryImage type={params.make === "tesla" ? "ev" : primary?.intent === "all-terrain" ? "allTerrain" : "passenger"} alt={`${vehicleDisplayName(params.make)} ${vehicleDisplayName(params.model)} tire finder visual`} />
        <div>
          <p className="kicker">Fitment warning</p>
          <h2>Confirm trim and wheel package before ordering.</h2>
          <p>Vehicle pages are a starting point. Tire size can change by trim, wheel diameter, package, and model year.</p>
        </div>
      </div>
      <div className="intent-cards">
        {commonSizes.map((size) => (
          <a key={size} href={`/tires/${sizeToSlug(size)}`}>Common size: {size}</a>
        ))}
        {fitments.map((fitment) => (
          <a key={`${fitment.year}-${fitment.size}`} href={`/vehicles/${fitment.make}/${fitment.model}/${fitment.year}`}>
            {fitment.year} {fitment.size}
          </a>
        ))}
        {primary ? <a href={`/tires/${sizeToSlug(primary.size)}`}>Compare exact {primary.size} tires</a> : null}
      </div>
      <section className="section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Best tire categories for {vehicleDisplayName(params.model)}</p>
        </div>
        <div className="priority-grid">
          <a href={primary ? `/tires/${sizeToSlug(primary.size)}/all-season` : "/tires/225-65-r17/all-season"}>All-season tires</a>
          <a href={primary ? `/tires/${sizeToSlug(primary.size)}/all-weather` : "/tires/225-65-r17/all-weather"}>All-weather tires</a>
          <a href={primary ? `/tires/${sizeToSlug(primary.size)}/budget` : "/tires/225-65-r17/budget"}>Budget tire options</a>
          <a href={primary ? `/tires/${sizeToSlug(primary.size)}/price` : "/tires/225-65-r17/price"}>Compare prices</a>
        </div>
      </section>
      <section className="section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Vehicle encyclopedia</p>
        </div>
        <div className="info-grid">
          <article>
            <h2>OEM and replacement sizes</h2>
            <p>{commonSizes.length ? `${vehicleDisplayName(params.make)} ${vehicleDisplayName(params.model)} pages currently track ${commonSizes.join(", ")} as common tire size paths.` : "Use the driver-side door placard and retailer fitment tool to confirm tire size."}</p>
          </article>
          <article>
            <h2>Recommended tire types</h2>
            <p>Most shoppers compare all-season, all-weather, touring, highway, winter, or all-terrain tires depending on climate, road noise, mileage, and vehicle use.</p>
          </article>
        </div>
      </section>
      {products.length ? <ProductGrid products={products} placement="vehicle-model" pageContext={{ size: primary?.size || "" }} /> : <RetailerSearchFallback size={primary?.size || ""} intent={primary?.intent || ""} placement="vehicle-model-empty" />}
      {relatedSizeCards.length ? (
        <section className="related-products" aria-label="Related tire sizes">
          <div className="section-heading compact-heading"><p className="kicker">Related passenger and light-truck sizes</p></div>
          <p className="section-note">These sizes are shown for browsing only. Always confirm your exact tire size on your vehicle placard or retailer site before buying.</p>
          <RelatedSizeCards sizes={relatedSizeCards} />
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
      <InternalLinkPanel links={links} />
      <p className="fitment-note">Reviewed by the Tire Search Engine editorial team. Updated June 3, 2026. Sources: vehicle placard guidance, retailer fitment tools, tire sidewall specifications, and the Tire Search Engine methodology.</p>
    </section>
    </>
  );
}
