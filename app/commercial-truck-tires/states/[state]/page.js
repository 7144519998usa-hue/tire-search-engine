import { notFound } from "next/navigation";
import CommercialLeadForm from "../../../components/CommercialLeadForm";
import InternalLinkPanel from "../../../components/InternalLinkPanel";
import JsonLd from "../../../components/JsonLd";
import ProductGrid from "../../../components/ProductGrid";
import { commercialStates, getCommercialState } from "../../../lib/commercialMarkets";
import { getInternalLinks } from "../../../lib/internalLinks";
import { breadcrumbSchema, faqSchema, itemListSchema } from "../../../lib/schema";
import { getProducts } from "../../../lib/tireData";

export function generateStaticParams() {
  return commercialStates.map((state) => ({ state: state.slug }));
}

export function generateMetadata({ params }) {
  const state = getCommercialState(params.state);
  if (!state) return {};
  return {
    title: `Commercial Truck Tires ${state.name}: Steer, Drive & Trailer Options`,
    description: `Compare commercial truck tire paths in ${state.name} for steer, drive, trailer, regional haul, long haul, and fleet replacement planning.`,
    alternates: { canonical: `/commercial-truck-tires/states/${params.state}` }
  };
}

export default function CommercialStatePage({ params }) {
  const state = getCommercialState(params.state);
  if (!state) notFound();
  const products = getProducts({ commercialOnly: true, limit: 12 });
  const links = getInternalLinks({ commercial: true });
  const faqs = [
    {
      question: `What commercial truck tire positions matter in ${state.name}?`,
      answer: "Most fleets separate steer, drive, and trailer tires because tread design, casing value, and application requirements differ by axle position."
    },
    {
      question: `Which freight corridors matter for ${state.name} tire planning?`,
      answer: `${state.corridors.join(", ")} are common research corridors for tire planning, roadside replacement, and fleet stocking decisions.`
    },
    {
      question: "Should owner-operators compare retreads and new tires?",
      answer: "Yes, but retread decisions depend on casing condition, axle position, fleet policy, application, and supplier inspection."
    },
    {
      question: "What should fleets confirm before buying?",
      answer: "Confirm tire size, axle position, load range, casing policy, haul type, installation access, current price, and supplier availability."
    }
  ];

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires", href: "/commercial-truck-tires" }, { name: `${state.name} commercial truck tires` }])} />
      <JsonLd data={itemListSchema({ title: `${state.name} commercial truck tire options`, products, path: `/commercial-truck-tires/states/${params.state}` })} />
      <JsonLd data={faqSchema(faqs)} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Commercial tire market</p>
          <h1>Commercial truck tires in {state.name}</h1>
          <p>Compare steer, drive, trailer, regional haul, long haul, and fleet replacement paths for {state.name} operators before contacting a supplier or retailer.</p>
        </div>
        <div className="info-grid">
          <article>
            <h2>Freight hubs</h2>
            <p>{state.hubs.join(", ")} are common commercial tire planning markets in {state.name}.</p>
          </article>
          <article>
            <h2>Corridors</h2>
            <p>{state.corridors.join(", ")} can affect replacement timing, roadside access, and fleet stocking decisions.</p>
          </article>
        </div>
        <div className="intent-cards">
          <a href="/commercial-truck-tires/positions/steer">Steer tires</a>
          <a href="/tires/11r22-5/drive">Drive tires</a>
          <a href="/tires/445-50-r22-5/trailer">Trailer tires</a>
          <a href="/tire-university/retread-vs-new-truck-tires">Retread planning</a>
        </div>
        <ProductGrid products={products} placement={`commercial-state-${params.state}`} />
        <CommercialLeadForm />
        <section className="section compact-section">
          <div className="section-heading compact-heading"><p className="kicker">FAQ</p></div>
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
        <p className="fitment-note">Reviewed by the Tire Search Engine editorial team. Updated June 3, 2026. Sources: commercial tire application data, fleet tire planning guidance, retailer availability paths, and the Tire Search Engine methodology.</p>
      </section>
    </>
  );
}
