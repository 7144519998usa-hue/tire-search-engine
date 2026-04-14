import "./globals.css";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "./components/JsonLd";
import SiteFooter from "./components/SiteFooter";
import SiteHeader from "./components/SiteHeader";
import { publicEnv, validateCriticalServerEnv, getServerEnv } from "./lib/env";
import { siteUrl } from "./lib/siteData";

validateCriticalServerEnv();

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "TireSearchEngine | Compare Tire Prices Faster",
    template: "%s | TireSearchEngine",
  },
  verification: publicEnv.googleVerification
    ? {
        google: publicEnv.googleVerification,
      }
    : undefined,
  description: "Search tire sizes, compare the best available offers, and find the right tire faster.",
  openGraph: {
    title: "TireSearchEngine",
    description: "A tire-focused marketplace built for organic search traffic, offer comparisons, and monetized outbound clicks.",
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
  const googleAnalyticsId = publicEnv.googleAnalyticsId;
  const { enableVercelAnalytics } = getServerEnv();
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "TireSearchEngine",
    url: siteUrl,
    description:
      "A tire-focused marketplace built for scalable SEO, strong offer discovery, affiliate revenue, and future commerce expansion.",
  };

  return (
    <html lang="en">
      <body>
        {googleAnalyticsId ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        ) : null}
        <JsonLd data={organizationSchema} />
        <SiteHeader />
        {children}
        <SiteFooter />
        {enableVercelAnalytics ? <Analytics /> : null}
      </body>
    </html>
  );
}
