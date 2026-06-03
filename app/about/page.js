export const metadata = {
  title: "About Tire Search Engine",
  description: "Learn how Tire Search Engine organizes tire sizes, vehicle fitment pages, commercial truck tire pages, retailer paths, and tire education content.",
  alternates: { canonical: "/about" }
};

export default function AboutPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">About</p>
        <h1>About Tire Search Engine</h1>
        <p>Tire Search Engine helps shoppers move from a tire size, vehicle, brand, or commercial truck application to useful retailer paths and fitment checks.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>What we organize</h2>
          <p>We organize tire size pages, vehicle tire pages, commercial truck tire pages, tire brand pages, and Tire University guides. The goal is to make the next step clearer before you visit a retailer or installer.</p>
        </article>
        <article>
          <h2>What we do not do</h2>
          <p>We do not guarantee fitment, inventory, pricing, installation, shipping, or availability. Confirm every purchase detail with the retailer, installer, vehicle placard, tire sidewall, or fleet supplier.</p>
        </article>
      </div>
    </section>
  );
}
