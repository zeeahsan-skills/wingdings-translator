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
import { ALL_TAGGED, VARIANTS } from "@/lib/wingdings-maps";

export const metadata: Metadata = {
  title: `${SITE_NAME} — Convert English to Wingdings Symbols & Back`,
  description: SITE_TAGLINE,
};

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      {/* Hero */}
      <div className="py-10 text-center sm:py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-indigo-600">
          Free · Instant · No sign-up · Works offline in your browser
        </p>
        <h1 className="mx-auto mt-3 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Wingdings Translator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Convert English to Wingdings symbols and decode symbols back to English — live as you
          type, across <strong>Wingdings 1, Wingdings 2, Wingdings 3 and Webdings</strong>.
        </p>
        <dl className="mx-auto mt-6 flex max-w-lg justify-center gap-6 text-center">
          <div>
            <dt className="sr-only">Font variants</dt>
            <dd className="text-2xl font-extrabold text-slate-900">{VARIANTS.length}</dd>
            <dd className="text-xs text-slate-500">font variants</dd>
          </div>
          <div>
            <dt className="sr-only">Mapped symbols</dt>
            <dd className="text-2xl font-extrabold text-slate-900">{ALL_TAGGED.length}</dd>
            <dd className="text-xs text-slate-500">mapped symbols</dd>
          </div>
          <div>
            <dt className="sr-only">Price</dt>
            <dd className="text-2xl font-extrabold text-slate-900">$0</dd>
            <dd className="text-xs text-slate-500">free forever</dd>
          </div>
        </dl>
      </div>

      <div className="space-y-16">
        <TranslatorSection />
        <FontCompare />
        <BatchConverter />
        <PracticeMode />
        <SymbolReference />
        <CompatibilityGuide />
        <Faq />

        <section aria-label="About this tool" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">Why this translator is different</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-slate-600">
            <li><strong className="text-slate-800">Four real converters, not one.</strong> Most tools only do Wingdings 1 — here Wingdings 1, 2, 3 and Webdings each get a full converter with per-variant results.</li>
            <li><strong className="text-slate-800">Click-to-copy symbol reference.</strong> Every symbol card copies on click — no static charts you have to retype from.</li>
            <li><strong className="text-slate-800">Honest decoding.</strong> Ambiguous symbols are flagged with alternatives instead of silently guessed; unsupported characters are named, not swallowed.</li>
            <li><strong className="text-slate-800">Private by design.</strong> All conversion runs locally in your browser. Nothing is uploaded, stored or tracked.</li>
          </ul>
        </section>

        <nav aria-label="More translators" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">More Wingdings tools</h2>
          <ul className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
            <li><Link href="/gaster-translator/" className="font-semibold text-indigo-600 hover:underline">Gaster translator</Link><span className="text-slate-500"> — decode W. D. Gaster&apos;s Undertale messages</span></li>
            <li><Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-600 hover:underline">Wingdings alphabet chart</Link><span className="text-slate-500"> — searchable symbols, click to copy</span></li>
            <li><Link href="/wingdings-2-translator/" className="font-semibold text-indigo-600 hover:underline">Wingdings 2 translator</Link><span className="text-slate-500"> — stationery &amp; ornament symbols</span></li>
            <li><Link href="/wingdings-3-translator/" className="font-semibold text-indigo-600 hover:underline">Wingdings 3 translator</Link><span className="text-slate-500"> — arrows &amp; directional symbols</span></li>
            <li><Link href="/webdings-translator/" className="font-semibold text-indigo-600 hover:underline">Webdings translator</Link><span className="text-slate-500"> — web-style icon font</span></li>
            <li><Link href="/how-to-write-in-wingdings/" className="font-semibold text-indigo-600 hover:underline">How to write in Wingdings</Link><span className="text-slate-500"> — Word, Google Docs &amp; mobile guide</span></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
