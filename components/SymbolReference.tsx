"use client";

import { useMemo, useState } from "react";
import { ALL_TAGGED, VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { copyText } from "@/lib/clipboard";

type Filter = VariantId | "all";

export default function SymbolReference({ defaultFilter = "all" }: { defaultFilter?: Filter }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>(defaultFilter);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    // Common words users type that differ from the canonical symbol names.
    const aliases: Record<string, string[]> = {
      checkbox: ["ballot box", "check mark"],
      tick: ["check mark"],
      cross: ["ballot x", "latin cross", "maltese cross"],
      star: ["star"],
      arrow: ["arrow"],
      heart: ["heart"],
      phone: ["telephone"],
      mail: ["envelope", "mailbox"],
      smiley: ["smiling face", "grin"],
    };
    const aliasHits = Object.entries(aliases)
      .filter(([key]) => q.includes(key))
      .flatMap(([, names]) => names);
    return ALL_TAGGED.filter((e) => {
      if (filter !== "all" && e.variantId !== filter) return false;
      if (!q) return true;
      if (aliasHits.some((name) => e.name.includes(name))) return true;
      return (
        e.name.includes(q) ||
        e.char.toLowerCase() === q ||
        e.codepoint.toLowerCase() === q.replace(/^u\+?/, "u+")
      );
    }).slice(0, 400);
  }, [query, filter]);

  async function handleCopy(key: string, symbol: string) {
    const ok = await copyText(symbol);
    if (ok) {
      setCopiedKey(key);
      window.setTimeout(() => setCopiedKey(null), 1300);
    }
  }

  return (
    <section id="symbols" aria-label="Searchable symbol reference" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Symbol reference</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Search every mapped symbol by name — try “arrow”, “heart”, “check”, “star” — or filter
        by font. <strong>Click any card to copy that symbol instantly.</strong>
      </p>

      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:p-6">
        <div className="flex flex-col gap-2 sm:flex-row">
          <label htmlFor="symbol-search" className="sr-only">Search symbols by name</label>
          <input
            id="symbol-search"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search: arrow, check, star, heart…"
            className="w-full rounded-xl border border-zinc-700 px-4 py-2.5 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-800"
          />
          <label htmlFor="symbol-filter" className="sr-only">Filter by font variant</label>
          <select
            id="symbol-filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as Filter)}
            className="rounded-xl border border-zinc-700 px-3 py-2.5 text-sm text-zinc-100 focus:border-indigo-600 focus:outline-none"
          >
            <option value="all">All fonts</option>
            {VARIANTS.map((v) => (
              <option key={v.id} value={v.id}>{v.label}</option>
            ))}
          </select>
        </div>
        <p className="mt-2 text-xs text-zinc-500" aria-live="polite">
          {results.length} symbol{results.length === 1 ? "" : "s"} shown — click a card to copy it.
        </p>

        {results.length === 0 ? (
          <p className="mt-4 rounded-xl bg-zinc-900 p-4 text-sm text-zinc-500">
            No symbols match “{query}”. Try a simpler word like “arrow” or “check”.
          </p>
        ) : (
          <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
            {results.map((e) => {
              const key = `${e.variantId}:${e.char}`;
              const copied = copiedKey === key;
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => handleCopy(key, e.symbol)}
                    aria-label={`Copy ${e.name} symbol, key ${e.char}, ${e.codepoint}`}
                    className={`flex h-full w-full flex-col items-center gap-1 rounded-xl border p-3 text-center transition ${
                      copied
                        ? "border-emerald-700 bg-emerald-950"
                        : "border-zinc-800 bg-zinc-900 hover:border-indigo-400 hover:bg-indigo-950"
                    }`}
                  >
                    <span aria-hidden="true" className="text-3xl leading-none">{e.symbol}</span>
                    <span className="font-mono text-xs font-bold text-zinc-300">
                      key: <kbd className="rounded bg-zinc-800 px-1">{e.char}</kbd>
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500">{e.codepoint}</span>
                    <span className="text-[11px] capitalize leading-tight text-zinc-400">{e.name}</span>
                    <span className="text-[11px] font-semibold text-indigo-400">{e.variantLabel}</span>
                    <span className={`text-[11px] font-bold ${copied ? "text-emerald-400" : "text-zinc-500"}`}>
                      {copied ? "✓ Copied!" : "Click to copy"}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
