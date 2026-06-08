import { getFeaturedTireDeals, trackedDealHref } from "../lib/featuredTireDeals";
import ProductImage from "./ProductImage";
import TrackedDealLink from "./TrackedDealLink";

export default function HeroDealStrip() {
  const deals = getFeaturedTireDeals(5);

  if (!deals.length) return null;

  return (
    <div className="hero-deal-strip" aria-label="Today tire deal ads">
      <div className="hero-deal-strip-heading">
        <span>Today&apos;s tire deals</span>
        <a href="/deals">View all deals</a>
      </div>
      <div className="hero-deal-strip-grid">
        {deals.map((deal, index) => (
          <article className="hero-deal-card" key={deal.size}>
            <a className="hero-deal-image-link" href={deal.internalHref} aria-label={`Open ${deal.size} tire page`}>
              <ProductImage product={deal.product} index={index} />
            </a>
            <div className="hero-deal-card-copy">
              <strong>{deal.size}</strong>
              <span>{deal.displayPrice}</span>
              <small>{deal.primaryMerchant} price path</small>
            </div>
            <div className="hero-deal-card-actions">
              <TrackedDealLink
                className="hero-deal-button"
                href={trackedDealHref({
                  deal,
                  merchant: deal.primaryMerchant,
                  href: deal.primaryUrl,
                  placement: `hero-deal-strip-${index + 1}-tire-rack`
                })}
                merchant={deal.primaryMerchant}
                placement={`hero-deal-strip-${index + 1}-tire-rack`}
                tireSize={deal.size}
              >
                Tire Rack
              </TrackedDealLink>
              <TrackedDealLink
                className="hero-deal-button is-secondary"
                href={trackedDealHref({
                  deal,
                  merchant: deal.secondaryMerchant,
                  href: deal.secondaryUrl,
                  placement: `hero-deal-strip-${index + 1}-amazon`
                })}
                merchant={deal.secondaryMerchant}
                placement={`hero-deal-strip-${index + 1}-amazon`}
                tireSize={deal.size}
              >
                Amazon
              </TrackedDealLink>
            </div>
          </article>
        ))}
      </div>
      <p>Ad links. Confirm final price, stock, shipping, installation, and fitment with the retailer.</p>
    </div>
  );
}
