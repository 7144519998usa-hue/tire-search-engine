import { redirect } from "next/navigation";

export const dynamicParams = true;

export default function CommercialTruckSizeLegacyPage({ params }) {
  redirect(`/commercial-truck-tires/${params.size}`);
}
