export default function FaqSection({ title = "Frequently asked questions", items = [] }) {
  return (
    <section className="faq-section">
      <div className="section-heading">
        <span className="eyebrow">FAQ</span>
        <h2>{title}</h2>
      </div>
      <div className="faq-grid">
        {items.map((item) => (
          <article key={item.question} className="faq-card">
            <h3>{item.question}</h3>
            <p>{item.answer}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
