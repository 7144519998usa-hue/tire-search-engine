import AffiliateLink from "./AffiliateLink";
import AmazonDisclosure from "./AmazonDisclosure";
import { hasAmazonOffers, normalizeAmazonOffer } from "../lib/amazonAffiliate";
import { buildProtectedRedirectHref } from "../lib/outboundRedirect";

export default function AmazonOfferRail({
  title = "Amazon tire picks",
  intro = "Amazon-ready affiliate placements can live here once your approved Special Links and product data are connected.",
  items = [],
  limit,
}) {
  const offers = items.map(normalizeAmazonOffer).filter(Boolean).slice(0, limit || items.length);

  if (!hasAmazonOffers(offers)) {
    return null;
  }

  return (
    <section className="amazon-rail">
      <div className="section-heading">
        <span className="eyebrow">Amazon picks</span>
        <h2>{title}</h2>
        <p>{intro}</p>
      </div>
      <div className="amazon-grid">
        {offers.map((offer, index) => (
          <article key={`${offer.asin}-${offer.title}`} className="amazon-card">
            <div className="amazon-card-top">
              <span className="deal-badge">{offer.badge}</span>
              {index === 0 ? <span className="amazon-rank">Top pick</span> : null}
            </div>
            <h3>{offer.title}</h3>
            <p>{offer.description}</p>
            <AffiliateLink
              href={buildProtectedRedirectHref({
                destination: offer.specialLink,
                merchant: offer.merchant || "Amazon",
                surface: "amazon-offer-rail",
                placement: index === 0 ? "featured-amazon-offer" : "amazon-offer",
                score: offer.score || "",
              })}
              merchant={offer.merchant || "Amazon"}
              surface="amazon-offer-rail"
              placement={index === 0 ? "featured-amazon-offer" : "amazon-offer"}
              score={offer.score || ""}
              ariaLabel={`Check offer for ${offer.title}`}
            >
              Check Best Offer
            </AffiliateLink>
          </article>
        ))}
      </div>
      <AmazonDisclosure />
    </section>
  );
}
