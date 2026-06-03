import { siteUrl } from "../../lib/site";

export const metadata = {
  title: "How Tire Search Engine Works",
  description: "Learn how Tire Search Engine compares tire options and uses retailer referral links while keeping fitment and purchase decisions with the merchant.",
  alternates: {
    canonical: `${siteUrl}/about/how-we-make-money`
  }
};

export default function HowWeMakeMoneyPage() {
  return (
    <main className="page-shell">
      <section className="hero-panel compact-hero">
        <p className="eyebrow">How it works</p>
        <h1>How Tire Search Engine Works</h1>
        <p className="hero-copy">
          Tire Search Engine organizes tire research by size, vehicle, brand, category, and commercial truck position so shoppers can reach the right retailer faster.
        </p>
      </section>

      <section className="content-card prose-card">
        <h2>How we support the site</h2>
        <p>
          We may earn referral revenue from participating retailers when shoppers click outbound links and make qualifying purchases. This helps support the site while keeping access free for tire shoppers.
        </p>
        <p>
          Our pages are built to help compare options across common tire needs, including passenger tires, EV tires, all-terrain tires, and commercial truck tires for steer, drive, and trailer positions.
        </p>
        <p>
          Product pages, price cards, and retailer buttons are starting points for comparison. The final price, fitment, warranty, delivery, installation, and order details must be verified directly with the retailer.
        </p>
      </section>
    </main>
  );
}
