"use client";

import { useMemo, useState } from "react";
import { VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { formatCodepoint, inspectChar } from "@/lib/translate";

interface Props {
  text: string;
  variant: VariantId;
}

const MAX_CHIPS = 240;

export default function Inspector({ text, variant }: Props) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const chars = useMemo(() => [...text].slice(0, MAX_CHIPS), [text]);
  const variantLabel = VARIANTS.find((v) => v.id === variant)?.label ?? variant;

  const detail = selectedIndex !== null && chars[selectedIndex] !== undefined
    ? inspectChar(chars[selectedIndex], variant)
    : null;
  const selectedChar = selectedIndex !== null ? chars[selectedIndex] : null;

  return (
    <section id="inspector" aria-label="Character inspector" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-slate-900">Character inspector</h2>
      <p className="mt-2 max-w-2xl text-slate-600">
        Click any character from the translator input above to see exactly what it becomes:
        the mapped symbol, its Unicode code point, and which font variant produced it — a
        char-by-char breakdown no other translator shows.
      </p>

      {chars.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-slate-300 bg-white p-4 text-sm text-slate-500">
          Type something in the translator above and its characters will appear here for inspection.
        </p>
      ) : (
        <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-wrap gap-1.5" role="group" aria-label="Characters to inspect">
            {chars.map((ch, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setSelectedIndex(i)}
                aria-pressed={selectedIndex === i}
                aria-label={`Inspect character ${ch === " " ? "space" : ch}`}
                className={`min-w-9 rounded-lg border px-2 py-1.5 font-mono text-base transition ${
                  selectedIndex === i
                    ? "border-indigo-600 bg-indigo-600 text-white"
                    : "border-slate-200 bg-slate-50 text-slate-800 hover:border-indigo-300 hover:bg-indigo-50"
                }`}
              >
                {ch === " " ? "␣" : ch === "\n" ? "↵" : ch}
              </button>
            ))}
          </div>
          {text.length > MAX_CHIPS && (
            <p className="mt-2 text-xs text-slate-500">Showing the first {MAX_CHIPS} characters.</p>
          )}

          <div className="mt-4 min-h-32 rounded-xl bg-slate-50 p-4" aria-live="polite">
            {selectedChar === null || detail === null ? (
              <p className="text-sm text-slate-500">Select a character above to inspect its mapping.</p>
            ) : (
              <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-slate-500">Source character</dt>
                  <dd className="mt-0.5 font-mono text-2xl text-slate-900">{selectedChar === " " ? "␣ (space)" : selectedChar}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Mapped symbol</dt>
                  <dd className="mt-0.5 text-2xl text-slate-900">{detail.entry.symbol}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Unicode code point</dt>
                  <dd className="mt-0.5 font-mono text-lg text-slate-900">{detail.entry.codepoint}</dd>
                  <dd className="text-xs text-slate-500">actual: {formatCodepoint(detail.entry.symbol.codePointAt(0) ?? 0)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Symbol name</dt>
                  <dd className="mt-0.5 capitalize text-slate-900">{detail.entry.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Font variant</dt>
                  <dd className="mt-0.5 text-slate-900">{variantLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-slate-500">Mapping status</dt>
                  <dd className="mt-0.5">
                    {detail.entry.verified ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">Verified mapping</span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800" title={`Source: ${detail.entry.sources.join(", ")}`}>
                        Single documented source
                      </span>
                    )}
                  </dd>
                </div>
                {detail.alternatives.length > 0 && (
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="font-semibold text-slate-500">Decode note</dt>
                    <dd className="mt-0.5 text-slate-700">
                      This symbol is also the approximation for {detail.alternatives.join(", ")} — when decoding,
                      <strong> {detail.entry.char}</strong> is preferred.
                    </dd>
                  </div>
                )}
              </dl>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
