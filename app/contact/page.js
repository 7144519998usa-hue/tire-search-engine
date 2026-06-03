import { siteUrl } from "../lib/site";

export const metadata = {
  title: "Contact",
  description: "Contact Tire Search Engine about tire research pages, commercial tire comparison pages, retailer links, or site feedback.",
  alternates: {
    canonical: `${siteUrl}/contact`
  }
};

export default function ContactPage() {
  return (
    <main className="page-shell">
      <section className="hero-panel compact-hero">
        <p className="eyebrow">Contact</p>
        <h1>Contact Tire Search Engine</h1>
        <p className="hero-copy">
          Send feedback about tire pages, commercial truck tire research, retailer links, or site issues that need attention.
        </p>
      </section>

      <section className="content-card prose-card">
        <h2>Site feedback</h2>
        <p>
          If you notice a tire size, retailer link, product detail, or fitment note that needs review, please include the page URL and the detail you want us to check.
        </p>
        <p>
          For purchases, installation, shipping, returns, warranties, or inventory questions, contact the retailer directly. Tire Search Engine does not process orders or provide installation service.
        </p>
        <p>
          You can also start a new comparison from the <a href="/search">tire search page</a>.
        </p>
      </section>
    </main>
  );
}
