import type { Metadata } from "next";
import Link from "next/link";
import VariantTool from "@/components/VariantTool";
import PageFaq from "@/components/PageFaq";
import { SITE_URL } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WebAppJsonLd from "@/components/WebAppJsonLd";
import AnimatedTitle from "@/components/AnimatedTitle";

export const metadata: Metadata = {
  title: "Gaster Translator — Undertale Wingdings",
  description:
    "Translate W. D. Gaster's Undertale dialogue with this free Gaster translator. Type English to write like Gaster — instant, no sign-up.",
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
  {
    q: "What is “Wing Ding Gaster”?",
    a: "It is the nickname fans give W. D. Gaster, because his entire dialogue is written in Wingdings. Searches for “wing ding gaster” and “wing ding gaster translator” lead here — you can type his lines, or write new ones in his voice, with this translator.",
  },
];

export default function GasterTranslatorPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Gaster Translator", path: "/gaster-translator/" }]} />
      <WebAppJsonLd name="Gaster Translator" path="/gaster-translator/" description="Free Gaster translator: convert English into W. D. Gaster's Wingdings from Undertale. Instant, no sign-up." />
    <div className="mx-auto max-w-5xl px-4 pb-16">
      <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-500">
        <Link href="/" className="hover:text-indigo-400">Wingdings Translator</Link>
        <span aria-hidden="true"> / </span>
        <span aria-current="page">Gaster Translator</span>
      </nav>

      <div className="py-8 text-center">
        <h1 className="font-title mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl" aria-label="Gaster Translator">
          <AnimatedTitle text="Gaster Translator" />
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
          Decode W. D. (WD) Gaster&apos;s mysterious Undertale messages — translate any Gaster text
          to English, or write your own with this Gaster text generator. Get an instant English
          translation of his Wingdings &ldquo;language&rdquo;. Free, instant, runs entirely in your
          browser.
        </p>
      </div>

      <VariantTool defaultVariant="wingdings1" />

      <section aria-label="Lab Entry 17 decoded" className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">Lab Entry Number 17 — decoded</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
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
        <div className="mt-4 rounded-xl bg-indigo-950 p-4 text-sm leading-relaxed text-zinc-300">
          <p className="font-semibold text-zinc-100">The decoded text:</p>
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
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          Try it yourself: copy the symbols above and look each one up on the Wingdings alphabet chart
          with Wingdings&nbsp;1 selected — you&apos;ll get the same text. The
          encoding above was generated with this site&apos;s own Wingdings&nbsp;1 table.
        </p>
      </section>

      <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <h2 className="text-xl font-bold text-zinc-100">Who is W. D. Gaster?</h2>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          W. D. Gaster is a hidden character in the game Undertale, known only through scattered
          references and one famous passage — Lab Entry Number 17. His dialogue is rendered in
          Wingdings, which fans adopted as &ldquo;Gaster&apos;s language&rdquo;. Because the game
          uses the standard Wingdings 1 mapping, decoding his messages is straightforward: paste the
          symbols, pick Wingdings 1, and read the English underneath.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-zinc-400">
          The same mapping powers fan content across Reddit, Discord and Tumblr, where lore theories
          are routinely written in Wingdings. If you want the full symbol set instead, see the{" "}
          <Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-400 hover:underline">
            Wingdings alphabet chart
          </Link>
          , or use the{" "}
          <Link href="/" className="font-semibold text-indigo-400 hover:underline">
            main Wingdings translator
          </Link>{" "}
          for all four font variants.
        </p>
      </section>

      <div className="mt-14">
        <PageFaq items={FAQS} />
      </div>
    </div>
    </>
  );
}
