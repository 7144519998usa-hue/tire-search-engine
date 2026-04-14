"use client";

import { useState } from "react";
import { trackEvent } from "../lib/tracking";

export default function NewsletterCaptureSection() {
  const [email, setEmail] = useState("");
  const [preference, setPreference] = useState("deal_alerts");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    trackEvent("email_capture_submit", {
      page_type: "home",
      capture_type: preference,
    });
  };

  return (
    <section className="email-capture-shell">
      <div>
        <span className="eyebrow">Get tire deals and alerts</span>
        <h2>Stay on top of price drops and seasonal buying windows</h2>
        <p>
          Get price alerts, seasonal tire picks, and best-fit buying paths without having to restart your
          research from scratch.
        </p>
      </div>
      <form className="email-capture-form" onSubmit={handleSubmit}>
        <select
          className="filter-select"
          value={preference}
          onChange={(event) => setPreference(event.target.value)}
          onFocus={() => trackEvent("email_capture_open", { page_type: "home" })}
        >
          <option value="deal_alerts">Deal alerts</option>
          <option value="seasonal_guides">Seasonal buying guide</option>
          <option value="vehicle_recommendations">Best picks by vehicle</option>
        </select>
        <input
          className="search-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
        />
        <button className="search-button" type="submit">
          Get updates
        </button>
      </form>
      {submitted ? <p className="save-confirmation">You’re set. Watch for the next TireSearchEngine update.</p> : null}
    </section>
  );
}
