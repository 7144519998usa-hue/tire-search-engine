import MinimalHomePage from "./components/MinimalHomePage";

export async function generateMetadata() {
  const siteUrl = "https://www.tiresearchengine.com";

  return {
    title: "Tire Search Engine | Compare Tires by Size, Vehicle & Brand",
    description:
      "Search by tire size, vehicle, or brand, then compare approved retailer paths including Mavis installed tire options and Amazon checkout.",
    alternates: { canonical: "/" },
    verification: {
      other: {
        "fo-verify": "e6bb01aa-71c5-496f-b211-b06e574add8e",
      },
    },
    openGraph: {
      title: "Tire Search Engine | Compare Tires by Size, Vehicle & Brand",
      description:
        "Search by tire size, vehicle, or brand, then compare approved retailer paths including Mavis installed tire options and Amazon checkout.",
      url: siteUrl,
    },
  };
}

export default function HomePage() {
  return <MinimalHomePage />;
}
