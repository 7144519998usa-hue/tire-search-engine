export default function InstalledCostExplainer({ estimate }) {
  return (
    <section className="cost-explainer-card">
      <div className="section-heading">
        <span className="eyebrow">Installed cost estimate</span>
        <h2>See the likely total before you click out</h2>
        <p>
          Tire pricing alone can hide the real checkout cost. This estimate gives shoppers a clearer
          pre-click picture of tire, install, balancing, and shop fees.
        </p>
      </div>
      <div className="cost-breakdown-grid">
        <article className="content-card">
          <span className="panel-kicker">Tire cost</span>
          <strong>${estimate.tireCost}</strong>
          <p>Estimated set price based on the best-fit recommendations shown on this page.</p>
        </article>
        <article className="content-card">
          <span className="panel-kicker">Install + balance</span>
          <strong>${estimate.installAndBalance}</strong>
          <p>Typical mount, balance, and shop labor range before location-specific taxes and fees.</p>
        </article>
        <article className="content-card">
          <span className="panel-kicker">Fees</span>
          <strong>${estimate.fees}</strong>
          <p>Disposal and shop fees vary by location, so treat this as an estimate until ZIP is confirmed.</p>
        </article>
        <article className="content-card">
          <span className="panel-kicker">Estimated installed total</span>
          <strong>${estimate.total}</strong>
          <p>Use ZIP-based installer quotes for a tighter local total before you commit.</p>
        </article>
      </div>
    </section>
  );
}
