export default function TrustLogoStrip({ items }) {
  return (
    <section className="trust-strip">
      {items.map((item) => (
        <span key={item} className="trust-pill">
          {item}
        </span>
      ))}
    </section>
  );
}
