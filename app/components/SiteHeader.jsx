import Link from "next/link";
import Logo from "./Logo";
import { featuredSizes, sizeToSlug } from "../lib/siteData";

const navLinks = [
  { href: "/tire-sizes", label: "Tire Sizes" },
  { href: "/guides", label: "Buying Guides" },
  { href: "/vehicles", label: "Shop by Vehicle" },
  { href: "/brands", label: "Top Brands" },
  { href: "/deals/amazon-tires", label: "Amazon Deals" },
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
