import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import JsonLd from "./components/JsonLd";
import { organizationSchema, webSiteSchema } from "./lib/schema";
import { gaMeasurementId, isIndexable, siteName, siteUrl } from "./lib/site";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Tire Search Engine | Compare Tire Prices, Truck Tires & Deals",
    template: "%s | Tire Search Engine"
  },
  description: "Compare commercial truck tires, passenger tires, Tire Rack options, Mavis installed-service choices, and Amazon marketplace listings by size, position, brand, and vehicle.",
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: true },
  alternates: {
    canonical: "/"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a className="brand" href="/" aria-label={siteName}>
            <span className="brand-mark">TSE</span>
            <span className="brand-stack">
              <span className="brand-text">Tire Search Engine</span>
              <span className="brand-line">Find the right tire, faster.</span>
            </span>
          </a>
          <nav className="top-nav" aria-label="Main navigation">
            <a href="/tires">Tires</a>
            <a href="/vehicles">Vehicles</a>
            <a href="/brands">Brands</a>
            <a href="/commercial-truck-tires">Commercial</a>
            <a href="/deals">Deals</a>
            <a href="/tire-university">Tire University</a>
            <a className="nav-sale-link" href="/about/advertiser-disclosure">Affiliate Disclosure</a>
          </nav>
        </header>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <main>{children}</main>
        <footer className="site-footer">
          <p><strong>Find the right tire, faster.</strong> Tire Search Engine helps shoppers compare tire categories, retailer options, and replacement choices before visiting a merchant site.</p>
          <nav className="footer-links" aria-label="Footer navigation">
            <a href="/about/advertiser-disclosure">Affiliate Disclosure</a>
            <a href="/about/how-we-make-money">How TireSearchEngine Works</a>
            <a href="/about/editorial-policy">Editorial Policy</a>
            <a href="/about/how-we-rank-offers">How We Rank Offers</a>
            <a href="/about/sources-methodology">Sources & Methodology</a>
            <a href="/about/vehicle-fitment-disclaimer">Fitment Disclaimer</a>
            <a href="/tire-university">Tire University</a>
            <a href="/tires">Popular Tire Sizes</a>
            <a href="/commercial-truck-tires">Commercial Truck Tires</a>
            <a href="/contact">Contact</a>
          </nav>
          <p>Affiliate disclosure: some outbound links are sponsored affiliate links. Prices, availability, fitment, installation, and shipping must be confirmed on the retailer site before purchase.</p>
        </footer>
        {gaMeasurementId ? (
          <>
            <script async src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`} />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaMeasurementId}');`
              }}
            />
          </>
        ) : null}
        <Analytics />
      </body>
    </html>
  );
}
