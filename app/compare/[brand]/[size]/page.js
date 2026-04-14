import { redirect } from "next/navigation";

export default function LegacyCompareAlias({ params }) {
  redirect(`/brands/${params.brand}/${params.size}`);
}
