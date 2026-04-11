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
            Compare popular tire sizes, top brands, and supplier pricing in one
            place so you can find the right tire faster.
          </p>
        </div>

        <div className="footer-column">
          <h3>Popular tire sizes</h3>
          {featuredSizes.map((item) => (
            <Link key={item.size} href={`/tire-size/${sizeToSlug(item.size)}`}>
              {item.size}
            </Link>
          ))}
        </div>

        <div className="footer-column">
          <h3>Explore</h3>
          <Link href="/guides">Buying guides</Link>
          <Link href="/brands">Tire brands</Link>
          <Link href="/tire-sizes">Tire sizes</Link>
          <Link href="/vehicles">Shop by vehicle</Link>
          <Link href="/deals/amazon-tires">Top Amazon tire deals</Link>
          <Link href="/search?size=205/55R16">Compare tire deals</Link>
        </div>

        <div className="footer-column">
          <h3>More guides</h3>
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
      </div>
    </footer>
  );
}
