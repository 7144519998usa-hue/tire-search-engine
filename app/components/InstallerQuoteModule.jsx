"use client";

import { useMemo, useState } from "react";
import { trackEvent } from "../lib/tracking";

export default function InstallerQuoteModule({ vehicleName, primarySize }) {
  const [zip, setZip] = useState("");
  const [timeline, setTimeline] = useState("this_week");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const installers = useMemo(
    () => [
      { name: "Local Tire & Service", distance: "3.2 mi", price: "$118-$146", availability: "Tomorrow" },
      { name: "Highway Auto Center", distance: "6.8 mi", price: "$124-$154", availability: "This week" },
      { name: "Mobile Tire Crew", distance: "11.4 mi", price: "$140-$172", availability: "Mobile availability" },
    ],
    []
  );

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
    trackEvent("installer_form_submit", {
      page_type: "vehicle_fitment",
      vehicle: vehicleName,
      tire_size: primarySize,
      zip_code: zip,
      desired_timeline: timeline,
    });
  };

  return (
    <section className="installer-module-shell">
      <div className="section-heading">
        <span className="eyebrow">Local installation options</span>
        <h2>Get install quotes without leaving the decision flow</h2>
        <p>
          Check nearby installation pricing for {vehicleName} and {primarySize} before you commit to a
          retailer or tire choice.
        </p>
      </div>

      <div className="installer-module-grid">
        <form className="content-card installer-form" onSubmit={handleSubmit}>
          <span className="panel-kicker">Get install quotes</span>
          <label>
            ZIP code
            <input
              className="search-input"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              onFocus={() =>
                trackEvent("installer_form_start", {
                  page_type: "vehicle_fitment",
                  vehicle: vehicleName,
                  tire_size: primarySize,
                })
              }
              placeholder="Enter ZIP code"
            />
          </label>
          <label>
            Timing
            <select
              className="filter-select"
              value={timeline}
              onChange={(event) => setTimeline(event.target.value)}
            >
              <option value="asap">As soon as possible</option>
              <option value="this_week">This week</option>
              <option value="this_month">This month</option>
            </select>
          </label>
          <label>
            Email for quote follow-up
            <input
              className="search-input"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
            />
          </label>
          <button className="search-button" type="submit">
            Get install quotes
          </button>
          {submitted ? (
            <p className="form-confirmation">
              Quote request captured. You can still compare pricing paths while local installation options
              are reviewed.
            </p>
          ) : null}
        </form>

        <div className="installer-card-stack">
          {installers.map((installer) => (
            <article key={installer.name} className="content-card">
              <span className="panel-kicker">{installer.distance}</span>
              <h3>{installer.name}</h3>
              <p>Estimated install price: {installer.price}</p>
              <p>Next available: {installer.availability}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
