import type { Metadata } from "next";
import Link from "next/link";
import CompatibilityGuide from "@/components/CompatibilityGuide";
import AnimatedTitle from "@/components/AnimatedTitle";
import PageFaq from "@/components/PageFaq";
import { SITE_URL } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";

export const metadata: Metadata = {
  title: "How to Write in Wingdings — Word & Mobile",
  description:
    "Learn how to write in Wingdings: type with the font in Word, work around Google Docs, and stop symbols turning into emoji on phones.",
  alternates: { canonical: `${SITE_URL}/how-to-write-in-wingdings/` },
};

const FAQS = [
  {
    q: "How do I type Wingdings in Microsoft Word?",
    a: "Type your text normally, select it, then choose Wingdings (or Wingdings 2 / 3, or Webdings) from the font menu. Every letter instantly becomes its symbol. You can also use Insert → Symbol to pick individual glyphs without changing the font of the whole paragraph.",
  },
  {
    q: "Why doesn't Wingdings work properly in Google Docs?",
    a: "Google Docs does not ship Microsoft's proprietary Wingdings fonts, so applying the “Wingdings” name there won't reproduce the exact glyphs. The reliable workaround is to paste portable Unicode symbols — like the ones this site's translator produces — which render everywhere without the font.",
  },
  {
    q: "Why do my Wingdings symbols turn into emoji on my phone?",
    a: "Portable Unicode symbols and Wingdings font glyphs are different things. Some Unicode characters have emoji presentation, so iOS and Android render them as colorful emoji while desktops show plain dingbats. The characters are identical — only the rendering differs. If pixel-perfect consistency matters, share a screenshot instead of text.",
  },
  {
    q: "Can I use Wingdings on iPhone or Android?",
    a: "Yes, in two ways: paste Unicode symbols from a translator (works in any app, may render as emoji), or install the actual Wingdings font on your device and apply it in an app that lets you change fonts. Most people find the copy-paste route far simpler.",
  },
  {
    q: "How do I decode a Wingdings message someone sent me?",
    a: "Look each symbol up on a Wingdings alphabet chart with the right font selected (usually Wingdings 1) — every symbol is listed with the key that produces it. Try the chart on this site to read messages by hand.",
  },
  {
    q: "Can Google Translate convert English to Wingdings?",
    a: "No — Google Translate doesn't list Wingdings as a language, because Wingdings isn't a language at all. It's a symbol font where each keyboard key maps to a symbol, so there's nothing for a translation engine to translate. To convert text, use a dedicated Wingdings translator: type English, get symbols instantly, and copy them anywhere. Pasting Wingdings symbols into Google Translate will just return them unchanged or misread them.",
  },
];

export default function HowToWritePage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "How to Write in Wingdings", path: "/how-to-write-in-wingdings/" }]} />
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">How to Write in Wingdings</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="font-title mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl" aria-label="How to Write in Wingdings">
          <AnimatedTitle text="How to Write in Wingdings" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          The practical guide to typing Wingdings in Word, Google Docs and on your phone — including
          the honest limitations nobody tells you about.
        </p>
      </div>

      <div className="space-y-10">
        <section aria-label="Three ways to write Wingdings" className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">Three ways to write Wingdings</h2>
          <ol className="mt-4 space-y-4 text-sm leading-relaxed text-zinc-400">
            <li>
              <strong className="text-zinc-100">1. Apply the font (Word, Excel, PowerPoint).</strong>{" "}
              Type normally, select the text, and choose Wingdings from the font menu. This gives the
              exact original glyphs — the most faithful method on Windows and Mac Office apps.
            </li>
            <li>
              <strong className="text-zinc-100">2. Copy-paste Unicode symbols.</strong>{" "}
              Use the{" "}
              <Link href="/" className="font-semibold text-indigo-400 hover:underline">
                Wingdings translator
              </Link>{" "}
              to convert text, then copy the symbols anywhere: Google Docs, chats, bios, social
              media. No font needed — but expect emoji-style rendering on some phones.
            </li>
            <li>
              <strong className="text-zinc-100">3. Pick symbols individually.</strong>{" "}
              Need just one icon? Browse the{" "}
              <Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-400 hover:underline">
                Wingdings alphabet chart
              </Link>{" "}
              and click any symbol to copy it.
            </li>
          </ol>
        </section>

        <CompatibilityGuide />

        <section aria-label="Wingdings vs Webdings note" className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">Match the font before you decode</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            The most common decoding mistake is using the wrong font table. Wingdings 1, Wingdings 2,
            Wingdings 3 and Webdings each map the same keys to different symbols. If a message
            won&apos;t decode sensibly, try the other variants: the{" "}
            <Link href="/wingdings-2-translator/" className="font-semibold text-indigo-400 hover:underline">
              Wingdings 2 translator
            </Link>
            ,{" "}
            <Link href="/wingdings-3-translator/" className="font-semibold text-indigo-400 hover:underline">
              Wingdings 3 translator
            </Link>
            {" "}and{" "}
            <Link href="/webdings-translator/" className="font-semibold text-indigo-400 hover:underline">
              Webdings translator
            </Link>{" "}
            each use their own mapping.
          </p>
        </section>

        <PageFaq items={FAQS} />
      </div>
    </div>
    </>
  );
}
