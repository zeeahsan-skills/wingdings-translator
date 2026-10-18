import type { Metadata } from "next";
import Link from "next/link";
import TranslatorSection from "@/components/TranslatorSection";
import FontCompare from "@/components/FontCompare";
import BatchConverter from "@/components/BatchConverter";
import PracticeMode from "@/components/PracticeMode";
import SymbolReference from "@/components/SymbolReference";
import CompatibilityGuide from "@/components/CompatibilityGuide";
import SymbolField from "@/components/SymbolField";
import SymbolTicker from "@/components/SymbolTicker";
import Faq from "@/components/Faq";
import { VARIANTS } from "@/lib/wingdings-maps";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Convert English to Wingdings Symbols & Back`,
  description: SITE_TAGLINE,
};

const TOTAL_SYMBOLS = VARIANTS.reduce((n, v) => n + v.entries.length, 0);

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* Hero — a living cipher universe */}
      <div className="relative overflow-hidden py-14 text-center sm:py-20">
        <SymbolField />
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-600/25" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20" style={{ animationDelay: "-5s" }} aria-hidden="true" />

        <div className="relative">
          <p className="badge-shimmer mx-auto inline-flex items-center gap-2 rounded-full border border-indigo-500/40 bg-gradient-to-r from-indigo-950/80 via-violet-950/80 to-indigo-950/80 px-4 py-1.5 text-xs font-bold tracking-wide text-indigo-200">
            <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            FREE FOREVER · NO SIGN-UP · INSTANT
          </p>
          <h1
            className="font-display mx-auto mt-5 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
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
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-zinc-400">
            This free online Wingdings translator and generator converts English into Wingdings
            symbols live as you type — get an instant Wingdings translation across{" "}
            <strong className="text-zinc-200">Wingdings 1, Wingdings 2, Wingdings 3 and Webdings</strong>.
          </p>
          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="#translator"
              className="font-display rounded-2xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-7 py-3.5 text-sm font-bold tracking-wide text-white shadow-xl shadow-violet-900/40 transition hover:brightness-110 active:scale-95"
            >
              ⚡ START TRANSLATING
            </Link>
            <Link
              href="/wingdings-alphabet-chart/"
              className="font-display rounded-2xl border border-zinc-700 bg-zinc-900/70 px-7 py-3.5 text-sm font-bold tracking-wide text-zinc-200 backdrop-blur transition hover:border-indigo-500/60 hover:text-white"
            >
              BROWSE SYMBOL CHART
            </Link>
          </div>
          <dl className="mx-auto mt-9 grid max-w-xl grid-cols-3 gap-3">
            {[
              ["4", "symbol fonts"],
              [String(TOTAL_SYMBOLS), "mapped symbols"],
              ["100%", "free, private"],
            ].map(([num, label]) => (
              <div key={label} className="rounded-2xl border border-zinc-800/80 bg-black/50 px-3 py-3.5 backdrop-blur">
                <dt className="sr-only">{label}</dt>
                <dd className="font-display bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-2xl font-extrabold text-transparent">{num}</dd>
                <dd className="mt-0.5 text-xs font-medium text-zinc-500">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      <div className="relative -mx-4 mb-4">
        <SymbolTicker />
      </div>

      <div className="space-y-16">
        <TranslatorSection />
        <FontCompare />
        <BatchConverter />
        <PracticeMode />
        <SymbolReference />
        <CompatibilityGuide />
        <Faq />

        <section aria-label="About this tool" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">Why this translator is different</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li><strong className="text-zinc-200">Four real converters, not one.</strong> Most tools only do Wingdings 1 — here Wingdings 1, 2, 3 and Webdings each get a full converter with per-variant results.</li>
            <li><strong className="text-zinc-200">Click-to-copy symbol reference.</strong> Every symbol card copies on click — no static charts you have to retype from.</li>
            <li><strong className="text-zinc-200">Honest conversion.</strong> Unsupported characters are named, not silently swallowed.</li>
            <li><strong className="text-zinc-200">Doubles as a Wingdings decoder.</strong> Need to read symbols instead of writing them? The alphabet chart works as a decoder — look up any symbol to find its letter.</li>
            <li><strong className="text-zinc-200">Private by design.</strong> All conversion runs locally in your browser. Nothing is uploaded, stored or tracked.</li>
          </ul>
        </section>

        <nav aria-label="More translators" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">More Wingdings tools</h2>
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
