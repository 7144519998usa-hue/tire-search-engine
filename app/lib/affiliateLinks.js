export const affiliateDisclosureText =
  "TireSearchEngine may earn a commission from some outbound links. You may be sent to an external merchant to complete your purchase, and price or availability can change at checkout.";

export function buildAffiliateLinkAttributes({
  href,
  merchant = "",
  surface = "",
  placement = "",
}) {
  return {
    href,
    target: "_blank",
    rel: "sponsored nofollow noreferrer",
    "data-merchant": merchant,
    "data-page-surface": surface,
    "data-placement": placement,
  };
}
