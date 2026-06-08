import { getOutboundClicks } from "../../lib/clickStore";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export const metadata = {
  title: "Deal Clicks",
  robots: { index: false, follow: false }
};

export default async function DealClicksPage() {
  const clicks = await getOutboundClicks(250);
  const totalsBySize = clicks.reduce((accumulator, click) => {
    const key = click.tireSize || "Unknown";
    accumulator[key] = (accumulator[key] || 0) + 1;
    return accumulator;
  }, {});

  return (
    <main className="section page-shell">
      <div className="section-heading">
        <p className="kicker">Internal report</p>
        <h1>Deal ad clicks</h1>
        <p>Recent outbound clicks from deal ads and retailer redirects. This page is marked noindex.</p>
      </div>
      <div className="info-grid">
        {Object.entries(totalsBySize).map(([size, count]) => (
          <article key={size}>
            <h2>{size}</h2>
            <p>{count} clicks</p>
          </article>
        ))}
      </div>
      <section className="section compact-section">
        <div className="section-heading compact-heading">
          <p className="kicker">Recent clicks</p>
        </div>
        <div className="faq-list">
          {clicks.length ? clicks.map((click, index) => (
            <details key={`${click.timestamp}-${index}`} open={index < 10}>
              <summary>{click.tireSize || "Unknown size"} - {click.merchant || "Unknown merchant"} - {click.placement || "unknown placement"}</summary>
              <p>{click.timestamp}</p>
              <p>{click.destination}</p>
              <p>{click.referrer}</p>
            </details>
          )) : <p>No clicks captured yet.</p>}
        </div>
      </section>
    </main>
  );
}
