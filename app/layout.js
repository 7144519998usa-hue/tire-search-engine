import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { siteUrl } from "./lib/siteData";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TireSearchEngine | Compare Tire Prices Faster",
    template: "%s | TireSearchEngine",
  },
  description: "Search tire sizes, compare suppliers, and find the best tire price faster.",
  openGraph: {
    title: "TireSearchEngine",
    description: "A tire-focused affiliate publishing platform built for organic search traffic, supplier comparisons, and monetized outbound clicks.",
    url: siteUrl,
    siteName: "TireSearchEngine",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TireSearchEngine",
    description: "A tire-focused affiliate publishing platform built for organic search traffic and monetized comparisons.",
  },
};

export default function RootLayout({ children }) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TireSearchEngine",
    url: siteUrl,
    description:
      "A tire-focused affiliate publishing platform built for scalable SEO, supplier transparency, affiliate revenue, and future commerce expansion.",
  };

  return (
    <html lang="en">
      <body>
        <JsonLd data={organizationSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
