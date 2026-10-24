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
import WebAppJsonLd from "@/components/WebAppJsonLd";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const metadata: Metadata = {
  title: `${SITE_NAME} — English to Wingdings Converter`,
  description: SITE_TAGLINE,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <WebAppJsonLd
        name="Wingdings Translator"
        path="/"
        description="Free online Wingdings translator: convert English text to Wingdings, Wingdings 2, Wingdings 3 and Webdings symbols instantly. No sign-up."
      />
      {/* Hero — a living cipher universe */}
      <div className="relative overflow-hidden py-14 text-center sm:py-20">
        <SymbolField />
        <div className="bg-blueprint pointer-events-none absolute inset-0" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -top-20 left-1/4 h-72 w-72 rounded-full bg-indigo-600/25" aria-hidden="true" />
        <div className="animate-orb pointer-events-none absolute -bottom-24 right-1/4 h-72 w-72 rounded-full bg-fuchsia-600/20" style={{ animationDelay: "-5s" }} aria-hidden="true" />

        <div className="relative">
          <p className="badge-shimmer hero-badge mx-auto inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-wide">
            <span className="live-dot relative inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
            FREE FOREVER · NO SIGN-UP · INSTANT
          </p>
          <h1
            className="font-title mx-auto mt-5 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl"
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
                          animationDelay: `${0.15 + idx * 0.11}s`,
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
        </div>
      </div>

      <div className="relative -mx-4 mb-4">
        <SymbolTicker />
      </div>

      <div className="space-y-16">
        <TranslatorSection />
        {/* Below-fold blocks are render-contained (.cv-section): their HTML is
            still fully server-rendered, but off-screen layout/paint is
            deferred until the user scrolls near them (mobile main-thread). */}
        <div className="cv-section">
          <FontCompare />
        </div>
        <div className="cv-section">
          <BatchConverter />
        </div>
        <div className="cv-section">
          <PracticeMode />
        </div>
        <div className="cv-section">
          <SymbolReference />
        </div>
        <div className="cv-section">
          <CompatibilityGuide />
        </div>
        <div className="cv-section">
          <Faq />
        </div>

        <section aria-label="History of Wingdings" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">A short history of Wingdings</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Wingdings began life in 1990 as three typefaces drawn by type designers Charles Bigelow and Kris Holmes — <em>Lucida Icons</em>, <em>Lucida Arrows</em> and <em>Lucida Stars</em>. Microsoft licensed the designs and shipped the combined font as Wingdings with Windows 3.1 in 1992, so almost every Windows PC since has carried the symbols. Because each keyboard key maps to a picture, people started using it for puzzles, hidden messages and decoration — some even search for it as a &ldquo;wingding translator&rdquo; or &ldquo;wing ding translator&rdquo;, nicknames that stuck even though the font&rsquo;s official name ends with an S. A famous 1990s urban legend claimed certain letter combinations spelled hidden messages; it was a coincidence of the symbol set, but it made Wingdings notorious and kept it famous long after most fonts are forgotten.
          </p>
        </section>

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
            <li><Link href="/gaster-translator/" className="font-semibold text-indigo-400 hover:underline">Gaster translator</Link><span className="text-zinc-400"> — decode W. D. Gaster&apos;s Undertale messages</span></li>
            <li><Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-400 hover:underline">Wingdings alphabet chart</Link><span className="text-zinc-400"> — searchable symbols, click to copy</span></li>
            <li><Link href="/wingdings-2-translator/" className="font-semibold text-indigo-400 hover:underline">Wingdings 2 translator</Link><span className="text-zinc-400"> — stationery &amp; ornament symbols</span></li>
            <li><Link href="/wingdings-3-translator/" className="font-semibold text-indigo-400 hover:underline">Wingdings 3 translator</Link><span className="text-zinc-400"> — arrows &amp; directional symbols</span></li>
            <li><Link href="/webdings-translator/" className="font-semibold text-indigo-400 hover:underline">Webdings translator</Link><span className="text-zinc-400"> — web-style icon font</span></li>
            <li><Link href="/how-to-write-in-wingdings/" className="font-semibold text-indigo-400 hover:underline">How to write in Wingdings</Link><span className="text-zinc-400"> — Word, Google Docs &amp; mobile guide</span></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
