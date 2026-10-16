"use client";

import { useMemo, useState } from "react";
import { VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { decodeText, encodeText } from "@/lib/translate";
import { copyText } from "@/lib/clipboard";
import type { Direction } from "./Translator";

export default function BatchConverter() {
  const [input, setInput] = useState("");
  const [variant, setVariant] = useState<VariantId>("wingdings1");
  const [direction, setDirection] = useState<Direction>("encode");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const lines = useMemo(() => input.split("\n").filter((l) => l.trim().length > 0).slice(0, 200), [input]);

  const results = useMemo(
    () =>
      lines.map((line) =>
        direction === "encode" ? encodeText(line, variant).output : decodeText(line, variant).output
      ),
    [lines, variant, direction]
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
    const header = `Wingdings batch conversion (${variant}, ${direction === "encode" ? "English → symbols" : "symbols → English"})\nGenerated locally in your browser — nothing was uploaded.\n\n`;
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
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Batch converter</h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Convert many lines at once — one phrase per line. Handy for puzzles, worksheets or
        message lists. Everything still happens privately in your browser.
      </p>

      <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
        <div className="flex flex-wrap items-center gap-2">
          <label htmlFor="batch-variant" className="text-sm font-semibold text-slate-900">Font</label>
          <select
            id="batch-variant"
            value={variant}
            onChange={(e) => setVariant(e.target.value as VariantId)}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-indigo-500 focus:outline-none"
          >
            {VARIANTS.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
          <div className="flex rounded-xl border border-slate-200 p-1" role="group" aria-label="Batch direction">
            <button
              type="button"
              onClick={() => setDirection("encode")}
              aria-pressed={direction === "encode"}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${direction === "encode" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              English → Symbols
            </button>
            <button
              type="button"
              onClick={() => setDirection("decode")}
              aria-pressed={direction === "decode"}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium ${direction === "decode" ? "bg-indigo-600 text-white" : "text-slate-600 hover:bg-slate-100"}`}
            >
              Symbols → English
            </button>
          </div>
        </div>

        <label htmlFor="batch-input" className="mt-4 block text-sm font-semibold text-slate-900">
          Entries <span className="font-normal text-slate-500">(one per line)</span>
        </label>
        <textarea
          id="batch-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={5}
          placeholder={"Line one\nLine two\nLine three"}
          className="mt-2 w-full rounded-xl border border-slate-300 p-3 text-base text-slate-900 placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
        />
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={copyAll}
            disabled={results.length === 0}
            className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            {copiedKey === "all" ? "✓ Copied all!" : "⧉ Copy all results"}
          </button>
          <button
            type="button"
            onClick={() => setInput("")}
            disabled={!input}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Reset
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            disabled={results.length === 0}
            title="Download results as a .txt file (generated locally in your browser)"
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            ⬇ Download .txt
          </button>
          <p className="ml-auto text-xs text-slate-500" aria-live="polite">{lines.length} line{lines.length === 1 ? "" : "s"}</p>
        </div>

        {results.length > 0 && (
          <ol className="mt-4 space-y-2">
            {results.map((r, i) => (
              <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
                <span className="mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-indigo-100 text-xs font-bold text-indigo-700">
                  {i + 1}
                </span>
                <p className="min-w-0 flex-1 break-words text-base text-slate-900">{r || <span className="text-slate-400">(empty)</span>}</p>
                <button
                  type="button"
                  onClick={() => copyOne(i)}
                  aria-label={`Copy result of line ${i + 1}`}
                  className="shrink-0 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100"
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
