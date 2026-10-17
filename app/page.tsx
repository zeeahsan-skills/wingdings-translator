import type { Metadata } from "next";
import Link from "next/link";
import TranslatorSection from "@/components/TranslatorSection";
import FontCompare from "@/components/FontCompare";
import BatchConverter from "@/components/BatchConverter";
import PracticeMode from "@/components/PracticeMode";
import SymbolReference from "@/components/SymbolReference";
import CompatibilityGuide from "@/components/CompatibilityGuide";
import Faq from "@/components/Faq";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Convert English to Wingdings Symbols & Back`,
  description: SITE_TAGLINE,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* Hero */}
      <div className="py-10 text-center sm:py-14">
        <h1
          className="mx-auto mt-3 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
          aria-label="Wingdings Translator"
        >
          {"Wingdings Translator".split(" ").map((word, wi) => (
            <span key={wi} className="inline-block whitespace-nowrap">
              {word.split("").map((ch, i) => {
                const idx = wi === 0 ? i : "Wingdings".length + 1 + i;
                return (
                  <span
                    key={i}
                    aria-hidden="true"
                    className="animate-letter-jerk text-gradient-flow-letter"
                    style={
                      {
                        animationDelay: `${1.5 + idx * 0.05}s`,
                        "--i": idx,
                      } as React.CSSProperties
                    }
                  >
                    {ch}
                  </span>
                );
              })}
              {wi === 0 && " "}
            </span>
          ))}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          This free online Wingdings translator and generator converts English into Wingdings
          symbols live as you type — get an instant Wingdings translation across{" "}
          <strong>Wingdings 1, Wingdings 2, Wingdings 3 and Webdings</strong>.
        </p>
      </div>

      <div className="space-y-16">
        <TranslatorSection />
        <FontCompare />
        <BatchConverter />
        <PracticeMode />
        <SymbolReference />
        <CompatibilityGuide />
        <Faq />

        <section aria-label="About this tool" className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">Why this translator is different</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li><strong className="text-zinc-200">Four real converters, not one.</strong> Most tools only do Wingdings 1 — here Wingdings 1, 2, 3 and Webdings each get a full converter with per-variant results.</li>
            <li><strong className="text-zinc-200">Click-to-copy symbol reference.</strong> Every symbol card copies on click — no static charts you have to retype from.</li>
            <li><strong className="text-zinc-200">Honest conversion.</strong> Unsupported characters are named, not silently swallowed.</li>
            <li><strong className="text-zinc-200">Doubles as a Wingdings decoder.</strong> Need to read symbols instead of writing them? The alphabet chart works as a decoder — look up any symbol to find its letter.</li>
            <li><strong className="text-zinc-200">Private by design.</strong> All conversion runs locally in your browser. Nothing is uploaded, stored or tracked.</li>
          </ul>
        </section>

        <nav aria-label="More translators" className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">More Wingdings tools</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li><Link href="/gaster-translator/" className="font-semibold text-indigo-400 hover:underline">Gaster translator</Link><span className="text-zinc-500"> — decode W. D. Gaster&apos;s Undertale messages</span></li>
            <li><Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-400 hover:underline">Wingdings alphabet chart</Link><span className="text-zinc-500"> — searchable symbols, click to copy</span></li>
            <li><Link href="/wingdings-2-translator/" className="font-semibold text-indigo-400 hover:underline">Wingdings 2 translator</Link><span className="text-zinc-500"> — stationery &amp; ornament symbols</span></li>
            <li><Link href="/wingdings-3-translator/" className="font-semibold text-indigo-400 hover:underline">Wingdings 3 translator</Link><span className="text-zinc-500"> — arrows &amp; directional symbols</span></li>
            <li><Link href="/webdings-translator/" className="font-semibold text-indigo-400 hover:underline">Webdings translator</Link><span className="text-zinc-500"> — web-style icon font</span></li>
            <li><Link href="/how-to-write-in-wingdings/" className="font-semibold text-indigo-400 hover:underline">How to write in Wingdings</Link><span className="text-zinc-500"> — Word, Google Docs &amp; mobile guide</span></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
