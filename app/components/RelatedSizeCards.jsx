export default function RelatedSizeCards({ sizes = [], commercial = false }) {
  if (!sizes.length) return null;

  return (
    <div className="related-size-card-grid">
      {sizes.map((item) => (
        <article className="related-size-card" key={item.href}>
          <span className={commercial ? "related-size-badge is-commercial" : "related-size-badge"}>{item.badge}</span>
          <h3>{item.size}</h3>
          <p>{item.use}</p>
          <small>{item.note}</small>
          <a href={item.href}>View {item.size} tires</a>
        </article>
      ))}
    </div>
  );
}
