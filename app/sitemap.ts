import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  // Fixed date string keeps the sitemap fully static/prerenderable.
  const lastModified = "2026-10-20";
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/gaster-translator/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/wingdings-alphabet-chart/`, lastModified, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/wingdings-2-translator/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/wingdings-3-translator/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/webdings-translator/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/how-to-write-in-wingdings/`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/about`, lastModified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
