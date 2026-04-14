import Link from "next/link";
import { notFound } from "next/navigation";
import AmazonOfferRail from "../../components/AmazonOfferRail";
import Breadcrumbs from "../../components/Breadcrumbs";
import JsonLd from "../../components/JsonLd";
import PriceTable from "../../components/PriceTable";
import { getAmazonOffersForSize } from "../../lib/amazonOfferCatalog";
import { buildBreadcrumbSchema } from "../../lib/breadcrumbs";
import { getSearchResults } from "../../lib/queries";
import { buildVisibleTireItemListSchema } from "../../lib/structuredData";
import {
  getFeaturedSizeBySlug,
  homeFaqs,
  siteUrl,
  slugToSize,
  sizeToSlug,
} from "../../lib/siteData";
import { getTireCategoryBySlug, isTireCategorySlug, tireCategories } from "../../lib/tireCategories";

export const dynamicParams = true;

export async function generateMetadata({ params }) {
  if (isTireCategorySlug(params.slug)) {
    const category = getTireCategoryBySlug(params.slug);

    return {
      title: `${category.title}`,
      description: category.description,
      alternates: {
        canonical: `/tires/${category.slug}`,
      },
      openGraph: {
        title: `${category.title} | TireSearchEngine`,
        description: category.description,
        url: `${siteUrl}/tires/${category.slug}`,
      },
    };
  }

  const size = slugToSize(params.slug);

  return {
    title: `${size} Tires`,
    description: `Compare ${size} tires across brands, best available offers, and high-intent US shopping paths.`,
    alternates: {
      canonical: `/tires/${String(params.slug).toLowerCase()}`,
    },
    openGraph: {
      title: `${size} Tires | TireSearchEngine`,
      description: `Exact-size tire comparison page for ${size}.`,
      url: `${siteUrl}/tires/${String(params.slug).toLowerCase()}`,
    },
  };
}

async function TireSizeCanonicalPage({ slug }) {
  const page = getFeaturedSizeBySlug(slug);

  if (!page) {
    notFound();
  }

  const { rows, brands, suppliers } = await getSearchResults(page.size);
  const amazonOffers = getAmazonOffersForSize(page.size);
  const relatedCategories = tireCategories.filter((category) =>
    category.sizeValues.includes(page.size)
  );
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tires", href: "/tires" },
    { label: page.size },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const itemListSchema = buildVisibleTireItemListSchema({
    title: `${page.size} tires`,
    rows,
  });

  return (
    <>
      <JsonLd data={itemListSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell size-landing">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">Exact tire size</span>
            <h1>{page.size} tires for US drivers comparing brands, prices, and fitment.</h1>
            <p>
              {page.summary} Compare current shopping paths, then move into
              brand, category, and deal pages that match this exact size.
            </p>
            <div className="hero-actions">
              <Link className="search-button" href={`/search?size=${encodeURIComponent(page.size)}`}>
                Compare {page.size} offers
              </Link>
              <Link className="ghost-link" href="/tires">
                Browse tire categories
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">At a glance</span>
            <ul className="bullet-list">
              <li>{brands.length} brands surfaced for this tire size.</li>
              <li>{suppliers.length} offer paths available to compare.</li>
              <li>{relatedCategories.length} major tire categories connect to this size.</li>
            </ul>
          </aside>
        </section>

        <section className="size-results-block">
          <div className="section-heading">
            <span className="eyebrow">Exact-size listings</span>
            <h2>{page.size} tire comparison</h2>
          </div>
          {rows.length === 0 ? (
            <section className="empty-state">
              <h2>No offers are connected yet.</h2>
              <p>Connect more feed data to turn this size page into a full marketplace listing.</p>
            </section>
          ) : (
            <PriceTable rows={rows} />
          )}
        </section>

        <AmazonOfferRail
          title={`Amazon ${page.size} tire offers`}
          intro="Imported Amazon offers for this exact size will render here when they exist in the catalog."
          items={amazonOffers}
        />

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Related tire paths</span>
            <h2>Keep exploring from this size page</h2>
            <p>
              Continue from this exact-size page into related categories,
              buying guides, and helpful next-step research.
            </p>
          </div>
          <div className="category-grid">
            {relatedCategories.map((category) => (
              <Link key={category.slug} href={`/tires/${category.slug}`} className="category-card">
                <h3>{category.title}</h3>
                <p>{category.description}</p>
                <span>Browse category</span>
              </Link>
            ))}
            {homeFaqs.slice(0, 2).map((item) => (
              <article key={item.question} className="category-card">
                <h3>{item.question}</h3>
                <p>{item.answer}</p>
                <span>US tire buying help</span>
              </article>
            ))}
          </div>
        </section>
      </main>
    </>
  );
}

function TireCategoryPage({ slug }) {
  const category = getTireCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Tires", href: "/tires" },
    { label: category.title },
  ];
  const breadcrumbSchema = buildBreadcrumbSchema(breadcrumbItems);
  const collectionSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: category.title,
    description: category.description,
    url: `${siteUrl}/tires/${category.slug}`,
  };

  return (
    <>
      <JsonLd data={collectionSchema} />
      <JsonLd data={breadcrumbSchema} />
      <main className="page-shell guide-shell">
        <Breadcrumbs items={breadcrumbItems} />
        <section className="size-hero">
          <div className="size-hero-copy">
            <span className="eyebrow">US tire category</span>
            <h1>{category.heroTitle}</h1>
            <p>{category.intro}</p>
            <div className="hero-actions">
              <Link className="search-button" href="/tires">
                Browse all tire categories
              </Link>
              <Link className="ghost-link" href="/vehicles">
                Shop by vehicle
              </Link>
            </div>
          </div>
          <aside className="size-hero-panel">
            <span className="panel-kicker">Inside this hub</span>
            <ul className="bullet-list">
              <li>{category.sizes.length} key tire sizes linked for this category.</li>
              <li>{category.brands.length} brands currently connected to this shopping path.</li>
              <li>{category.guides.length} guide pages supporting research and decision-making.</li>
            </ul>
          </aside>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Exact-size paths</span>
            <h2>Popular sizes in {category.title.toLowerCase()}</h2>
          </div>
          <div className="category-grid">
            {category.sizes.map((size) => (
              <Link key={size.size} href={`/tires/${sizeToSlug(size.size)}`} className="category-card">
                <h3>{size.size} tires</h3>
                <p>{size.summary}</p>
                <span>View exact-size page</span>
              </Link>
            ))}
            {category.sizes.map((size) => (
              <Link
                key={`${category.slug}-${size.size}`}
                href={`/tires/${category.slug}/${sizeToSlug(size.size)}`}
                className="category-card"
              >
                <h3>{category.shortLabel} {size.size} tires</h3>
                <p>
                  Category-plus-size landing page for shoppers narrowing down
                  from broad category intent into exact fitment.
                </p>
                <span>View intersection page</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="category-section">
          <div className="section-heading">
            <span className="eyebrow">Brands and guides</span>
            <h2>Continue your {category.title.toLowerCase()} research</h2>
          </div>
          <div className="category-grid">
            {category.brands.map((brand) => (
              <Link key={brand.slug} href={`/brands/${brand.slug}`} className="category-card">
                <h3>{brand.name} tires</h3>
                <p>{brand.description}</p>
                <span>View brand guide</span>
              </Link>
            ))}
            {category.guides.map((guide) => (
              <Link key={guide.slug} href={`/guides/${guide.slug}`} className="category-card">
                <h3>{guide.title}</h3>
                <p>{guide.intro}</p>
                <span>Read guide</span>
              </Link>
            ))}
            <Link href="/deals/amazon-tires" className="category-card">
              <h3>Top Amazon tire deals</h3>
              <p>
                Offer hub for shoppers moving from broad category research
                into stronger checkout paths.
              </p>
              <span>View Amazon deals</span>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export default async function TiresSlugPage({ params }) {
  if (isTireCategorySlug(params.slug)) {
    return TireCategoryPage({ slug: params.slug });
  }

  return TireSizeCanonicalPage({ slug: params.slug });
}
