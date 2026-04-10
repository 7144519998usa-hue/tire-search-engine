import Link from "next/link";
import Logo from "./Logo";
import { featuredSizes, sizeToSlug } from "../lib/siteData";

const navLinks = [
  { href: `/tire-size/${sizeToSlug(featuredSizes[0].size)}`, label: "Popular Sizes" },
  { href: "/search?size=225/65R17", label: "Search Demo" },
  { href: "/vehicle/toyota/camry/2024", label: "Vehicle Fitment" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="page-shell header-inner">
        <Logo />
        <nav className="top-nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <Link className="header-cta" href="/search?size=205/55R16">
          Start comparing
        </Link>
      </div>
    </header>
  );
}
