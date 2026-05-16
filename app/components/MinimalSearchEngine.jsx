"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { resolveSearchDestination } from "../lib/searchRouting";

const quickSearches = [
  "225/65R17",
  "275/60R20",
  "Toyota Camry",
  "Michelin",
];

export default function MinimalSearchEngine() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const placeholder = "225/65R17, Michelin, or 2024 Toyota Camry";

  const handleSubmit = (event) => {
    event.preventDefault();
    const destination = resolveSearchDestination(query);

    if (!destination) {
      return;
    }

    router.push(destination);
  };

  return (
    <section className="minimal-home-search-engine" aria-labelledby="homepage-search-heading">
      <h1 id="homepage-search-heading" className="minimal-home-logo">
        Tire Search Engine
      </h1>
      <p className="minimal-home-subline">
        Search by tire size, vehicle, or brand. Compare clean tire results and approved retailer paths before you buy.
      </p>
      <form className="minimal-home-search-form" onSubmit={handleSubmit} role="search">
        <label className="sr-only" htmlFor="minimal-home-search-input">
          Search tire size, brand, or vehicle
        </label>
        <input
          id="minimal-home-search-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={placeholder}
          className="minimal-home-search-input"
          autoComplete="off"
          spellCheck="false"
        />
        <button type="submit" className="minimal-home-search-button">
          Find Tires
        </button>
      </form>
      <div className="minimal-home-search-examples" aria-label="Example searches">
        {quickSearches.map((item) => (
          <button
            key={item}
            type="button"
            className="minimal-home-example-chip"
            onClick={() => {
              setQuery(item);
              const destination = resolveSearchDestination(item);
              if (destination) {
                router.push(destination);
              }
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
}
