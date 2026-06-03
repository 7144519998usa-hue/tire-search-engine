export const metadata = {
  title: "How We Rank Tire Offers",
  description: "Learn how Tire Search Engine orders tire retailer paths, exact-size matches, related sizes, and commercial truck tire pages.",
  alternates: { canonical: "/about/how-we-rank-offers" }
};

export default function HowWeRankOffersPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Ranking method</p>
        <h1>How We Rank Tire Offers</h1>
        <p>Exact-size matches come first. Related sizes and fallback retailer searches are separated so shoppers do not confuse research links with confirmed fitment.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>Primary ranking signals</h2>
          <p>We prioritize exact tire size, page intent, commercial axle position, retailer path quality, available product details, and fitment clarity.</p>
        </article>
        <article>
          <h2>Affiliate links</h2>
          <p>Some outbound links are sponsored affiliate links. Affiliate relationships do not replace the need to confirm price, availability, installation, and fitment with the retailer.</p>
        </article>
      </div>
    </section>
  );
}
