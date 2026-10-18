import type { Metadata } from "next";
import Link from "next/link";
import VariantTool from "@/components/VariantTool";
import AnimatedTitle from "@/components/AnimatedTitle";
import SymbolReference from "@/components/SymbolReference";
import PageFaq from "@/components/PageFaq";
import { SITE_URL } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "Webdings Translator — Convert Text to Webdings Symbols",
  description:
    "Free Webdings translator and generator: turn English into Webdings web-style icons with live conversion, copy button and no sign-up.",
  alternates: { canonical: `${SITE_URL}/webdings-translator/` },
};

const FAQS = [
  {
    q: "What is Webdings?",
    a: "Webdings is Microsoft's web-themed dingbat font (1997): early web icons, buildings, transport, media controls, faces and nature symbols. Like Wingdings, each keyboard key maps to a picture — but with its own unique mapping.",
  },
  {
    q: "What is the difference between Wingdings and Webdings?",
    a: "They are different typefaces with different mappings. A key that produces one icon in Wingdings produces another in Webdings, so the font name is part of the encoding — always decode with the same font the text was written in.",
  },
  {
    q: "Can I decode Webdings symbols to English?",
    a: "Yes. Look each symbol up on the Webdings alphabet chart — every symbol is listed with the key that produces it, so you can read the letters off one by one.",
  },
];

export default function WebdingsPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Webdings Translator", path: "/webdings-translator/" }]} />
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Webdings Translator</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl" aria-label="Webdings Translator">
          <AnimatedTitle text="Webdings Translator" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Convert English to Webdings icons with this free online translator — live as you type.
          Free, no sign-up, runs entirely in your browser.
        </p>
      </div>

      <VariantTool defaultVariant="webdings" />

      <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">About Webdings</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Webdings took the dingbat idea to the early web: spiders, buildings, vehicles, media
          controls and interface glyphs. It shares the one-key-one-picture concept with Wingdings
          but none of the mappings, so treat it as its own code. Also see the{" "}
          <Link href="/wingdings-2-translator/" className="font-semibold text-indigo-400 hover:underline">
            Wingdings 2 translator
          </Link>
          , the{" "}
          <Link href="/wingdings-3-translator/" className="font-semibold text-indigo-400 hover:underline">
            Wingdings 3 translator
          </Link>
          , or the{" "}
          <Link href="/" className="font-semibold text-indigo-400 hover:underline">
            main translator
          </Link>{" "}
          covering all four fonts.
        </p>
      </section>

      <div className="mt-14">
        <SymbolReference defaultFilter="webdings" />
      </div>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
    </>
  );
}
