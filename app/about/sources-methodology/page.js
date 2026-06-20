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
        <article>
          <h2>Product and category signals</h2>
          <p>Product cards are organized by tire size, category, axle position, retailer path, and available catalog details. We separate exact matches from related research paths to reduce fitment confusion.</p>
        </article>
        <article>
          <h2>Product images</h2>
          <p>When a retailer or catalog image is available, product cards use that image first. If a supplier image is unavailable or blocked, we use public tire photos from Wikimedia Commons as fallback visuals and keep local illustrations only as a final backup.</p>
          <p className="fine-print">
            Public fallback photo sources include <a href="https://commons.wikimedia.org/wiki/File:Car_tires.jpg">Car tires</a>, <a href="https://commons.wikimedia.org/wiki/File:Assorted_stacked_automotive_tires.jpg">Assorted stacked automotive tires</a>, and <a href="https://commons.wikimedia.org/wiki/File:Tire_tread.jpg">Tire tread</a>.
          </p>
        </article>
        <article>
          <h2>Editorial review</h2>
          <p>Pages are reviewed for grammar, internal links, indexability, basic structured data, and buyer usefulness. Thin or duplicate pages should be improved before they are treated as priority SEO pages.</p>
        </article>
      </div>
    </section>
  );
}
