import { getTireRackSpecialOffers } from "../lib/tireRackSpecialOffers";
import TrackedDealLink from "./TrackedDealLink";

export default function TireRackSpecialOffers({ limit = 18 }) {
  const offers = getTireRackSpecialOffers(limit);

  if (!offers.length) return null;

  return (
    <section className="tire-rack-specials" aria-label="Tire Rack special offers">
      <div className="tire-rack-specials-heading">
        <div>
          <p className="kicker">Tire Rack specials</p>
          <h2>Current rebates, instant savings, and special offers.</h2>
          <p>Browse current Tire Rack promotions, then confirm eligibility, dates, stock, fitment, and redemption details on Tire Rack before buying.</p>
        </div>
        <TrackedDealLink
          className="hero-cta is-orange"
          href="/api/click?merchant=tire-rack&placement=tire-rack-specials-view-all&target=https%3A%2F%2Fwww.anrdoezrs.net%2Fclick-101740681-13697786%3Furl%3Dhttps%253A%252F%252Fwww.tirerack.com%252Fspecialoffers%252Fspecialoffers.jsp"
          merchant="Tire Rack"
          placement="tire-rack-specials-view-all"
        >
          View Tire Rack Offers
        </TrackedDealLink>
      </div>
      <div className="tire-rack-specials-slider" role="list" aria-label="Scrollable Tire Rack offer cards">
        {offers.map((offer) => (
          <article className="tire-rack-special-card" key={offer.promoId} role="listitem">
            <a className="tire-rack-special-image" href={offer.href} rel="nofollow sponsored noopener">
              <img src={offer.image} alt={`${offer.brand} ${offer.savings} Tire Rack offer`} loading="lazy" />
            </a>
            <div className="tire-rack-special-copy">
              <div className="tire-rack-special-topline">
                <span>{offer.brand}</span>
                <small>{offer.type}</small>
              </div>
              <h3>{offer.title}</h3>
              <strong>{offer.savings}</strong>
              <p>{offer.expires}</p>
              <TrackedDealLink
                className="tire-rack-special-button"
                href={offer.href}
                merchant="Tire Rack"
                placement={`tire-rack-special-${offer.promoId.toLowerCase()}`}
                tireSize={offer.brand}
              >
                Learn More
              </TrackedDealLink>
            </div>
          </article>
        ))}
      </div>
      <p className="tire-rack-specials-disclaimer">
        Offer details can change. Tire Search Engine may earn a commission from qualifying Tire Rack clicks.
      </p>
    </section>
  );
}
