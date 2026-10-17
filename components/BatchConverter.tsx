"use client";

import { useMemo, useState } from "react";
import { VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { encodeText } from "@/lib/translate";
import { copyText } from "@/lib/clipboard";

export default function BatchConverter() {
  const [input, setInput] = useState("");
  const [variant, setVariant] = useState<VariantId>("wingdings1");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const lines = useMemo(() => input.split("\n").filter((l) => l.trim().length > 0).slice(0, 200), [input]);

  const results = useMemo(
    () => lines.map((line) => encodeText(line, variant).output),
    [lines, variant]
  );

  async function copyOne(i: number) {
    const ok = await copyText(results[i]);
    if (ok) {
      setCopiedKey(`line-${i}`);
      window.setTimeout(() => setCopiedKey(null), 1400);
    }
  }

  /** Export workspace: download numbered results as a .txt file, generated locally. */
  function downloadTxt() {
    if (results.length === 0) return;
    const body = results.map((r, i) => `${i + 1}. ${r}`).join("\n");
    const header = `Wingdings batch conversion (${variant}, English → symbols)\nGenerated locally in your browser — nothing was uploaded.\n\n`;
    const blob = new Blob([header + body + "\n"], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `wingdings-batch-${variant}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  async function copyAll() {
    const ok = await copyText(results.join("\n"));
    if (ok) {
      setCopiedKey("all");
      window.setTimeout(() => setCopiedKey(null), 1400);
    }
  }

  return (
    <section id="batch" aria-label="Batch converter" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Batch converter</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Convert many lines at once — one phrase per line. Handy for puzzles, worksheets or
        message lists. Everything still happens privately in your browser.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="batch-variant" className="text-sm font-semibold text-zinc-100">Font</label>
          <select
            id="batch-variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value as VariantId)}
            className="rounded-xl border border-zinc-700 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none"
          >
            {VARIANTS.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
          <span className="rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-3 py-1.5 text-sm font-medium text-white shadow-sm">
            English → Symbols
          </span>
        </div>

        <label htmlFor="batch-input" className="mt-4 block text-sm font-semibold text-zinc-100">
          Entries <span className="font-normal text-zinc-500">(one per line)</span>
        </label>
        <textarea
          id="batch-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder={"Line one\nLine two\nLine three"}
          className="mt-2 w-full rounded-xl border border-zinc-700 p-3 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-800"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyAll}
            disabled={results.length === 0}
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:bg-none"
          >
            {copiedKey === "all" ? "✓ Copied all!" : "⧉ Copy all results"}
          </button>
          <button
            type="button"
            onClick={() => setInput("")}
            disabled={!input}
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            disabled={results.length === 0}
            title="Download results as a .txt file (generated locally in your browser)"
            className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⬇ Download .txt
          </button>
          <p className="ml-auto text-xs text-zinc-500" aria-live="polite">{lines.length} line{lines.length === 1 ? "" : "s"}</p>
        </div>

        {results.length > 0 && (
          <ol className="mt-4 space-y-2">
            {results.map((r, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-zinc-800 bg-zinc-900 p-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-950 text-xs font-bold text-indigo-300">
                  {i + 1}
                </span>
                <p className="min-w-0 flex-1 break-words text-base text-zinc-100">{r || <span className="text-zinc-500">(empty)</span>}</p>
                <button
                  type="button"
                  onClick={() => copyOne(i)}
                  aria-label={`Copy result of line ${i + 1}`}
                  className="shrink-0 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-1.5 text-xs font-semibold text-zinc-300 hover:bg-zinc-800"
                >
                  {copiedKey === `line-${i}` ? "✓ Copied" : "Copy"}
                </button>
              </li>
            ))}
          </ol>
        )}
      </div>
    </section>
  );
}
