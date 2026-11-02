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
            One Wingdings translator for writing symbols, reading them back, and copying them anywhere.
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

        <section aria-label="What is a Wingdings translator" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">What is a Wingdings translator?</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            A Wingdings translator converts ordinary English text into Wingdings symbols — and helps you read symbol text back into English. Wingdings itself is not a language with grammar or vocabulary; it is a font in which every keyboard key draws a picture instead of a letter. A Wingdings translator applies that key-to-symbol mapping for you, character by character, so a word like &ldquo;Hello&rdquo; becomes ☟♏●●□ in Wingdings 1.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            People reach for a Wingdings translator to make puzzles and classroom worksheets, write game messages — W. D. Gaster speaks in Wingdings in Undertale — and send secret notes that only friends with the chart can read. This Wingdings translator covers all four Microsoft symbol fonts (Wingdings 1, 2, 3 and Webdings), runs entirely in your browser with nothing uploaded, and works alongside the alphabet chart when you need to decode a message symbol by symbol.
          </p>
        </section>

        <section aria-label="How to use the Wingdings translator" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">How to use the Wingdings translator</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Using the Wingdings translator takes seconds — there is nothing to install and no account to create:
          </p>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li>Type or paste your text into the Wingdings translator&apos;s input box at the top of this page.</li>
            <li>Pick a font — the Wingdings translator converts into Wingdings 1, Wingdings 2, Wingdings 3 or Webdings.</li>
            <li>Watch the symbols appear live: the Wingdings translator converts every character as you type.</li>
            <li>Hit &ldquo;Copy result&rdquo; and paste your symbols anywhere — chats, bios, documents, posts.</li>
          </ol>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            That is all a Wingdings translator needs: text in, symbols out.
          </p>
        </section>

        <section aria-label="English to Wingdings and back" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">English to Wingdings — and back to English</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Most people arrive at a Wingdings translator to turn plain English into symbols. The Wingdings translator above does that letter by letter, matching every character to its symbol in the Wingdings font map — full sentences and whole paragraphs included, not just single words.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Reading is the other half of the job. When a friend sends you a row of symbols, this Wingdings translator&apos;s alphabet chart works as the decoder: find each symbol, read off the key that produced it, and the message spells itself out. Fans use exactly this Wingdings translator workflow to read W. D. Gaster&apos;s lines in Undertale. Encode with the Wingdings translator, decode with its chart — the pair covers both directions.
          </p>
        </section>

        <section aria-label="Which Wingdings font to use" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">Which font should the Wingdings translator use?</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            The four fonts are separate alphabets, not versions of one another, and the Wingdings translator handles each one natively. Wingdings 1 is the classic 1990 set — hands, faces, zodiac and office icons — and the one most people picture when they search for a Wingdings translator. Wingdings 2 adds stationery and circled numbers, Wingdings 3 is almost all arrows and keyboard keys, and Webdings is the web-era pictogram font. Not sure which font produced a message you received? Compare mode runs the same text through all four in this Wingdings translator at once.
          </p>
        </section>

        <section aria-label="History of Wingdings" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">A short history of Wingdings</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            Wingdings began life in 1990 as three typefaces drawn by type designers Charles Bigelow and Kris Holmes — <em>Lucida Icons</em>, <em>Lucida Arrows</em> and <em>Lucida Stars</em>. Microsoft licensed the designs and shipped the combined font as Wingdings with Windows 3.1 in 1992, so almost every Windows PC since has carried the symbols. Because each keyboard key maps to a picture, people started using it for puzzles, hidden messages and decoration — some even search for it as a &ldquo;wingding translator&rdquo; or &ldquo;wing ding translator&rdquo;, nicknames that stuck even though the font&rsquo;s official name ends with an S. A famous 1990s urban legend claimed certain letter combinations spelled hidden messages; it was a coincidence of the symbol set, but it made Wingdings notorious and kept it famous long after most fonts are forgotten. That everyday job — turning symbols back into readable text, and plain text into symbols — is exactly what a Wingdings translator is for.
          </p>
        </section>

        <section aria-label="About this tool" className="bento-card rounded-3xl border border-zinc-800 bg-zinc-900/70 p-6 shadow-sm backdrop-blur sm:p-8">
          <h2 className="font-display text-xl font-bold text-zinc-100">Why this Wingdings translator is different</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li><strong className="text-zinc-200">Four real converters, not one.</strong> Most Wingdings translator tools only do Wingdings 1 — this Wingdings translator gives Wingdings 1, 2, 3 and Webdings each a full converter with per-variant results.</li>
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
