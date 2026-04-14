export default function TrustStatsBar({ items = [] }) {
  return (
    <div className="trust-stats-bar">
      {items.map((item) => (
        <div key={`${item.label}-${item.value}`} className="trust-stat-chip">
          <span>{item.label}</span>
          <strong>{item.value}</strong>
        </div>
      ))}
    </div>
  );
}
