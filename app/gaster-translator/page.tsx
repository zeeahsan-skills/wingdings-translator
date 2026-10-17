import type { Metadata } from "next";
import Link from "next/link";
import VariantTool from "@/components/VariantTool";
import PageFaq from "@/components/PageFaq";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Gaster Translator — Decode W. D. Gaster's Wingdings Messages",
  description:
    "Translate W. D. Gaster's mysterious Undertale dialogue with this free Gaster translator. Type English to write like Gaster, or paste Wingdings symbols to decode his messages — instant, no sign-up.",
  alternates: { canonical: `${SITE_URL}/gaster-translator/` },
};

const FAQS = [
  {
    q: "What language does Gaster speak?",
    a: "W. D. Gaster, the hidden character from Undertale, “speaks” in Wingdings — the symbol font Microsoft shipped with Windows. His dialogue, most famously Lab Entry Number 17, is encoded with the standard Wingdings 1 character mapping, so any Wingdings decoder can read it.",
  },
  {
    q: "How do I decode Gaster's messages?",
    a: "Look each symbol up on the Wingdings alphabet chart with Wingdings 1 selected. Gaster's text follows the standard Wingdings 1 mapping, so it decodes accurately — including the well-known Entry 17 passage.",
  },
  {
    q: "Can I write my own text like Gaster?",
    a: "Yes. Type English text with Wingdings 1 selected. The output uses the same mapping the game uses for Gaster's dialogue, which is why fan communities write lore theories and messages in it.",
  },
  {
    q: "Is the Gaster translator the same as a Wingdings translator?",
    a: "Essentially, yes. “Gaster language” is a fan name for standard Wingdings 1 as used by the character. This page uses the same engine as the main Wingdings translator, framed for Undertale fans, with notes on decoding his in-game messages.",
  },
];

export default function GasterTranslatorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-slate-500">
        <Link href="/" className="hover:text-indigo-600">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Gaster Translator</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Gaster Translator
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
          Decode W. D. Gaster&apos;s mysterious Undertale messages — or write your own text in his
          Wingdings &ldquo;language&rdquo;. Free, instant, and runs entirely in your browser.
        </p>
      </div>

      <VariantTool defaultVariant="wingdings1" />

      <section aria-label="Lab Entry 17 decoded" className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Lab Entry Number 17 — decoded</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          This is the passage most people come here to decode. In the game it appears as Wingdings
          symbols; with the standard Wingdings&nbsp;1 mapping it reads:
        </p>
        <div className="mt-4 overflow-x-auto rounded-xl bg-slate-950 p-4">
          <p className="whitespace-pre-wrap text-lg leading-loose text-slate-100" lang="en">
{`☜☠❄☼☯ ☠✞💣👌☜☼ 💧☜✠☜☠❄☜☜☠
👎✌☼😐 👎✌☼😐☜☼ ☯☜❄ 👎✌☼😐☜☼
❄☟☜ 👎✌☼😐☠☜💧💧 😐☜☜☛💧 ☝☼⚐✡✋☠☝
❄☟☜ 💧☟✌👎⚐✡💧 👍✞❄❄✋☠☝ 👎☜☜☛☜☼
☛☟⚐❄⚐☠ ☼☜✌👎✋☠☝💧 ☠☜☝✌❄✋✠☜
❄☟✋💧 ☠☜☪❄ ☜☪☛☜☼✋💣☜☠❄
💧☜☜💣💧 ✠☜☼☯
✠☜☼☯ ✋☠❄☜☼☜💧❄✋☠☝
📬📬📬
✡☟✌❄ 👎⚐ ☯⚐✞ ❄✡⚐ ❄☟✋☠😐✍`}
          </p>
        </div>
        <div className="mt-4 rounded-xl bg-indigo-50 p-4 text-sm leading-relaxed text-slate-700">
          <p className="font-semibold text-slate-900">The decoded text:</p>
          <p className="mt-2 whitespace-pre-line font-medium">
{`ENTRY NUMBER SEVENTEEN
DARK DARKER YET DARKER
THE DARKNESS KEEPS GROWING
THE SHADOWS CUTTING DEEPER
PHOTON READINGS NEGATIVE
THIS NEXT EXPERIMENT
SEEMS VERY
VERY INTERESTING
...
WHAT DO YOU TWO THINK?`}
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          Try it yourself: copy the symbols above and look each one up on the Wingdings alphabet chart
          with Wingdings&nbsp;1 selected — you&apos;ll get the same text. The
          encoding above was generated with this site&apos;s own Wingdings&nbsp;1 table.
        </p>
      </section>

      <section className="mt-14 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">Who is W. D. Gaster?</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          W. D. Gaster is a hidden character in the game Undertale, known only through scattered
          references and one famous passage — Lab Entry Number 17. His dialogue is rendered in
          Wingdings, which fans adopted as &ldquo;Gaster&apos;s language&rdquo;. Because the game
          uses the standard Wingdings 1 mapping, decoding his messages is straightforward: paste the
          symbols, pick Wingdings 1, and read the English underneath.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">
          The same mapping powers fan content across Reddit, Discord and Tumblr, where lore theories
          are routinely written in Wingdings. If you want the full symbol set instead, see the{" "}
          <Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-600 hover:underline">
            Wingdings alphabet chart
          </Link>
          , or use the{" "}
          <Link href="/" className="font-semibold text-indigo-600 hover:underline">
            main Wingdings translator
          </Link>{" "}
          for all four font variants.
        </p>
      </section>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
  );
}
