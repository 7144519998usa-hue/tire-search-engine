import { getSearchResults, normalizeTireSize } from "../lib/queries";
import SearchResultsClient from "../components/SearchResultsClient";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Search Tire Prices by Size",
  description: "Search tire sizes and compare the best available offers from one streamlined results page.",
  robots: {
    index: false,
    follow: true,
  },
  alternates: {
    canonical: "/search",
  },
};

export default async function SearchPage({ searchParams }) {
  const size = normalizeTireSize(searchParams?.size ?? "");
  const { rows, brands } = await getSearchResults(size);

  return (
    <SearchResultsClient
      rows={rows}
      size={size}
      brands={brands}
    />
  );
}
