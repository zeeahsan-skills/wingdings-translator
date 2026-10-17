"use client";

import { useEffect, useMemo, useState } from "react";
import { VARIANTS, getVariant, type SymbolEntry, type VariantId } from "@/lib/wingdings-maps";

/** A quiz question: guess which key produces the shown symbol. */
interface Question {
  entry: SymbolEntry;
  options: string[];
}

function isQuizChar(ch: string): boolean {
  return /^[A-Za-z0-9]$/.test(ch);
}

function makeQuestion(variant: VariantId, avoid?: SymbolEntry): Question {
  const pool = getVariant(variant).entries.filter((e) => isQuizChar(e.char));
  let entry = pool[Math.floor(Math.random() * pool.length)];
  if (avoid && pool.length > 1) {
    while (entry === avoid) entry = pool[Math.floor(Math.random() * pool.length)];
  }
  const distract = new Set<string>();
  while (distract.size < 3 && distract.size < pool.length - 1) {
    const c = pool[Math.floor(Math.random() * pool.length)].char;
    if (c !== entry.char) distract.add(c);
  }
  const options = [...distract, entry.char].sort(() => Math.random() - 0.5);
  return { entry, options };
}

export default function PracticeMode() {
  const [variant, setVariant] = useState<VariantId>("wingdings1");
  // Generated client-side in an effect: Math.random() is not allowed during prerender.
  const [question, setQuestion] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [correct, setCorrect] = useState(0);
  const [total, setTotal] = useState(0);
  const [streak, setStreak] = useState(0);

  useEffect(() => {
    setQuestion(makeQuestion("wingdings1"));
  }, []);

  const variantLabel = useMemo(
    () => VARIANTS.find((v) => v.id === variant)?.label ?? variant,
    [variant]
  );

  function newQuestion(v: VariantId, avoid?: SymbolEntry) {
    setQuestion(makeQuestion(v, avoid));
    setPicked(null);
  }

  function changeVariant(v: VariantId) {
    setVariant(v);
    newQuestion(v);
  }

  function answer(ch: string) {
    if (picked !== null || question === null) return;
    setPicked(ch);
    setTotal((t) => t + 1);
    if (ch === question.entry.char) {
      setCorrect((c) => c + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
    }
  }

  function reset() {
    setCorrect(0);
    setTotal(0);
    setStreak(0);
    if (question) newQuestion(variant);
    else setQuestion(makeQuestion(variant));
  }

  const isRight = question !== null && picked === question.entry.char;

  if (question === null) {
    return (
      <section aria-label="Wingdings practice mode" className="scroll-mt-24">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Practice mode</h2>
        <p className="mt-2 max-w-2xl text-sm text-zinc-400">
          Learning Wingdings for puzzles, worksheets or Undertale lore? Quiz yourself: we show a
          symbol, you pick the key that produces it. Explanations appear after every answer.
        </p>
        <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm" aria-busy="true">
          <p className="text-sm text-zinc-500">Loading your first question…</p>
        </div>
      </section>
    );
  }

  return (
    <section aria-label="Wingdings practice mode" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Practice mode</h2>
      <p className="mt-2 max-w-2xl text-sm text-zinc-400">
        Learning Wingdings for puzzles, worksheets or Undertale lore? Quiz yourself: we show a
        symbol, you pick the key that produces it. Explanations appear after every answer.
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
        <div className="flex flex-wrap items-center gap-3">
          <label htmlFor="practice-variant" className="text-sm font-semibold text-zinc-300">
            Font
          </label>
          <select
            id="practice-variant"
            value={variant}
            onChange={(e) => changeVariant(e.target.value as VariantId)}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-3 py-1.5 text-sm"
          >
            {VARIANTS.map((v) => (
              <option key={v.id} value={v.id}>
                {v.label}
              </option>
            ))}
          </select>
          <div className="ml-auto flex items-center gap-4 text-sm text-zinc-400" aria-live="polite">
            <span>
              Score: <strong className="text-zinc-100">{correct}/{total}</strong>
            </span>
            <span>
              Streak: <strong className="text-zinc-100">{streak}🔥</strong>
            </span>
            <button
              type="button"
              onClick={reset}
              className="rounded-lg border border-zinc-700 px-3 py-1 text-sm hover:bg-zinc-900"
            >
              Reset
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
            Which key makes this symbol in {variantLabel}?
          </p>
          <p className="mt-2 text-7xl" aria-label={`Symbol to identify: ${question.entry.name}`}>
            {question.entry.symbol}
          </p>
        </div>

        <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-2" role="group" aria-label="Answer choices">
          {question.options.map((ch) => {
            const isAnswer = ch === question.entry.char;
            const wasPicked = picked === ch;
            let cls = "border-zinc-700 bg-zinc-900 hover:border-indigo-400 hover:bg-indigo-950";
            if (picked !== null) {
              if (isAnswer) cls = "border-emerald-700 bg-emerald-950 font-bold";
              else if (wasPicked) cls = "border-red-700 bg-red-950";
              else cls = "border-zinc-800 bg-zinc-900 opacity-60";
            }
            return (
              <button
                key={ch}
                type="button"
                disabled={picked !== null}
                onClick={() => answer(ch)}
                className={`rounded-xl border-2 px-4 py-3 text-2xl font-mono transition ${cls}`}
                aria-label={`Key ${ch}`}
              >
                {ch}
              </button>
            );
          })}
        </div>

        {picked !== null && (
          <div
            className={`mx-auto mt-4 max-w-md rounded-xl border p-4 text-sm ${
              isRight ? "border-emerald-800 bg-emerald-950" : "border-amber-800 bg-amber-950"
            }`}
            aria-live="polite"
          >
            <p className="font-bold text-zinc-100">
              {isRight ? "✓ Correct!" : `✗ Not quite — the answer is “${question.entry.char}”.`}
            </p>
            <p className="mt-1 text-zinc-400">
              {question.entry.symbol} = key <strong>{question.entry.char}</strong> ({question.entry.codepoint})
              {" "}in {variantLabel} — “{question.entry.name}”.
            </p>
            <button
              type="button"
              onClick={() => newQuestion(variant, question.entry)}
              className="mt-3 rounded-lg bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
            >
              Next symbol →
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
