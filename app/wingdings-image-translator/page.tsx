import type { Metadata } from "next";
import Link from "next/link";
import ImageTranslator from "@/components/ImageTranslator";
import AnimatedTitle from "@/components/AnimatedTitle";
import PageFaq from "@/components/PageFaq";
import { pageOpenGraph } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import WebAppJsonLd from "@/components/WebAppJsonLd";

export const metadata: Metadata = {
  title: "Wingdings Image Translator — Decode Wingdings from an Image",
  description:
    "Free Wingdings translator from image: upload a screenshot or photo of Wingdings symbols and decode it back to English. Private — the image never leaves your browser.",
  alternates: { canonical: "/wingdings-image-translator" },
  openGraph: pageOpenGraph("/wingdings-image-translator"),
};

const FAQS = [
  {
    q: "Is my image uploaded to a server?",
    a: "No. The decoder runs entirely in your browser — the picture is read on your own device and is never sent to our servers or stored anywhere. You can even go offline after the page loads and it still works.",
  },
  {
    q: "Why can't a normal OCR app read a Wingdings picture?",
    a: "OCR software is trained on ordinary letters and numbers, and Wingdings glyphs are pictures, not letters. This tool works differently: it cuts the image into single symbols and matches each one visually against the Wingdings character chart, then reads off the key that produces it.",
  },
  {
    q: "How accurate is the decoding?",
    a: "Accuracy depends on the picture. Clean screenshots with dark symbols on a plain background decode best. Blurry photos, low contrast or mixed fonts can confuse a few symbols — that is why the decoded text is editable, and the tool tells you how many symbols it was unsure about.",
  },
  {
    q: "Which fonts can it read?",
    a: "Wingdings 1, Wingdings 2, Wingdings 3 and Webdings. Pick the font the picture was written in before uploading — the same picture decodes differently in each font, because every font maps keys to different symbols. Wingdings 1 is selected by default; it is also the font W. D. Gaster's messages use in Undertale.",
  },
  {
    q: "What kind of picture works best?",
    a: "A straight screenshot of symbol text on a plain background, cropped to just the text. Pictures saved with the PNG download button in the main translator, or copied from a document, work well. Avoid tilted photos, shadows and decorative backgrounds.",
  },
  {
    q: "How do I translate Wingdings from an image to text?",
    a: "Upload the image (or paste a screenshot), choose the font it was written in, and the decoder reads the symbols and shows the English text in an editable box. Copy it with one click, or open it in the main translator to keep working with it.",
  },
];

export default function WingdingsImageTranslatorPage() {
  return (
    <>
      <BreadcrumbJsonLd
        trail={[
          { name: "Home", path: "/" },
          { name: "Wingdings Image Translator", path: "/wingdings-image-translator/" },
        ]}
      />
      <WebAppJsonLd
        name="Wingdings Image Translator"
        path="/wingdings-image-translator/"
        description="Free Wingdings image translator: upload a screenshot or photo of Wingdings symbols and decode it back to English, entirely in your browser."
      />
      <div className="mx-auto max-w-5xl px-4 pb-16">
        <nav aria-label="Breadcrumb" className="pt-6 text-sm text-zinc-400">
          <Link href="/" className="hover:text-indigo-400">
            Wingdings Translator
          </Link>
          <span aria-hidden="true"> / </span>
          <span aria-current="page">Image Translator</span>
        </nav>

        <div className="py-8 text-center">
          <h1
            className="font-title mx-auto max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl"
            aria-label="Wingdings Image Translator"
          >
            <AnimatedTitle text="Wingdings Image Translator" />
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-zinc-400">
            Got a screenshot or photo full of Wingdings symbols? Upload it here and read the
            hidden English — free, no sign-up, and completely private: the picture never leaves
            your browser.
          </p>
        </div>

        <ImageTranslator />

        <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">What is a Wingdings translator from image?</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            A Wingdings translator from image — also called a Wingdings image decoder — reads the
            symbols inside a picture and turns them back into readable English. People use it to
            decode Wingdings from a screenshot of a game, a meme, a social media post or an old
            document, without looking up every symbol by hand on a chart.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-400">
            It works the opposite way to the{" "}
            <Link href="/" className="font-semibold text-indigo-400 hover:underline">
              main translator
            </Link>
            : instead of turning typed text into symbols, it takes a finished picture as input
            and gives you the text back. If you can copy the symbols as text instead of a
            picture, paste them into the main translator — that is always 100% exact.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">How it works</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li>
              <strong className="text-zinc-200">Pick the font</strong> the picture was written
              in — Wingdings 1 by default, or Wingdings 2, Wingdings 3 and Webdings.
            </li>
            <li>
              <strong className="text-zinc-200">Add the picture</strong> — drag and drop it,
              click to browse, or paste it straight from your clipboard.
            </li>
            <li>
              <strong className="text-zinc-200">Read the message.</strong> The tool splits the
              picture into single symbols and matches each one against the{" "}
              <Link href="/wingdings-alphabet-chart/" className="font-semibold text-indigo-400 hover:underline">
                Wingdings alphabet chart
              </Link>
              , because ordinary OCR is not trained on symbol fonts. The decoded English appears
              in an editable box, with a note about any symbols it was unsure of.
            </li>
          </ol>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400">
            Working the other way? Type text and turn it into symbols with the{" "}
            <Link href="/" className="font-semibold text-indigo-400 hover:underline">
              main translator
            </Link>
            , decode a single mystery symbol in the{" "}
            <Link href="/#symbols" className="font-semibold text-indigo-400 hover:underline">
              symbol reference
            </Link>
            , or read Gaster's Entry 17 on the{" "}
            <Link href="/gaster-translator/" className="font-semibold text-indigo-400 hover:underline">
              Gaster translator
            </Link>{" "}
            page.
          </p>
        </section>

        <section className="mt-14 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
          <h2 className="text-xl font-bold text-zinc-100">Tips for an accurate decode</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-zinc-400">
            <li>Crop the picture to just the symbol text — extra decoration adds noise.</li>
            <li>Dark symbols on a plain, light background read best; very small text may blur.</li>
            <li>One font per picture: if a message mixes fonts, decode it in parts.</li>
            <li>Always glance over the result — a couple of similar-looking symbols can swap.</li>
          </ul>
        </section>

        <div className="mt-14">
          <PageFaq items={FAQS} />
        </div>
      </div>
    </>
  );
}
