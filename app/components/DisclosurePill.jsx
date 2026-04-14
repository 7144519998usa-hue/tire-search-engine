import Link from "next/link";
import { getDisclosureCopy } from "../lib/editorial";

export default function DisclosurePill({ type = "affiliate" }) {
  return (
    <div className="disclosure-pill-row">
      <span className="disclosure-pill">{getDisclosureCopy(type)}</span>
      <Link className="disclosure-link" href="/about/advertiser-disclosure">
        Learn more
      </Link>
    </div>
  );
}
