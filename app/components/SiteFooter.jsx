import Link from "next/link";
import {
  featuredBrandPages,
  featuredSizes,
  seoGuides,
  sizeToSlug,
} from "../lib/siteData";

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <h2>TireSearchEngine</h2>
          <p>
            Compare popular tire sizes, top brands, and best available offers
            in one place so you can find the right tire faster.
          </p>
        </div>

        <div className="footer-column">
          <h3>Popular tire sizes</h3>
          {featuredSizes.map((item) => (
            <Link key={item.size} href={`/tires/${sizeToSlug(item.size)}`}>
              {item.size}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/tires">Tires</Link>
          <Link href="/ev-tires">EV tires</Link>
          <Link href="/tesla-tires">Tesla tires</Link>
          <Link href="/tires/sizes">Tire sizes</Link>
          <Link href="/brands">Tire brands</Link>
          <Link href="/models">Tire models</Link>
          <Link href="/vehicles">Shop by vehicle</Link>
          <Link href="/truck-tires">Truck & commercial</Link>
          <Link href="/commercial-truck-tires">Commercial truck tires</Link>
          <Link href="/tire-university">Tire University</Link>
          <Link href="/compare">Compare tires</Link>
        </div>

        <div className="footer-column">
          <h3>Research paths</h3>
          <Link href="/guides">Buying guides</Link>
          <Link href="/ev-tires/quiet">Quiet EV tires</Link>
          <Link href="/ev-tires/best-range">Best range EV tires</Link>
          <Link href="/tire-university/legal">State laws and legal</Link>
          <Link href="/tire-university/fleet-resources">Fleet resources</Link>
          <Link href="/truck-tires/long-haul">Long-haul truck tires</Link>
          <Link href="/truck-tires/11r22-5">11R22.5 truck tires</Link>
          <Link href="/tire-university/load-index">Load index</Link>
          <Link href="/tire-university/speed-rating">Speed rating</Link>
          <Link href="/deals/amazon-tires">Top Amazon tire deals</Link>
          {seoGuides.slice(0, 3).map((guide) => (
            <Link key={guide.slug} href={`/guides/${guide.slug}`}>
              {guide.title}
            </Link>
          ))}
          {featuredBrandPages.slice(0, 2).map((brand) => (
            <Link key={brand.slug} href={`/brands/${brand.slug}`}>
              {brand.name} tires
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Trust & policies</h3>
          <Link href="/about/editorial-policy">Editorial policy</Link>
          <Link href="/about/advertiser-disclosure">Advertiser disclosure</Link>
          <Link href="/about/how-we-make-money">How we make money</Link>
        </div>
      </div>
    </footer>
  );
}
