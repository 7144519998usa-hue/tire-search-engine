import { absoluteUrl, siteName } from "./site.js";

export function breadcrumbSchema(items = []) {
  const validItems = items.filter((item) => item?.name);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: validItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.href ? absoluteUrl(item.href) : undefined
    }))
  };
}

export function itemListSchema({ title = "Tire offers", products = [], path = "/" } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: title,
    url: absoluteUrl(path),
    itemListElement: products.map((product, index) => {
      const hasProductSnippetData = Boolean(product.aggregateRating || product.review);
      const item = hasProductSnippetData
        ? {
        "@type": "Product",
        name: `${product.brand} ${product.model} ${product.size}`.trim(),
        brand: { "@type": "Brand", name: product.brand },
        category: product.category,
        description: product.bestFor,
        ...(product.aggregateRating ? { aggregateRating: product.aggregateRating } : {}),
        ...(product.review ? { review: product.review } : {}),
        offers: {
          "@type": "Offer",
          priceCurrency: product.priceCurrency || "USD",
          ...(typeof product.price === "number" ? { price: product.price.toFixed(2) } : {}),
          availability: "https://schema.org/InStock",
          url: product.tireRackUrl || absoluteUrl(path)
        }
      }
        : {
          "@type": "Thing",
          name: `${product.brand} ${product.model} ${product.size}`.trim(),
          description: product.bestFor,
          url: absoluteUrl(path)
        };

      return {
        "@type": "ListItem",
        position: index + 1,
        item
      };
    })
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": absoluteUrl("/#website"),
    name: siteName,
    url: absoluteUrl("/"),
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={search_term_string}`,
      "query-input": "required name=search_term_string"
    }
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": absoluteUrl("/#organization"),
    name: siteName,
    url: absoluteUrl("/"),
    sameAs: []
  };
}

export function faqSchema(items = []) {
  const questions = items.filter((item) => item?.question && item?.answer);
  if (!questions.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer
      }
    }))
  };
}

export function articleSchema({ title = "", description = "", path = "/", dateModified = "2026-06-03" } = {}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    dateModified,
    mainEntityOfPage: absoluteUrl(path),
    publisher: {
      "@type": "Organization",
      name: siteName,
      url: absoluteUrl("/")
    }
  };
}
