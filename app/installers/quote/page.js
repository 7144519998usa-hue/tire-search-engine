import Link from "next/link";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { siteUrl } from "../../lib/siteData";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Installer Quote Request",
  description:
    "Request local tire installation quotes and compare estimated install pricing before checkout.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/installers/quote",
  },
};

export default function InstallerQuotePage({ searchParams }) {
  const vehicle = searchParams?.vehicle || "your vehicle";
  const size = searchParams?.size || "your tire size";
  const tire = searchParams?.tire || "your selected tire";
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Installer quote" },
  ];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Installer quote request",
          description: "Compare local installation options for your selected tire fitment.",
          url: `${siteUrl}/installers/quote`,
        }}
      />
      <JsonLd data={buildBreadcrumbSchema(breadcrumbItems)} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Installer quote request</span>
            <h1>Compare local installation options before checkout</h1>
            <p>
              We use your fitment to narrow the local install path for {vehicle}, {size}, and {tire}.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href="/search">
                Compare tire pricing
              </Link>
              <Link className="ghost-link" href="/tire-university">
                Read tire guidance
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">What happens next</span>
            <ul className="bullet-list">
              <li>Confirm fitment and preferred timing.</li>
              <li>Compare estimated install pricing from nearby providers.</li>
              <li>Continue to the best-fit tire offer with installation confidence.</li>
            </ul>
          </aside>
        </section>
      </main>
    </>
  );
}
