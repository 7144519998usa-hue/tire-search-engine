"use client";

import { track } from "@vercel/analytics";

export default function TrackedDealLink({ href, className, merchant, placement, tireSize, children }) {
  return (
    <a
      className={className}
      href={href}
      rel="nofollow sponsored noopener"
      onClick={() => {
        track("deal_ad_click", {
          merchant: merchant || "unknown",
          placement: placement || "unknown",
          tireSize: tireSize || "unknown"
        });
      }}
    >
      {children}
    </a>
  );
}
