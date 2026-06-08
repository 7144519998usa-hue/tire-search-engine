function LinkGroup({ title, links = [] }) {
  if (!links.length) return null;

  return (
    <article className="internal-link-card">
      <h2>{title}</h2>
      <div className="mini-link-row">
        {links.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
      </div>
    </article>
  );
}

export default function InternalLinkPanel({ links }) {
  if (!links) return null;

  return (
    <section className="internal-link-panel" aria-label="Related tire research links">
      <div className="section-heading compact-heading">
        <p className="kicker">Related tire research</p>
      </div>
      <div className="internal-link-grid">
        <LinkGroup title="Price and buying pages" links={links.moneyPages} />
        <LinkGroup title="Related sizes" links={links.relatedSizes} />
        <LinkGroup title="Vehicle pages" links={links.relatedVehicles} />
        <LinkGroup title="Tire guides" links={links.relatedGuides} />
        <LinkGroup title="Brand and hub pages" links={[...(links.relatedBrands || []), ...(links.hubs || [])].slice(0, 7)} />
      </div>
    </section>
  );
}
