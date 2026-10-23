import type { Metadata } from "next";
import Link from "next/link";
import SymbolReference from "@/components/SymbolReference";
import AnimatedTitle from "@/components/AnimatedTitle";
import PageFaq from "@/components/PageFaq";
import { pageOpenGraph } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WebAppJsonLd from "@/components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Wingdings Chart: Alphabet & Symbols",
  description:
    "Browse every Wingdings 1, 2, 3 and Webdings symbol in one searchable chart. Click any symbol to copy it, with its keyboard key and Unicode value.",
  alternates: { canonical: "/wingdings-alphabet-chart" },
  openGraph: pageOpenGraph("/wingdings-alphabet-chart"),
};

const FAQS = [
  {
    q: "How do I find a specific Wingdings symbol?",
    a: "Use the search box above the chart — try words like “arrow”, “heart”, “check” or “star”. You can also filter by font variant (Wingdings 1, 2, 3 or Webdings) to narrow the grid, then click any card to copy the symbol.",
  },
  {
    q: "What do the key and Unicode value mean?",
    a: "The “key” is the keyboard character that produces the symbol when the Wingdings font is applied (for example, J gives ☺ in Wingdings 1). The Unicode value (like U+263A) identifies the portable character this tool outputs, so you can look it up anywhere.",
  },
  {
    q: "Why do some symbols look like emoji on my phone?",
    a: "This chart shows portable Unicode characters, not the proprietary font. Some of them have emoji presentation, so phones render them as colorful emoji while desktops show plain dingbats. The characters — and what they decode to — are identical either way.",
  },
  {
    q: "Can I use these symbols in Word or Google Docs?",
    a: "Yes — copy any symbol and paste it into your document. In Word you can also type the key character and apply the Wingdings font for the exact original glyph. Google Docs does not ship Microsoft's Wingdings font, so the Unicode symbol is the safer choice there.",
  },
  {
    q: "What is a Wingding chart?",
    a: "A wingding chart (also written Wingdings chart) is the complete map of every Wingdings symbol to the keyboard key that produces it. The chart above is a full, searchable wingding chart covering Wingdings 1, 2 and 3 plus Webdings — click any card to copy its symbol.",
  },
];

export default function AlphabetChartPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Wingdings Chart", path: "/wingdings-alphabet-chart/" }]} />
      <WebAppJsonLd name="Wingdings Chart" path="/wingdings-alphabet-chart/" description="Searchable Wingdings alphabet chart: every Wingdings 1, 2, 3 and Webdings symbol with keyboard key and Unicode value. Click to copy." />
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Wingdings Chart</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="font-title mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl" aria-label="Wingdings Chart">
          <AnimatedTitle text="Wingdings Chart" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Every Wingdings 1, Wingdings 2, Wingdings 3 and Webdings symbol in one searchable
          Wingdings chart — the complete list of Wingdings symbols with the original font mapping,
          including hard-to-find checkbox &#9744; &#9745; glyphs. <strong>Click any symbol to copy
          it</strong> — no retyping from a static image.
        </p>
      </div>

      <SymbolReference />

      <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">How to use this chart</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Each card shows the symbol, the keyboard key that produces it in the original font, and
          its Unicode code point. Click a card to copy the symbol, then paste it into a chat, bio,
          document or design file. To convert whole sentences instead of single symbols, use the{" "}
          <Link href="/" className="font-semibold text-indigo-400 hover:underline">
            Wingdings translator
          </Link>
          . Fans decoding Undertale&apos;s hidden character may prefer the{" "}
          <Link href="/gaster-translator/" className="font-semibold text-indigo-400 hover:underline">
            Gaster translator
          </Link>
          .
        </p>
      </section>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
    </>
  );
}
