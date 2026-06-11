"use client";

import { useState } from "react";

function cleanSegment(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function VehicleFinderForm({ makes = [], years = [] }) {
  const [year, setYear] = useState("");
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [message, setMessage] = useState("");

  function submit(event) {
    event.preventDefault();
    const makeSlug = cleanSegment(make);
    const modelSlug = cleanSegment(model);
    const yearSlug = cleanSegment(year);

    if (!makeSlug) {
      setMessage("Choose a make or use the model links below.");
      return;
    }

    if (!modelSlug) {
      window.location.href = `/vehicles/${makeSlug}`;
      return;
    }

    window.location.href = yearSlug
      ? `/vehicles/${makeSlug}/${modelSlug}/${yearSlug}`
      : `/vehicles/${makeSlug}/${modelSlug}`;
  }

  return (
    <form className="vehicle-finder-form" onSubmit={submit}>
      <label>
        Year
        <select name="year" value={year} onChange={(event) => setYear(event.target.value)}>
          <option value="">Select year</option>
          {years.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      </label>
      <label>
        Make
        <select name="make" value={make} onChange={(event) => setMake(event.target.value)}>
          <option value="">Select make</option>
          {makes.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
        </select>
      </label>
      <label>
        Model
        <input name="model" value={model} onChange={(event) => setModel(event.target.value)} placeholder="Example: RAV4, Civic, F-150" />
      </label>
      <label>
        Trim optional
        <input name="trim" placeholder="Example: XLE, Touring, Lariat" />
      </label>
      <button type="submit">Find tire sizes</button>
      {message ? <small className="fitment-note">{message}</small> : null}
    </form>
  );
}
