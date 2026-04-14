"use client";

export default function FiltersSidebar({
  brands = [],
  selectedBrand,
  setSelectedBrand,
}) {
  return (
    <aside className="filters-card">
      <div className="filters-heading">
        <h2>Refine results</h2>
        <p>Dial in the brands and tire options that fit your buying priorities.</p>
      </div>

      <div className="filter-group">
        <label htmlFor="brand-filter">Brand</label>
        <select
          id="brand-filter"
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="filter-select"
        >
          <option value="">All Brands</option>
          {brands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={() => {
          setSelectedBrand("");
        }}
      >
        Reset filters
      </button>
    </aside>
  );
}
