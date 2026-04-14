"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { trackEvent } from "../lib/tracking";

const tabLabels = {
  overall: "Best overall",
  quiet: "Quietest",
  wet: "Best in rain",
  treadlife: "Longest lasting",
  value: "Best value",
  winter: "Winter capable",
};

function RatingBar({ label, value }) {
  return (
    <div className="rating-row">
      <span>{label}</span>
      <div className="rating-track" aria-hidden="true">
        <span style={{ width: `${Math.max(12, Math.min(100, value * 10))}%` }} />
      </div>
      <strong>{value.toFixed(1)}</strong>
    </div>
  );
}

function RecommendationCard({ item, vehicleName, onSave, onInstallerClick }) {
  return (
    <article className="recommendation-card">
      <div className="recommendation-card-top">
        <span className="recommendation-badge">{item.heroBadge}</span>
        <span className="recommendation-fitment">Verified fit for {item.primarySize}</span>
      </div>
      <div>
        <h3>{item.title}</h3>
        <p className="recommendation-outcome">{item.outcomeSummary}</p>
        <p className="recommendation-bestfor">{item.bestFor}</p>
      </div>
      <div className="rating-stack">
        <RatingBar label="Quiet ride" value={item.ratings.quietRide} />
        <RatingBar label="Wet traction" value={item.ratings.wetTraction} />
        <RatingBar label="Tread life" value={item.ratings.treadLife} />
        <RatingBar label="Comfort" value={item.ratings.comfort} />
        <RatingBar label="Value" value={item.ratings.value} />
      </div>
      <div className="installed-total-card">
        <span>Estimated price per tire</span>
        <strong>${item.estimatedPricePerTire}</strong>
        <small>Estimated installed total: ${item.estimatedInstalledTotal}</small>
      </div>
      <div className="recommendation-meta">
        <span>{item.offerCount} offer paths</span>
        <span>{item.installAvailable ? "Installer options available" : "Online price comparison available"}</span>
      </div>
      <div className="hero-actions">
        <Link
          className="search-button"
          href={item.primaryHref}
          onClick={() =>
            trackEvent("recommendation_card_clicked", {
              page_type: "vehicle_fitment",
              vehicle: vehicleName,
              recommendation_type: item.tabKey,
              tire: item.title,
            })
          }
        >
          See pricing
        </Link>
        <button
          className="secondary-button"
          type="button"
          onClick={() => onInstallerClick(item)}
        >
          Check local install cost
        </button>
        <button
          className="ghost-link"
          type="button"
          onClick={() => onSave(item)}
        >
          Save for later
        </button>
      </div>
    </article>
  );
}

export default function RecommendationExperience({ vehicle, recommendations }) {
  const [activeTab, setActiveTab] = useState("overall");
  const [savedItem, setSavedItem] = useState(null);

  const visibleRecommendations = useMemo(() => {
    const preferred = recommendations.filter((item) => item.tabKey === activeTab);
    return preferred.length ? preferred : recommendations.slice(0, 3);
  }, [activeTab, recommendations]);

  const handleTabClick = (tabKey) => {
    setActiveTab(tabKey);
    trackEvent("tab_changed", {
      page_type: "vehicle_fitment",
      vehicle: vehicle.displayName,
      tab: tabKey,
    });
  };

  const handleSave = (item) => {
    setSavedItem(item.title);
    trackEvent("email_capture_open", {
      page_type: "vehicle_fitment",
      vehicle: vehicle.displayName,
      capture_type: "save_compare",
      tire: item.title,
    });
  };

  const handleInstallerClick = (item) => {
    trackEvent("installer_cta_click", {
      page_type: "vehicle_fitment",
      vehicle: vehicle.displayName,
      tire: item.title,
      tire_size: item.primarySize,
    });
    window.location.href = `/installers/quote?vehicle=${encodeURIComponent(vehicle.displayName)}&size=${encodeURIComponent(item.primarySize)}&tire=${encodeURIComponent(item.title)}`;
  };

  return (
    <section className="recommendation-experience">
      <div className="section-heading">
        <span className="eyebrow">Best by need</span>
        <h2>Lead with recommendations, then compare the tradeoffs</h2>
        <p>
          Start with the outcome that matters most, from quiet commuting to wet-road confidence and
          longer tread life.
        </p>
      </div>

      <div className="decision-tab-row" role="tablist" aria-label="Vehicle recommendation tabs">
        {Object.entries(tabLabels).map(([tabKey, label]) => (
          <button
            key={tabKey}
            type="button"
            role="tab"
            aria-selected={activeTab === tabKey}
            className={activeTab === tabKey ? "decision-tab is-active" : "decision-tab"}
            onClick={() => handleTabClick(tabKey)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="recommendation-grid">
        {visibleRecommendations.map((item) => (
          <RecommendationCard
            key={item.id}
            item={item}
            vehicleName={vehicle.displayName}
            onSave={handleSave}
            onInstallerClick={handleInstallerClick}
          />
        ))}
      </div>

      {savedItem ? (
        <div className="save-confirmation">
          Saved {savedItem} as your current fitment comparison pick. Use the email save box below to
          keep these results.
        </div>
      ) : null}
    </section>
  );
}
