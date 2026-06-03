import TireCategoryImage from "../components/TireCategoryImage";
import { sizeToSlug, vehicleFitments } from "../lib/tireData";
import { vehicleDisplayName } from "../lib/vehicleNames";

const priorityMakes = ["toyota", "honda", "ford", "chevrolet", "nissan", "hyundai", "kia", "subaru", "jeep", "ram", "gmc", "tesla", "bmw", "mercedes-benz", "lexus", "audi", "volkswagen", "mazda", "dodge", "acura"];
const priorityModels = [
  ["toyota", "camry"],
  ["toyota", "corolla"],
  ["toyota", "rav4"],
  ["toyota", "highlander"],
  ["honda", "civic"],
  ["honda", "accord"],
  ["honda", "cr-v"],
  ["ford", "f-150"],
  ["ford", "explorer"],
  ["chevrolet", "silverado"],
  ["chevrolet", "equinox"],
  ["nissan", "altima"],
  ["nissan", "rogue"],
  ["hyundai", "santa-fe"],
  ["hyundai", "tucson"],
  ["kia", "sportage"],
  ["subaru", "outback"],
  ["jeep", "wrangler"],
  ["ram", "1500"],
  ["tesla", "model-3"],
  ["tesla", "model-y"]
];

function modelFitments(make, model) {
  return vehicleFitments.filter((fitment) => fitment.make === make && fitment.model === model);
}

export const metadata = {
  title: "Find Tires by Vehicle | Tire Size Finder",
  description: "Browse common tire sizes by make, model, and year, then compare exact-size tire pages and retailer checkout paths.",
  alternates: { canonical: "/vehicles" }
};

export default function VehiclesPage() {
  const knownMakes = new Set(vehicleFitments.map((fitment) => fitment.make));

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Vehicle tire directory</p>
        <h1>Find tires by vehicle</h1>
        <p>Browse common tire sizes by make, model, and year. Always confirm your exact size on the driver-side door placard or retailer site before buying.</p>
      </div>

      <form className="vehicle-finder-form" action="/vehicles">
        <label>
          Year
          <select name="year" defaultValue="">
            <option value="">Select year</option>
            {["2026", "2025", "2024", "2023", "2021", "2020", "2018"].map((year) => <option key={year}>{year}</option>)}
          </select>
        </label>
        <label>
          Make
          <select name="make" defaultValue="">
            <option value="">Select make</option>
            {priorityMakes.map((make) => <option key={make} value={make}>{vehicleDisplayName(make)}</option>)}
          </select>
        </label>
        <label>
          Model
          <input name="model" placeholder="Example: RAV4, Civic, F-150" />
        </label>
        <label>
          Trim optional
          <input name="trim" placeholder="Example: XLE, Touring, Lariat" />
        </label>
        <button type="submit">Find tire sizes</button>
      </form>

      <div className="vehicle-make-grid">
        {priorityMakes.map((make) => (
          <a key={make} href={`/vehicles/${make}`} className={knownMakes.has(make) ? "has-fitments" : ""}>
            <TireCategoryImage type={make === "tesla" ? "ev" : make === "ford" || make === "jeep" || make === "ram" ? "allTerrain" : "passenger"} alt={`${vehicleDisplayName(make)} tire finder visual`} />
            <span>{vehicleDisplayName(make)}</span>
            <small>{knownMakes.has(make) ? "Fitment pages available" : "Model coverage expanding"}</small>
          </a>
        ))}
      </div>

      <section className="section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Priority vehicle tire pages</p>
          <a href="/tires">Browse tire sizes</a>
        </div>
        <div className="vehicle-model-grid">
          {priorityModels.map(([make, model]) => {
            const fitments = modelFitments(make, model);
            const primary = fitments[0];
            const sizes = [...new Set(fitments.map((fitment) => fitment.size))];
            return (
              <article className="vehicle-model-card" key={`${make}-${model}`}>
                <span>{vehicleDisplayName(make)}</span>
                <h2>{vehicleDisplayName(make)} {vehicleDisplayName(model)}</h2>
                <p>{sizes.length ? `Common sizes: ${sizes.join(", ")}` : "Common tire sizes vary by year and trim."}</p>
                <div className="mini-link-row">
                  <a href={`/vehicles/${make}/${model}`}>View tire sizes</a>
                  {primary ? <a href={`/tires/${sizeToSlug(primary.size)}`}>Compare {primary.size}</a> : null}
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </section>
  );
}
