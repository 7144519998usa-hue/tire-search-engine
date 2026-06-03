"use client";

import { useState } from "react";

export default function SearchBox({ initialValue = "" }) {
  const [value, setValue] = useState(initialValue);

  function submit(event) {
    event.preventDefault();
    const query = value.trim();
    if (!query) return;
    window.location.href = `/search?q=${encodeURIComponent(query)}`;
  }

  return (
    <form className="search-box" onSubmit={submit}>
      <input
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Example: 225/65R17, 11R22.5 drive tires, Michelin, or Tesla Model 3"
        aria-label="Search tires"
      />
      <button type="submit">Compare Tires</button>
    </form>
  );
}
