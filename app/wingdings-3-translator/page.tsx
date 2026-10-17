import type { Metadata } from "next";
import Link from "next/link";
import VariantTool from "@/components/VariantTool";
import SymbolReference from "@/components/SymbolReference";
import PageFaq from "@/components/PageFaq";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Wingdings 3 Translator — Arrows & Directional Symbols Converter",
  description:
    "Free Wingdings 3 translator: convert English to Wingdings 3 arrow and shape symbols with live conversion, copy button and no sign-up.",
  alternates: { canonical: `${SITE_URL}/wingdings-3-translator/` },
};

const FAQS = [
  {
    q: "What is Wingdings 3 used for?",
    a: "Wingdings 3 is the arrow-and-shapes member of the family: triangles, circles, squares and directional arrows pointing every way, plus keyboard-key symbols. Designers use it for diagrams, navigation icons and decorative bullets.",
  },
  {
    q: "Is Wingdings 3 the same as Wingdings 1?",
    a: "No. Wingdings 3 is a separate font with its own mapping — the same key produces a different symbol than in Wingdings 1 or 2. Decoding requires the Wingdings 3 table, which is what this page uses.",
  },
  {
    q: "Can I copy Wingdings 3 arrows into my document?",
    a: "Yes — type or paste your text, then hit “Copy result” and paste the symbols anywhere. They are portable Unicode characters, so they work in chats, docs and design tools without the original font installed.",
  },
];

export default function Wingdings3Page() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-sky-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Wingdings 3 Translator</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="text-gradient-flow mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl">
          Wingdings 3 Translator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Convert English to Wingdings 3 arrows and geometric symbols with this Wingdings 3
          character map and translator. Live conversion, free, no sign-up.
        </p>
      </div>

      <VariantTool defaultVariant="wingdings3" />

      <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">About Wingdings 3</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Where Wingdings 1 is pictograms and Wingdings 2 is stationery and ornaments, Wingdings 3
          is almost entirely directional: arrows in every direction, triangles, circles, squares and
          key-cap style symbols. It is the go-to font in the family for diagrams and navigation
          cues. For the other symbol sets, try the{" "}
          <Link href="/wingdings-2-translator/" className="font-semibold text-sky-400 hover:underline">
            Wingdings 2 translator
          </Link>
          , the{" "}
          <Link href="/webdings-translator/" className="font-semibold text-sky-400 hover:underline">
            Webdings translator
          </Link>
          , or the{" "}
          <Link href="/" className="font-semibold text-sky-400 hover:underline">
            main translator
          </Link>{" "}
          with all four fonts.
        </p>
      </section>

      <div className="mt-14">
        <SymbolReference defaultFilter="wingdings3" />
      </div>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
  );
}
