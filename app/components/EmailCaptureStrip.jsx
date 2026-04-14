"use client";

import { useState } from "react";
import { trackEvent } from "../lib/tracking";

export default function EmailCaptureStrip({ vehicleName, primarySize }) {
  const [email, setEmail] = useState("");
  const [captureType, setCaptureType] = useState("price_alert");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    trackEvent("email_capture_submit", {
      page_type: "vehicle_fitment",
      vehicle: vehicleName,
      tire_size: primarySize,
      capture_type: captureType,
    });
  };

  return (
    <section className="email-capture-shell">
      <div>
        <span className="eyebrow">Save your fitment</span>
        <h2>Keep your best-fit tire picks and price alerts handy</h2>
        <p>
          Save this {vehicleName} fitment, send the comparison to yourself, or get price-drop alerts for{" "}
          {primarySize}.
        </p>
      </div>
      <form className="email-capture-form" onSubmit={handleSubmit}>
        <select
          className="filter-select"
          value={captureType}
          onChange={(event) => setCaptureType(event.target.value)}
          onFocus={() =>
            trackEvent("email_capture_open", {
              page_type: "vehicle_fitment",
              vehicle: vehicleName,
              tire_size: primarySize,
            })
          }
        >
          <option value="price_alert">Send price alerts</option>
          <option value="fitment_save">Save my fitment</option>
          <option value="comparison_email">Email this comparison</option>
          <option value="replacement_reminder">Send replacement reminders</option>
        </select>
        <input
          className="search-input"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="Email address"
        />
        <button className="search-button" type="submit">
          Save and continue
        </button>
      </form>
      {submitted ? (
        <p className="save-confirmation">
          Your {captureType.replaceAll("_", " ")} preference was saved for {vehicleName}.
        </p>
      ) : null}
    </section>
  );
}
