import "./globals.css";
import Script from "next/script";
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
  verification: {
    google: "c5WQH3gVGDcq-XwdSWZA8CiWw5ILvX6d_feqqYslSrA",
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
  const googleAnalyticsId = "G-RVN7E6EE7V";
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${googleAnalyticsId}');
          `}
        </Script>
        <JsonLd data={organizationSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
