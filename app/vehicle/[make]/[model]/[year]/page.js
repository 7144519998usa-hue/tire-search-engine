export default async function VehiclePage({ params }) {
  const { make, model, year } = params;

  return (
    <main className="vehicle-shell">
      <span className="eyebrow">Vehicle lookup</span>
      <h1>
        {year} {make} {model}
      </h1>
      <p>
        This route is ready for fitment-specific recommendations. The next step
        is mapping this vehicle to supported tire sizes and redirecting into the
        search experience.
      </p>
    </main>
  );
}
