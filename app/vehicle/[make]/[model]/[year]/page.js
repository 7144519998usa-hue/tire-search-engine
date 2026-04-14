import { redirect } from "next/navigation";

export default function LegacyVehicleAlias({ params }) {
  redirect(`/vehicles/${params.make}/${params.model}/${params.year}`);
}
