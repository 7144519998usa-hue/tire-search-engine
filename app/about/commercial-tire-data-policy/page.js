export const metadata = {
  title: "Commercial Tire Data Policy",
  description: "Read how Tire Search Engine handles commercial truck tire sizes, axle positions, fleet use cases, and supplier confirmation notes.",
  alternates: { canonical: "/about/commercial-tire-data-policy" }
};

export default function CommercialTireDataPolicyPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Commercial tire data</p>
        <h1>Commercial Tire Data Policy</h1>
        <p>Commercial tire pages separate steer, drive, trailer, fleet, and size-based research because axle position and application matter.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>Commercial fitment checks</h2>
          <p>Confirm tire size, load range, ply rating, speed rating, casing requirements, axle position, haul type, and retread policy with the supplier or fleet manager.</p>
        </article>
        <article>
          <h2>Why related sizes are separated</h2>
          <p>Related commercial sizes are research paths, not direct replacements. Fleet requirements and legal load limits must be verified before purchase.</p>
        </article>
      </div>
    </section>
  );
}
