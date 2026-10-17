export interface FaqItem {
  q: string;
  a: string;
}

/** Page-specific FAQ block with FAQPage JSON-LD (for supporting pages). */
export default function PageFaq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section aria-label={heading} className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">{heading}</h2>
      <div className="mt-4 space-y-2">
        {items.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 shadow-sm">
            <summary className="cursor-pointer list-none text-base font-semibold text-zinc-100 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="mr-2 inline-block text-sky-400 transition group-open:rotate-90" aria-hidden="true">▸</span>
              {f.q}
            </summary>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{f.a}</p>
          </details>
        ))}
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </section>
  );
}
