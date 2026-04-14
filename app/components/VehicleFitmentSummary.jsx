export default function VehicleFitmentSummary({ vehicle, focusBadges }) {
  const primarySize = vehicle.sizes[0];

  return (
    <section className="fitment-summary-band">
      <div>
        <span className="eyebrow">Fitment resolved</span>
        <h2>{vehicle.displayName}</h2>
        <p>
          OEM size: <strong>{primarySize?.size || "Varies by trim"}</strong>
          {vehicle.sizes.length > 1 ? ` with ${vehicle.sizes.length - 1} tracked alternatives.` : "."}
        </p>
      </div>
      <div className="fitment-pill-row" aria-label="Recommended decision paths">
        {focusBadges.map((badge) => (
          <span key={badge} className="fitment-pill">
            {badge}
          </span>
        ))}
      </div>
    </section>
  );
}
