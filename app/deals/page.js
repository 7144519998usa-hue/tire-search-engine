import ProductGrid from "../components/ProductGrid";
import TireCategoryImage from "../components/TireCategoryImage";
import { getProducts } from "../lib/tireData";

export const metadata = {
  title: "Tire Deals | Compare Tire Rack, Mavis & Amazon Options",
  description: "Compare tire deals with product-first cards, commercial truck options, passenger tire sizes, Mavis installed-service choices, and Amazon marketplace links.",
  alternates: { canonical: "/deals" }
};

export default function DealsPage() {
  const passengerProducts = getProducts({ size: "225/65R17", limit: 3 });
  const suvProducts = getProducts({ size: "235/60R18", limit: 3 });
  const truckProducts = getProducts({ size: "275/60R20", intent: "all-terrain", limit: 3 });
  const evProducts = getProducts({ size: "235/45R18", intent: "all-season", limit: 3 });
  const commercialProducts = getProducts({ commercialOnly: true, limit: 4 });
  const sections = [
    ["Passenger Tire Deals", "passenger", "Common commuter sizes and daily-driver replacement paths.", passengerProducts, "/tires/225-65-r17"],
    ["SUV & Crossover Tire Deals", "suv", "Touring, all-season, and all-weather paths for SUV fitments.", suvProducts, "/tires/235-60-r18"],
    ["Pickup & All-Terrain Deals", "allTerrain", "Truck and all-terrain retailer paths for towing, trails, and stance.", truckProducts, "/tires/275-60-r20/all-terrain"],
    ["EV Tire Deals", "ev", "EV-friendly replacement paths with fitment and road-noise warnings.", evProducts, "/ev-tires"],
    ["Commercial Truck Tire Deals", "commercial", "Steer, drive, trailer, and quote paths for fleets and owner-operators.", commercialProducts, "/commercial-truck-tires"]
  ];

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Tire deals</p>
        <h1>Compare tire retailer paths by category.</h1>
        <p>Use these sections to check current retailer price, installation, availability, and fitment without mixing passenger, EV, truck, and commercial tire paths into one confusing grid.</p>
      </div>
      {sections.map(([title, imageType, copy, products, href]) => (
        <section className="deal-segment" key={title}>
          <div className="deal-segment-copy">
            <TireCategoryImage type={imageType} alt={`${title} tire visual`} />
            <div>
              <p className="kicker">Retailer availability</p>
              <h2>{title}</h2>
              <p>{copy} Retailer prices may change; confirm final price, installation, shipping, and fitment on the retailer site.</p>
              <a className="hero-cta" href={href}>Open category</a>
            </div>
          </div>
          <ProductGrid products={products} placement={`deals-${imageType}`} />
        </section>
      ))}
    </section>
  );
}
