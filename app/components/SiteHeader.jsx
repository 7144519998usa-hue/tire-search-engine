import Link from "next/link";
import Logo from "./Logo";

const utilityLinks = [
  { href: "/about/advertiser-disclosure", label: "Advertiser disclosure" },
  { href: "/about/editorial-policy", label: "Editorial policy" },
  { href: "/about/how-we-make-money", label: "How we make money" },
];

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/tires", label: "Tires" },
  { href: "/ev-tires", label: "EV Tires" },
  { href: "/brands", label: "Brands" },
  { href: "/models", label: "Models" },
  { href: "/vehicles", label: "Vehicles" },
  { href: "/truck-tires", label: "Truck & Commercial" },
  { href: "/tire-university", label: "Tire University" },
  { href: "/compare", label: "Compare" },
];

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="utility-bar">
        <div className="page-shell utility-bar-inner">
          {utilityLinks.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
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
