"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ initialValue = "" }) {
  const [size, setSize] = useState(initialValue);
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!size.trim()) {
      return;
    }

    router.push(`/search?size=${encodeURIComponent(size.trim())}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        className="search-input"
        value={size}
        onChange={(e) => setSize(e.target.value)}
        placeholder="Enter tire size, for example 205/55R16"
        aria-label="Tire size"
      />
      <button className="search-button" type="submit">
        Compare prices
      </button>
    </form>
  );
}
