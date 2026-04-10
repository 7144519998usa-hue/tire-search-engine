"use client";

import { useState } from "react";
import SearchBar from "./SearchBar";
import FiltersSidebar from "./FiltersSidebar";
import PriceTable from "./PriceTable";

export default function SearchResultsClient({
  rows,
  size,
  brands,
  suppliers,
}) {
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedSupplier, setSelectedSupplier] = useState("");

  const filteredRows = rows.filter((row) => {
    const brandMatch = !selectedBrand || row.tires?.brand === selectedBrand;

    const supplierMatch =
      !selectedSupplier || row.suppliers?.name === selectedSupplier;

    return brandMatch && supplierMatch;
  });

  const cheapestPrice = filteredRows[0]?.price;

  return (
    <main className="page-shell results-shell">
      <div className="results-page">
        <FiltersSidebar
          brands={brands}
          suppliers={suppliers}
          selectedBrand={selectedBrand}
          setSelectedBrand={setSelectedBrand}
          selectedSupplier={selectedSupplier}
          setSelectedSupplier={setSelectedSupplier}
        />

        <section className="results-main">
          <section className="results-header">
            <div>
              <span className="eyebrow">Search results</span>
              <h1>{size || "All tires"}</h1>
              <p>
                Compare prices, brands, and suppliers to find the right tire for
                your vehicle and driving style.
              </p>
            </div>
            <SearchBar initialValue={size} />
          </section>

          <section className="summary-grid">
            <article className="summary-card">
              <span>Matches</span>
              <strong>{filteredRows.length}</strong>
            </article>
            <article className="summary-card">
              <span>Cheapest offer</span>
              <strong>
                {cheapestPrice ? `$${Number(cheapestPrice).toFixed(2)}` : "N/A"}
              </strong>
            </article>
            <article className="summary-card">
              <span>Brands</span>
              <strong>{brands.length}</strong>
            </article>
          </section>

          <section className="results-copy-grid">
            <article className="content-card">
              <h2>How to choose</h2>
              <p>
                Start with the lowest price, then compare brand reputation,
                traction, tread life, warranty, and the type of driving you do
                most often.
              </p>
            </article>
            <article className="content-card">
              <h2>Ready to buy</h2>
              <p>
                When you find the tire you want, use the buy link to go directly
                to the supplier and complete your purchase.
              </p>
            </article>
          </section>

          {filteredRows.length === 0 ? (
            <section className="empty-state">
              <h2>No matching tires found.</h2>
              <p>
                Try a different tire size or clear your filters to broaden the
                results.
              </p>
            </section>
          ) : (
            <PriceTable rows={filteredRows} />
          )}
        </section>
      </div>
    </main>
  );
}
