import Link from "next/link";

export default function Breadcrumbs({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <span key={`${item.href || item.label}-${index}`} className="breadcrumb-item">
            {isLast ? (
              <span aria-current="page">{item.label}</span>
            ) : (
              <Link href={item.href}>{item.label}</Link>
            )}
            {!isLast ? <span className="breadcrumb-separator">/</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
