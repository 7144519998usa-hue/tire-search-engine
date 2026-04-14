"use client";

import { buildAffiliateLinkAttributes } from "../lib/affiliateLinks";

export default function AffiliateLink({
  href,
  children,
  className = "buy-link",
  merchant = "",
  surface = "affiliate-link",
  placement = "",
  score,
  ariaLabel,
}) {
  if (!href) {
    return null;
  }

  const linkProps = buildAffiliateLinkAttributes({
    href,
    merchant,
    surface,
    placement,
  });

  function handleClick() {
    const payload = {
      path: href,
      merchant,
      surface,
      placement,
      score: score ?? null,
      timestamp: new Date().toISOString(),
    };

    if (typeof navigator !== "undefined" && typeof navigator.sendBeacon === "function") {
      const blob = new Blob([JSON.stringify(payload)], {
        type: "application/json",
      });
      navigator.sendBeacon("/api/affiliate-click", blob);
      return;
    }

    if (typeof fetch === "function") {
      fetch("/api/affiliate-click", {
        method: "POST",
        keepalive: true,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }).catch(() => {});
    }
  }

  return (
    <a
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
      {...linkProps}
    >
      {children}
    </a>
  );
}
