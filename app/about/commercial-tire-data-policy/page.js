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
        <article>
          <h2>Fleet and owner-operator context</h2>
          <p>Commercial pages are written for comparison and planning, not final fitment approval. Buying decisions should account for route type, axle weight, casing program, retread policy, downtime risk, and supplier availability.</p>
        </article>
        <article>
          <h2>Supplier confirmation</h2>
          <p>Before ordering, confirm steer, drive, trailer, regional, long-haul, or mixed-service use with a qualified tire supplier. The correct commercial tire depends on more than the printed size alone.</p>
        </article>
      </div>
    </section>
  );
}
