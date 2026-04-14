import { redirect } from "next/navigation";

export default function LegacyTireSizeAlias({ params }) {
  redirect(`/tires/${String(params.size).toLowerCase()}`);
}
