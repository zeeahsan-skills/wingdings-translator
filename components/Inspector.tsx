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
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Character inspector</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Click any character from the translator input above to see exactly what it becomes:
        the mapped symbol, its Unicode code point, and which font variant produced it — a
        char-by-char breakdown no other translator shows.
      </p>

      {chars.length === 0 ? (
        <p className="mt-4 rounded-xl border border-dashed border-zinc-700 bg-zinc-900 p-4 text-sm text-zinc-500">
          Type something in the translator above and its characters will appear here for inspection.
        </p>
      ) : (
        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:p-6">
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
                    ? "border-transparent bg-gradient-to-br from-indigo-600 to-violet-600 text-white shadow-sm"
                    : "border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-indigo-700 hover:bg-indigo-950"
                }`}
              >
                {ch === " " ? "␣" : ch === "\n" ? "↵" : ch}
              </button>
            ))}
          </div>
          {text.length > MAX_CHIPS && (
            <p className="mt-2 text-xs text-zinc-500">Showing the first {MAX_CHIPS} characters.</p>
          )}

          <div className="mt-4 min-h-32 rounded-xl bg-zinc-900 p-4" aria-live="polite">
            {selectedChar === null || detail === null ? (
              <p className="text-sm text-zinc-500">Select a character above to inspect its mapping.</p>
            ) : (
              <dl className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
                <div>
                  <dt className="font-semibold text-zinc-500">Source character</dt>
                  <dd className="mt-0.5 font-mono text-2xl text-zinc-100">{selectedChar === " " ? "␣ (space)" : selectedChar}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">Mapped symbol</dt>
                  <dd className="mt-0.5 text-2xl text-zinc-100">{detail.entry.symbol}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">Unicode code point</dt>
                  <dd className="mt-0.5 font-mono text-lg text-zinc-100">{detail.entry.codepoint}</dd>
                  <dd className="text-xs text-zinc-500">actual: {formatCodepoint(detail.entry.symbol.codePointAt(0) ?? 0)}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">Symbol name</dt>
                  <dd className="mt-0.5 capitalize text-zinc-100">{detail.entry.name}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">Font variant</dt>
                  <dd className="mt-0.5 text-zinc-100">{variantLabel}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-zinc-500">Mapping status</dt>
                  <dd className="mt-0.5">
                    {detail.entry.verified ? (
                      <span className="rounded-full bg-emerald-900 px-2 py-0.5 text-xs font-semibold text-emerald-300">Verified mapping</span>
                    ) : (
                      <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-200" title={`Source: ${detail.entry.sources.join(", ")}`}>
                        Single documented source
                      </span>
                    )}
                  </dd>
                </div>
                {detail.alternatives.length > 0 && (
                  <div className="col-span-2 sm:col-span-3">
                    <dt className="font-semibold text-zinc-500">Decode note</dt>
                    <dd className="mt-0.5 text-zinc-300">
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
