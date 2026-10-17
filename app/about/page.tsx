import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `What ${SITE_NAME} is, how the translator works, and how its symbol mappings were built.`,
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold tracking-tight text-zinc-100">About {SITE_NAME}</h1>
      <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
        <p>
          {SITE_NAME} is a free online tool that converts English text into Wingdings-style symbols
          and decodes symbols back into English. It covers four classic Microsoft symbol fonts:
          Wingdings 1, Wingdings 2, Wingdings 3 and Webdings.
        </p>
        <h2 className="pt-2 text-xl font-bold text-zinc-100">How it works</h2>
        <p>
          Everything runs locally in your browser with JavaScript — there is no server processing
          your text. Each keyboard character is looked up in a mapping table for the selected font
          variant and replaced with its Unicode symbol approximation. Decoding reverses the table.
          Because a few Unicode symbols approximate more than one key, the decoder tells you
          whenever a symbol was ambiguous instead of guessing silently.
        </p>
        <h2 className="pt-2 text-xl font-bold text-zinc-100">About the mappings</h2>
        <p>
          The original Wingdings fonts are glyph-substitution fonts: they display pictures in place
          of letters but store plain text underneath. This tool outputs real Unicode characters that
          look like those pictures, so the result pastes into any app. The mapping tables were
          compiled from published, documented code charts (including the Unicode code charts that
          document each font&apos;s repertoire). Each entry records its provenance, and entries
          confirmed by a single documented source are labeled as such in the character inspector.
        </p>
        <h2 className="pt-2 text-xl font-bold text-zinc-100">Independence note</h2>
        <p>
          Wingdings is a trademark of Microsoft Corporation. This is an independent project and is
          not affiliated with, sponsored, or endorsed by Microsoft.
        </p>
      </div>
    </div>
  );
}
