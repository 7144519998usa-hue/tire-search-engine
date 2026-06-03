import ProductGrid from "../components/ProductGrid";
import SearchBox from "../components/SearchBox";
import { searchProducts, slugToSize } from "../lib/tireData";

export const metadata = {
  title: "Tire Search",
  description: "Search tire sizes, commercial truck tire positions, brands, and vehicle replacement options.",
  alternates: { canonical: "/search" },
  robots: { index: false, follow: true }
};

export default function SearchPage({ searchParams }) {
  const query = String(searchParams?.q || searchParams?.size || "").trim();
  const products = searchProducts(query);
  const title = query ? `Search results for ${slugToSize(query)}` : "Search tire sizes and truck tire positions";

  return (
    <section className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Fast tire search</p>
        <h1>{title}</h1>
        <p>Use search to find sizes, brands, vehicles, and commercial positions. Exact-size pages help you compare merchant options more directly.</p>
      </div>
      <SearchBox initialValue={query} />
      <ProductGrid products={products} placement="search-results" />
    </section>
  );
}
