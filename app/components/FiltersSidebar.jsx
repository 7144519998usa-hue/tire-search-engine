"use client";

export default function FiltersSidebar({
  brands = [],
  suppliers = [],
  selectedBrand,
  setSelectedBrand,
  selectedSupplier,
  setSelectedSupplier,
}) {
  return (
    <aside className="filters-card">
      <div className="filters-heading">
        <h2>Refine results</h2>
        <p>Dial in the brands and suppliers you trust most.</p>
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

      <div className="filter-group">
        <label htmlFor="supplier-filter">Supplier</label>
        <select
          id="supplier-filter"
          value={selectedSupplier}
          onChange={(e) => setSelectedSupplier(e.target.value)}
          className="filter-select"
        >
          <option value="">All Suppliers</option>
          {suppliers.map((supplier) => (
            <option key={supplier} value={supplier}>
              {supplier}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        className="secondary-button"
        onClick={() => {
          setSelectedBrand("");
          setSelectedSupplier("");
        }}
      >
        Reset filters
      </button>
    </aside>
  );
}
