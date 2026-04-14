"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { featuredBrandPages } from "../lib/siteData";
import { trackEvent } from "../lib/tracking";

const tabs = [
  { key: "size", label: "By tire size", placeholder: "205/55R16" },
  { key: "vehicle", label: "By vehicle", placeholder: "2024 Toyota Camry" },
  { key: "brand", label: "By brand", placeholder: "Michelin" },
];

export default function HomeSearchTabs() {
  const [activeTab, setActiveTab] = useState("size");
  const [value, setValue] = useState("");
  const router = useRouter();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (activeTab === "size" && value.trim()) {
      trackEvent("search_submit", { page_type: "home", mode: "size", query: value.trim() });
      router.push(`/search?size=${encodeURIComponent(value.trim())}`);
      return;
    }

    if (activeTab === "brand") {
      const brand = featuredBrandPages.find(
        (item) => item.slug === value.trim().toLowerCase() || item.name.toLowerCase() === value.trim().toLowerCase()
      );
      trackEvent("search_submit", { page_type: "home", mode: "brand", query: value.trim() });
      router.push(brand ? `/brands/${brand.slug}` : "/brands");
      return;
    }

    trackEvent("search_submit", { page_type: "home", mode: "vehicle", query: value.trim() });
    router.push("/vehicles");
  };

  return (
    <div className="home-search-shell">
      <div className="home-search-tab-row" role="tablist" aria-label="Homepage search modes">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            type="button"
            role="tab"
            aria-selected={activeTab === tab.key}
            className={activeTab === tab.key ? "home-search-tab is-active" : "home-search-tab"}
            onClick={() => {
              setActiveTab(tab.key);
              setValue("");
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <form className="search-form" onSubmit={handleSubmit}>
        <input
          className="search-input"
          value={value}
          onChange={(event) => setValue(event.target.value)}
          placeholder={`Search ${tabs.find((tab) => tab.key === activeTab)?.placeholder}`}
          aria-label={tabs.find((tab) => tab.key === activeTab)?.label}
        />
        <button className="search-button" type="submit">
          Compare Prices
        </button>
      </form>
      <div className="hero-actions">
        <a className="ghost-link" href="/vehicles">
          Shop by vehicle
        </a>
      </div>
    </div>
  );
}
