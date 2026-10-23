import { SITE_URL } from "@/lib/site";

/** WebApplication JSON-LD for tool pages — fills the structured-data gap for a free tool site. */
export default function WebAppJsonLd({
  name,
  path,
  description,
}: {
  name: string;
  path: string;
  description: string;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${SITE_URL}${path === "/" ? "" : path.replace(/\/+$/, "")}`,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any (Web)",
    browserRequirements: "Requires JavaScript",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    isAccessibleForFree: true,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
