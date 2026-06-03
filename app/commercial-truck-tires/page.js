import JsonLd from "../components/JsonLd";
import CommercialLeadForm from "../components/CommercialLeadForm";
import ProductGrid from "../components/ProductGrid";
import { breadcrumbSchema, itemListSchema } from "../lib/schema";
import { getProducts } from "../lib/tireData";

export const metadata = {
  title: "Commercial Truck Tires | Compare Steer, Drive & Trailer Options",
  description: "Compare commercial truck tires by position, size, casing value, tread life, and retailer option. Built for steer, drive, trailer, regional, and long-haul searches.",
  alternates: { canonical: "/commercial-truck-tires" }
};

export default function CommercialTruckTiresPage() {
  const products = getProducts({ commercialOnly: true, limit: 24 });

  return (
    <>
      <JsonLd data={breadcrumbSchema([{ name: "Home", href: "/" }, { name: "Commercial Truck Tires" }])} />
      <JsonLd data={itemListSchema({ title: "Commercial truck tire options", products, path: "/commercial-truck-tires" })} />
      <section className="section page-shell">
        <div className="section-heading">
          <p className="kicker">Fleet and owner-operator tire comparison</p>
          <h1>Commercial truck tires for steer, drive, and trailer positions.</h1>
          <p>Compare tire-focused retailer links, installed-service options, and marketplace listings with the products visible up front.</p>
        </div>
        <div className="intent-cards">
          <a href="/commercial-truck-tires/positions/steer">Steer tires</a>
          <a href="/tires/295-75-r22-5/drive">Drive tires</a>
          <a href="/tires/445-50-r22-5/trailer">Trailer tires</a>
        </div>
        <ProductGrid products={products} placement="commercial-hub" />
        <CommercialLeadForm />
      </section>
    </>
  );
}
