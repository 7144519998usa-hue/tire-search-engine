import { getSearchResults, normalizeTireSize } from "../lib/queries";
import SearchResultsClient from "../components/SearchResultsClient";
import { siteUrl } from "../lib/siteData";

export async function generateMetadata({ searchParams }) {
  const size = normalizeTireSize(searchParams?.size ?? "");

  if (!size) {
    return {
      title: "Search Tire Prices by Size",
      description: "Search tire sizes and compare suppliers from one streamlined results page.",
      alternates: {
        canonical: "/search",
      },
    };
  }

  return {
    title: `${size} Tire Search Results`,
    description: `Compare ${size} tire offers across suppliers and find the lowest-click path to checkout.`,
    alternates: {
      canonical: `${siteUrl}/search?size=${encodeURIComponent(size)}`,
    },
  };
}

export default async function SearchPage({ searchParams }) {
  const size = normalizeTireSize(searchParams?.size ?? "");
  const { rows, brands, suppliers } = await getSearchResults(size);

  return (
    <SearchResultsClient
      rows={rows}
      size={size}
      brands={brands}
      suppliers={suppliers}
    />
  );
}
