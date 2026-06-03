export const metadata = {
  title: "Editorial Policy",
  description: "Read the Tire Search Engine editorial policy for tire guides, fitment warnings, retailer links, and product information.",
  alternates: { canonical: "/about/editorial-policy" }
};

export default function EditorialPolicyPage() {
  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Editorial policy</p>
        <h1>Editorial Policy</h1>
        <p>Our pages are built to help readers compare tire size, vehicle fitment, brand, commercial application, and retailer paths without treating related sizes as guaranteed replacements.</p>
      </div>
      <div className="info-grid">
        <article>
          <h2>How pages are written</h2>
          <p>We use practical tire language, fitment warnings, retailer confirmation notes, and internal links to related tire research. We avoid unsupported performance claims and invented guarantees.</p>
        </article>
        <article>
          <h2>How pages are checked</h2>
          <p>Generated pages must have a clear purpose, useful content, internal links, and fitment guidance. Thin or duplicate pages should be excluded from the sitemap or marked noindex.</p>
        </article>
      </div>
    </section>
  );
}
