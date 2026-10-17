import { SITE_URL } from "@/lib/site";

export interface Crumb {
  name: string;
  /** Site-relative path, e.g. "/gaster-translator/" */
  path: string;
}

/**
 * BreadcrumbList JSON-LD (invisible SEO setting).
 * Reinforces the hub → cluster hierarchy: Home → this page.
 * Add to every subpage; the homepage itself needs no breadcrumb.
 */
export default function BreadcrumbJsonLd({ trail }: { trail: Crumb[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: `${SITE_URL}${c.path}`,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
