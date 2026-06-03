import { buildAmazonUrl, buildMavisUrl, buildPriorityTireUrl, buildSimpleTireUrl, buildTireRackUrl } from "../lib/tireData";
import { buildGoUrl } from "../lib/redirects";

export default function RetailerSearchFallback({ size = "", intent = "", placement = "empty-results", commercial = false }) {
  const query = [size, intent, "tires"].filter(Boolean).join(" ");
  const retailers = [
    { merchant: "Tire Rack", label: `Search ${size} at Tire Rack`, href: buildTireRackUrl({ query, size }), type: "primary", note: "Retailer tire search" },
    { merchant: "SimpleTire", label: `Search ${size} at SimpleTire`, href: buildSimpleTireUrl({ query, size }), type: "secondary", note: "Online tire retailer" },
    { merchant: "Priority Tire", label: `Search ${size} at Priority Tire`, href: buildPriorityTireUrl({ query, size }), type: "secondary", note: "Value-focused retailer" },
    { merchant: "Mavis", label: `Find installed ${size} options`, href: buildMavisUrl({ query, size }), type: "secondary", note: "Installed tire path" },
    { merchant: "Amazon", label: `Search ${size} on Amazon`, href: buildAmazonUrl({ query }), type: "tertiary", note: "Marketplace fallback" }
  ].filter((item) => item.href);

  return (
    <div className="empty-results">
      <p className="kicker">Retailer search paths</p>
      <h2>Check live retailer availability for this size.</h2>
      <p>We are still verifying exact in-site product matches for this size. Use these retailer paths to confirm current stock, price, installation, and fitment.</p>
      <div className="retailer-fallback-grid">
        {retailers.map((retailer) => (
          <a
            key={retailer.merchant}
            className={`retailer-fallback-card is-${retailer.type}`}
            href={buildGoUrl({ merchant: retailer.merchant, href: retailer.href, placement, tireSize: size })}
            rel="nofollow sponsored noopener"
          >
            <em>Retailer Search</em>
            <strong>{retailer.merchant}</strong>
            <span>{retailer.label}</span>
            <small>{retailer.note}</small>
          </a>
        ))}
      </div>
      {commercial ? <a className="text-link" href="#commercial-quote">Request a commercial tire quote</a> : null}
    </div>
  );
}
