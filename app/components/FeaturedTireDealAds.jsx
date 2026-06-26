import { getFeaturedTireDeals, getFeaturedTireDealsForSize, trackedDealHref } from "../lib/featuredTireDeals";
import ProductImage from "./ProductImage";
import TrackedDealLink from "./TrackedDealLink";

export default function FeaturedTireDealAds({
  size = "",
  limit = 5,
  title = "Hot tire deal watch",
  summary = "Fast price-check links for high-demand replacement sizes. Confirm final price, stock, installation, and fitment on the retailer page.",
  placementPrefix = "featured-tire-deal"
}) {
  const deals = size ? getFeaturedTireDealsForSize(size) : getFeaturedTireDeals(limit);

  if (!deals.length) return null;

  return (
    <section className="featured-tire-deals" aria-label="Featured tire deal ads">
      <div className="section-heading compact-heading">
        <div>
          <p className="kicker">Deal watch</p>
          <h2>{title}</h2>
          <p>{summary}</p>
        </div>
      </div>
      <div className="featured-tire-deal-grid">
        {deals.map((deal, index) => {
          const primaryHref = trackedDealHref({
            deal,
            merchant: deal.primaryMerchant,
            href: deal.primaryUrl,
            placement: `${placementPrefix}-${index + 1}-card`
          });

          return (
          <article className="featured-tire-deal-card" key={deal.size}>
            <a
              className="card-click-target"
              href={primaryHref}
              aria-label={`${deal.primaryCta} for ${deal.size}`}
              rel="nofollow sponsored noopener"
            />
            <a className="featured-tire-deal-media" href={primaryHref} aria-label={`Check ${deal.size} tire deal`} rel="nofollow sponsored noopener">
              <ProductImage product={deal.product} index={index} />
            </a>
            <div className="featured-tire-deal-top">
              <strong>{deal.size}</strong>
              <span>{deal.badge}</span>
            </div>
            <h3>{deal.headline}</h3>
            <p>{deal.context}</p>
            <strong className="featured-tire-deal-price">{deal.displayPrice}</strong>
            <div className="featured-tire-deal-signal">{deal.dealSignal}</div>
            <p className="featured-tire-deal-note">{deal.sourceNote}</p>
            <div className="featured-tire-deal-actions">
              <TrackedDealLink
                className="featured-tire-deal-primary"
                href={trackedDealHref({
                  deal,
                  merchant: deal.primaryMerchant,
                  href: deal.primaryUrl,
                  placement: `${placementPrefix}-${index + 1}-tire-rack`
                })}
                merchant={deal.primaryMerchant}
                placement={`${placementPrefix}-${index + 1}-tire-rack`}
                tireSize={deal.size}
              >
                {deal.primaryCta}
              </TrackedDealLink>
              <TrackedDealLink
                className="featured-tire-deal-secondary"
                href={trackedDealHref({
                  deal,
                  merchant: deal.secondaryMerchant,
                  href: deal.secondaryUrl,
                  placement: `${placementPrefix}-${index + 1}-amazon`
                })}
                merchant={deal.secondaryMerchant}
                placement={`${placementPrefix}-${index + 1}-amazon`}
                tireSize={deal.size}
              >
                {deal.secondaryCta}
              </TrackedDealLink>
              <a className="featured-tire-deal-internal" href={deal.internalHref}>
                Open {deal.size} comparison page
              </a>
            </div>
          </article>
        );
        })}
      </div>
      <p className="fitment-note">
        Advertisement disclosure: Tire Search Engine may earn from qualifying purchases through approved retailer links.
        Displayed deal signals are not guaranteed prices.
      </p>
    </section>
  );
}
