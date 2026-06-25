import { getTireRackSpecialOffers } from "../lib/tireRackSpecialOffers";
import TrackedDealLink from "./TrackedDealLink";

export default function HeroTireRackDeals() {
  const offers = getTireRackSpecialOffers(4);

  if (!offers.length) return null;

  return (
    <div className="hero-tire-rack-deals" aria-label="Featured Tire Rack rebates">
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
      <p>Affiliate links. Confirm current offer terms, fitment, and redemption details on Tire Rack.</p>
    </div>
  );
}
