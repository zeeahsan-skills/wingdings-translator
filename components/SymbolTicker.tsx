"use client";

import { useMemo } from "react";
import { VARIANTS } from "@/lib/wingdings-maps";

const PALETTE = ["#818cf8", "#a78bfa", "#e879f9", "#6366f1", "#c4b5fd"];

/**
 * An endless "cipher tape" — a ribbon of real Wingdings glyphs scrolling
 * like a secret message feed. Pure CSS motion, duplicated for a seamless loop.
 */
export default function SymbolTicker({ reverse = false }: { reverse?: boolean }) {
  const glyphs = useMemo(() => {
    const all = VARIANTS.flatMap((v) => v.entries.map((e) => e.symbol));
    const picked: string[] = [];
    const step = Math.max(1, Math.floor(all.length / 48));
    for (let i = 0; i < all.length && picked.length < 48; i += step) picked.push(all[i]);
    return picked;
  }, []);

  const chunk = (hidden: boolean) => (
    <span className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {glyphs.map((g, i) => (
        <span
          key={i}
          className="mx-5 text-2xl sm:text-3xl"
          style={{ color: PALETTE[i % PALETTE.length], opacity: 0.85 }}
        >
          {g}
        </span>
      ))}
    </span>
  );

  return (
    <div className="ticker-fade overflow-hidden" aria-hidden="true">
      <div className={`animate-cipher-marquee flex w-max ${reverse ? "marquee-reverse" : ""}`}>
        {chunk(false)}
        {chunk(true)}
      </div>
    </div>
  );
}
