import type { Metadata } from "next";
import Link from "next/link";
import VariantTool from "@/components/VariantTool";
import AnimatedTitle from "@/components/AnimatedTitle";
import SymbolReference from "@/components/SymbolReference";
import PageFaq from "@/components/PageFaq";
import { pageOpenGraph } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WebAppJsonLd from "@/components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Wingdings 2 Translator — Free Online",
  description:
    "Free Wingdings 2 translator and generator: convert English to Wingdings 2 symbols with live conversion and a copy button. No sign-up.",
  alternates: { canonical: "/wingdings-2-translator" },
  openGraph: pageOpenGraph("/wingdings-2-translator"),
};

const FAQS = [
  {
    q: "What is Wingdings 2?",
    a: "Wingdings 2 is a separate Microsoft symbol font that extends the original Wingdings with more hand gestures, stationery icons, circled numbers and decorative marks. It is not a “version 2” of the same alphabet — it has its own character mapping, so text encoded in Wingdings 2 must be decoded with Wingdings 2.",
  },
  {
    q: "How is Wingdings 2 different from Wingdings 1?",
    a: "The two fonts map the same keyboard keys to completely different symbols. A letter that shows one icon in Wingdings 1 shows another in Wingdings 2. Always check which font a message was written in before decoding it — this tool keeps the four mappings strictly separate.",
  },
  {
    q: "Can I decode Wingdings 2 symbols back to English?",
    a: "Yes. Look each symbol up on the Wingdings 2 alphabet chart — every symbol is listed with the key that produces it, so you can read the letters off one by one.",
  },
];

export default function Wingdings2Page() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Wingdings 2 Translator", path: "/wingdings-2-translator/" }]} />
      <WebAppJsonLd name="Wingdings 2 Translator" path="/wingdings-2-translator/" description="Free Wingdings 2 translator and generator: convert English to Wingdings 2 symbols with live conversion and copy button." />
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Wingdings 2 Translator</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="font-title mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl" aria-label="Wingdings 2 Translator">
          <AnimatedTitle text="Wingdings 2 Translator" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Convert English to Wingdings 2 symbols with this free online translator and generator —
          live as you type. Free, no sign-up, runs entirely in your browser.
        </p>
      </div>

      <VariantTool defaultVariant="wingdings2" />

      <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">About Wingdings 2</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Wingdings 2 adds a fresh set of pictograms to the family: pointing hands, office and
          stationery icons, circled and boxed numbers, and ornamental marks. Because its mapping is
          unique, generic &ldquo;Wingdings translators&rdquo; that only implement the original font
          will decode Wingdings 2 text incorrectly. This page uses the dedicated Wingdings 2 table
          for encoding. Compare with the{" "}
          <Link href="/wingdings-3-translator/" className="font-semibold text-indigo-400 hover:underline">
            Wingdings 3 translator
          </Link>
          , the{" "}
          <Link href="/webdings-translator/" className="font-semibold text-indigo-400 hover:underline">
            Webdings translator
          </Link>
          , or the{" "}
          <Link href="/" className="font-semibold text-indigo-400 hover:underline">
            main translator
          </Link>{" "}
          covering all four fonts.
        </p>
      </section>

      <div className="mt-14">
        <SymbolReference defaultFilter="wingdings2" />
      </div>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
    </>
  );
}
