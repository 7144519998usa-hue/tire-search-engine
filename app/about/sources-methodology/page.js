export const metadata = {
  title: "Sources and Methodology",
  description: "Review how Tire Search Engine uses tire size data, retailer paths, vehicle fitment warnings, and commercial tire categories.",
  alternates: { canonical: "/about/sources-methodology" }
};

export default function SourcesMethodologyPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Methodology</p>
        <h1>Sources and Methodology</h1>
        <p>Our pages combine tire size patterns, product catalog entries, retailer paths, vehicle fitment notes, and commercial tire category logic.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>Fitment data</h2>
          <p>Vehicle tire pages are starting points. OEM sizes can vary by trim, wheel package, market, and model year, so readers must confirm fitment before buying.</p>
        </article>
        <article>
          <h2>Retailer data</h2>
          <p>Retailer links may show current inventory, installation options, shipping, price, and promotions. Those details can change and must be checked on the retailer site.</p>
        </article>
      </div>
    </section>
  );
}
