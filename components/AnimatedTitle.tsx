import type { CSSProperties } from "react";

interface Props {
  /** Full title text, e.g. "Gaster Translator". */
  text: string;
  /** Seconds before the first letter starts. */
  delayBase?: number;
  /** Seconds between consecutive letters. */
  stagger?: number;
}

/**
 * Renders a title as per-letter spans with the homepage rope/jerk effect:
 * each letter snaps (jerk-wave) in sequence, left to right, over a flowing
 * spectrum gradient that stays continuous across the letters.
 *
 * The parent h1 should carry aria-label={text} for screen readers; the
 * individual letters are aria-hidden.
 */
export default function AnimatedTitle({ text, delayBase = 0.4, stagger = 0.035 }: Props) {
  const n = text.replace(/ /g, "").length;
  const words: { word: string; start: number }[] = [];
  let pos = 0;
  for (const w of text.split(" ")) {
    words.push({ word: w, start: pos });
    pos += w.length + 1; // +1 for the space, so --i matches the full string
  }
  return (
    <>
      {words.map(({ word, start }, wi) => (
        <span key={wi} className="inline-block whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="animate-letter-jerk text-gradient-flow-letter"
              style={
                {
                  "--i": start + i,
                  "--n": n,
                  backgroundSize: `${n * 300}% auto`,
                  animationDelay: `${delayBase + (start + i) * stagger}s`,
                } as CSSProperties
              }
            >
              {ch}
            </span>
          ))}
          {wi < words.length - 1 ? " " : null}
        </span>
      ))}
    </>
  );
}
