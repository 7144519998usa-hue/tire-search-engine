export const metadata = {
  title: "Vehicle Fitment Disclaimer",
  description: "Read the Tire Search Engine vehicle fitment disclaimer for tire size, trim, wheel package, and retailer confirmation.",
  alternates: { canonical: "/about/vehicle-fitment-disclaimer" }
};

export default function VehicleFitmentDisclaimerPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Fitment disclaimer</p>
        <h1>Vehicle Fitment Disclaimer</h1>
        <p>Vehicle pages are starting points. Tire size can vary by trim, wheel diameter, optional package, model year, and market.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>Before buying</h2>
          <p>Confirm the tire size on the driver-side door placard, current tire sidewall, owner documentation, retailer fitment tool, or installer recommendation.</p>
        </article>
        <article>
          <h2>What can change</h2>
          <p>Load rating, speed rating, wheel diameter, tire pressure, run-flat requirements, EV requirements, and commercial service requirements can affect the correct tire choice.</p>
        </article>
        <article>
          <h2>How to use our vehicle pages</h2>
          <p>Use Tire Search Engine vehicle pages to find common size paths and related tire categories. Treat those pages as research tools, then verify the final tire with the retailer, installer, or vehicle placard.</p>
        </article>
        <article>
          <h2>When to ask an installer</h2>
          <p>Ask an installer when the vehicle has aftermarket wheels, plus-size fitment, staggered tire sizes, heavy towing needs, commercial use, or previous tire-size changes.</p>
        </article>
      </div>
    </section>
  );
}
