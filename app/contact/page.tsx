import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${SITE_NAME} — report a mapping issue or suggest a feature.`,
};

export default function ContactPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Contact", path: "/contact/" }]} />
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">Contact</h1>
      <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
        <p>
          Found a symbol mapping that looks wrong, or want to suggest a feature? We&apos;d like to
          hear about it — especially mapping corrections, which we verify against documented code
          charts before changing.
        </p>
        <p>
          Email us at{" "}
          <a className="font-semibold text-indigo-400 underline" href={`mailto:${CONTACT_EMAIL}`}>
            {CONTACT_EMAIL}
          </a>
        </p>
        <h2 className="pt-2 text-xl font-bold text-zinc-100">What to include</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>The font variant (Wingdings 1, 2, 3 or Webdings).</li>
          <li>The exact text or symbol involved.</li>
          <li>What you expected vs. what you got — screenshots help.</li>
        </ul>
        <p className="text-sm text-zinc-500">{SITE_NAME} is a free tool; we read every message but can&apos;t promise a reply timeline.</p>
      </div>
    </div>
    </>
  );
}
