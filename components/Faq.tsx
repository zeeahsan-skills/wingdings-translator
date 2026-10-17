import { SITE_NAME } from "@/lib/site";

const FAQS = [
  {
    q: "What is Wingdings?",
    a: "Wingdings is a symbol font Microsoft has shipped with Windows since 1992. Instead of letters, each key shows a small picture — hands, arrows, faces, office icons. Typing a word with the Wingdings font applied turns it into a row of symbols, which is why people use it for puzzles and hidden messages — and why some casually call it the Wingdings language.",
  },
  {
    q: "How do I translate English into Wingdings?",
    a: "Type or paste English text into the translator above and pick a font — Wingdings 1, 2, 3 or Webdings. Each character is converted to its symbol instantly as you type. Hit “Copy result” and paste the symbols anywhere: chats, bios, documents.",
  },
  {
    q: "How do I decode Wingdings back to English?",
    a: "Match each symbol against the Wingdings alphabet chart — every symbol is listed with the key that produces it, so you can read the letters off one by one. This site's chart covers all four fonts, so make sure you're looking at the right font's table.",
  },
  {
    q: "What is the difference between Wingdings 1, 2 and 3?",
    a: "They are three separate fonts, not versions of one alphabet. Wingdings 1 (1990) has the classic pictograms — hands, faces, zodiac, office symbols. Wingdings 2 adds stationery icons, more hand gestures and circled numbers. Wingdings 3 is almost entirely arrows, triangles and keyboard-key symbols. Webdings is a fourth, web-themed pictogram font. Keep them separate when encoding.",
  },
  {
    q: "Why do my Wingdings symbols show up as emoji?",
    a: "This tool outputs portable Unicode characters, not the proprietary font. Some of those characters (like 👍 or 💣) have emoji presentation, so phones render them as colorful emoji while desktops may show plain dingbats. The underlying characters are identical — only the rendering differs by device.",
  },
  {
    q: "What is the Gaster / Undertale connection?",
    a: "In the game Undertale, the hidden character W. D. Gaster “speaks” in Wingdings — his dialogue (notably Lab Entry 17) is encoded with the standard Wingdings 1 mapping. Fans use the Wingdings alphabet chart to read his messages and this translator to write their own. Select Wingdings 1 to match the game's mapping.",
  },
  {
    q: "Is Wingdings a secret code or encryption?",
    a: "No — it's a fixed one-to-one substitution of pictures for letters, not encryption. Anyone with the chart can read it instantly. It's great for fun puzzles and decoration, but never use it for anything that actually needs to stay private.",
  },
  {
    q: "Can I use Wingdings symbols in Roblox?",
    a: "Partly. Roblox chat filters most non-alphanumeric characters into hashtags (#), so pasted Wingdings symbols often won't survive in chat. They generally work better in display names, bios and group descriptions — but Roblox may still strip some symbols. If symbols get filtered, the PNG download button above gives you an image that works anywhere.",
  },
  {
    q: "Is this translator free? Do I need an account?",
    a: `Yes — ${SITE_NAME} is completely free with no account, no usage limits and no sign-up. Conversion runs entirely in your browser, so your text is never uploaded anywhere.`,
  },
];

export default function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" aria-label="Frequently asked questions" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Frequently asked questions</h2>
      <div className="mt-4 space-y-2">
        {FAQS.map((f) => (
          <details key={f.q} className="group rounded-2xl border border-zinc-800 bg-zinc-900 px-5 py-4 shadow-sm">
            <summary className="cursor-pointer list-none text-base font-semibold text-zinc-100 marker:hidden [&::-webkit-details-marker]:hidden">
              <span className="mr-2 inline-block text-indigo-400 transition group-open:rotate-90" aria-hidden="true">▸</span>
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
