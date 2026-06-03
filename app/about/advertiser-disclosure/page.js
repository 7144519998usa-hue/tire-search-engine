import { siteUrl } from "../../lib/site";

export const metadata = {
  title: "Affiliate Disclosure",
  description: "Read how Tire Search Engine uses affiliate links, retailer referrals, and sponsored merchant links while helping shoppers compare tire options.",
  alternates: {
    canonical: `${siteUrl}/about/advertiser-disclosure`
  }
};

export default function AdvertiserDisclosurePage() {
  return (
    <main className="page-shell">
      <section className="hero-panel compact-hero">
        <p className="eyebrow">Transparency</p>
        <h1>Affiliate Disclosure</h1>
        <p className="hero-copy">
          Tire Search Engine may earn a commission when you click certain retailer links and complete a purchase on a merchant website.
        </p>
      </section>

      <section className="content-card prose-card">
        <h2>How affiliate links work</h2>
        <p>
          Some links on Tire Search Engine are affiliate or sponsored referral links. If you use one of those links, the retailer may pay us a commission at no extra cost to you.
        </p>
        <p>
          We use retailer links to help shoppers compare tire sizes, categories, brands, and buying options. Prices, availability, shipping, installation, fitment, taxes, and final purchase terms are controlled by the retailer and should be confirmed on the retailer website before buying.
        </p>
        <p>
          Tire Search Engine does not install tires, process retail orders, or guarantee that a listed tire will fit a specific vehicle or commercial application. Always verify fitment, load rating, speed rating, and service requirements with the retailer, installer, fleet manager, or vehicle manufacturer.
        </p>
      </section>
    </main>
  );
}
