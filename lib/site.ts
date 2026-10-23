/**
 * Central site configuration.
 *
 * IMPORTANT (Ahsan): before deploying, replace SITE_URL with the real
 * production domain and CONTACT_EMAIL with a real inbox. The placeholders
 * below are intentional and must not ship to production.
 */

// TODO(Ahsan): replace with the real domain before deploy, e.g. "https://www.mywingdings.com"
export const SITE_URL = "https://wingdings-translator-local-6536.vercel.app";

// Contact inbox (Ahsan's Gmail, set 2026-10-20)
export const CONTACT_EMAIL = "malikahsan.media@gmail.com";

export const SITE_NAME = "Wingdings Translator";
export const SITE_TAGLINE = "Convert English to Wingdings symbols instantly — free online Wingdings translator, generator and symbol chart. No sign-up.";
export const SITE_LOCALE = "en_US";
export const SITE_AUTHOR = SITE_NAME;

export const OG_IMAGE_PATH = "/og-image.jpg";

/**
 * Complete Open Graph block for a subpage. Next.js overwrites nested metadata
 * (openGraph) wholesale per segment, so a page that needs its own og:url must
 * supply the full block — this keeps og:title/description/images identical to
 * the layout defaults and varies only the URL.
 */
export function pageOpenGraph(url: string) {
  return {
    type: "website" as const,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — English to Wingdings Converter`,
    description: SITE_TAGLINE,
    url,
    images: [{ url: OG_IMAGE_PATH, width: 1200, height: 630, alt: SITE_NAME }],
  };
}
