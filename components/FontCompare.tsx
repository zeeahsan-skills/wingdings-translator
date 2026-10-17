"use client";

import { useMemo, useState } from "react";
import { VARIANTS } from "@/lib/wingdings-maps";
import { encodeText } from "@/lib/translate";
import { copyText } from "@/lib/clipboard";

/**
 * Font comparison: type once, see the same text in all four symbol fonts
 * side by side. Helps users pick the right font — and identify which font
 * an unknown message was written in.
 */
export default function FontCompare() {
  const [text, setText] = useState("Hello World!");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const rows = useMemo(
    () =>
      VARIANTS.map((v) => ({
        variant: v,
        output: encodeText(text, v.id).output,
      })),
    [text]
  );

  async function handleCopy(id: string, value: string) {
    const ok = await copyText(value);
    if (ok) {
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1300);
    }
  }

  return (
    <section aria-label="Compare Wingdings fonts side by side" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Compare all four fonts</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Type once and see your text in <strong>Wingdings 1, 2, 3 and Webdings</strong> at the same
        time — the fastest way to pick the right look, or to work out which font a mystery message
        was written in.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:p-6">
        <label htmlFor="compare-input" className="text-sm font-semibold text-zinc-100">
          Type text to compare
        </label>
        <input
          id="compare-input"
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type something…"
          className="mt-2 w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-800"
        />

        <ul className="mt-4 grid gap-3 sm:grid-cols-2">
          {rows.map(({ variant, output }) => (
            <li
              key={variant.id}
              className="rounded-xl border border-zinc-800 bg-zinc-900 p-4"
            >
              <div className="flex items-center justify-between gap-2">
                <p className="text-sm font-bold text-zinc-100">{variant.label}</p>
                <button
                  type="button"
                  onClick={() => handleCopy(variant.id, output)}
                  disabled={!output}
                  className="rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1 text-xs font-semibold text-zinc-300 hover:bg-zinc-800 disabled:opacity-50"
                >
                  {copiedId === variant.id ? "✓ Copied!" : "Copy"}
                </button>
              </div>
              <p className="mt-2 min-h-12 break-words text-2xl leading-relaxed text-zinc-100">
                {output || <span className="text-base text-zinc-500">—</span>}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{variant.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
