import { getTireRackSpecialOffers } from "../lib/tireRackSpecialOffers";
import { getFeaturedTireDeals, trackedDealHref } from "../lib/featuredTireDeals";
import { getMavisSpecialOffers } from "../lib/mavisSpecialOffers";
import ProductImage from "./ProductImage";
import TrackedDealLink from "./TrackedDealLink";

export default function HeroTireRackDeals() {
  const offers = getTireRackSpecialOffers(4);
  const amazonDeals = getFeaturedTireDeals(5);
  const mavisDeals = getMavisSpecialOffers(6);

  if (!offers.length && !amazonDeals.length && !mavisDeals.length) return null;

  return (
    <div className="hero-tire-rack-deals" aria-label="Featured Tire Rack rebates">
      {offers.length ? (
        <>
          <div className="hero-tire-rack-heading">
            <p className="kicker">Tire Rack rebate watch</p>
            <h2>Deals worth checking before you buy.</h2>
            <TrackedDealLink
              className="hero-cta is-orange"
              href="/api/click?merchant=tire-rack&placement=hero-tire-rack-offers-view-all&target=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-101740681-13697786%3Furl%3Dhttps%253A%252F%252Fwww.tirerack.com%252Fspecialoffers%252Fspecialoffers.jsp"
              merchant="Tire Rack"
              placement="hero-tire-rack-offers-view-all"
            >
              View All Offers
            </TrackedDealLink>
          </div>
          <div className="hero-tire-rack-grid">
            {offers.map((offer) => (
              <article className="hero-tire-rack-card" key={offer.promoId}>
                <TrackedDealLink
                  href={offer.href}
                  merchant="Tire Rack"
                  placement={`hero-tire-rack-card-${offer.promoId.toLowerCase()}`}
                  tireSize={offer.brand}
                >
                  <img src={offer.image} alt={`${offer.brand} ${offer.savings} Tire Rack offer`} loading="lazy" />
                </TrackedDealLink>
                <div>
                  <span>{offer.brand}</span>
                  <strong>{offer.savings}</strong>
                  <small>{offer.expires}</small>
                </div>
              </article>
            ))}
          </div>
        </>
      ) : null}

      {amazonDeals.length ? (
        <div className="hero-amazon-deals">
          <div className="hero-amazon-heading">
            <p className="kicker">Amazon tire searches</p>
            <h3>Quick checks for popular sizes.</h3>
          </div>
          <div className="hero-amazon-grid">
            {amazonDeals.map((deal, index) => (
              <article className="hero-amazon-card" key={deal.size}>
                <TrackedDealLink
                  href={trackedDealHref({
                    deal,
                    merchant: deal.secondaryMerchant,
                    href: deal.secondaryUrl,
                    placement: `hero-amazon-marketplace-${index + 1}`
                  })}
                  merchant={deal.secondaryMerchant}
                  placement={`hero-amazon-marketplace-${index + 1}`}
                  tireSize={deal.size}
                >
                  <ProductImage product={deal.product} index={index + 10} />
                  <span>{deal.size}</span>
                  <strong>Search Amazon</strong>
                </TrackedDealLink>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      {mavisDeals.length ? (
        <div className="hero-mavis-deals">
          <div className="hero-mavis-heading">
            <p className="kicker">Mavis installed-tire deals</p>
            <h3>Rebates and local installation paths.</h3>
          </div>
          <div className="hero-mavis-grid">
            {mavisDeals.map((deal) => (
              <article className={`hero-mavis-card is-${deal.tone}`} key={deal.placement}>
                <TrackedDealLink
                  href={deal.href}
                  merchant="Mavis"
                  placement={deal.placement}
                  tireSize={deal.brand}
                >
                  <span>{deal.brand}</span>
                  <strong>{deal.savings}</strong>
                  <small>{deal.detail}</small>
                  <em>{deal.expires}</em>
                </TrackedDealLink>
              </article>
            ))}
          </div>
        </div>
      ) : null}

      <p>Affiliate links. Confirm current offer terms, fitment, stock, shipping, and final price with the retailer.</p>
    </div>
  );
}
