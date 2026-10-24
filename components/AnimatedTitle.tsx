import type { CSSProperties } from "react";

interface Props {
  /** Full title text, e.g. "Gaster Translator". */
  text: string;
  /** Seconds before the first letter starts. */
  delayBase?: number;
  /** Seconds between consecutive letters. */
  stagger?: number;
  /** Narrow-viewport stacking class applied to every word after the first,
      e.g. "max-[420px]:block". Use ONLY on titles whose fallback-font and
      webfont line counts disagree in a measured viewport band (a font-swap
      wrap grows the title by one line and shifts the whole page = CLS):
      the value must be the full literal class for the band's upper edge,
      so that both font states render the same line count there. Without
      this prop the component is byte-for-byte unchanged. */
  stackWordsBelow?: string;
}

/**
 * Renders a title as per-letter spans with the homepage rope/jerk effect:
 * each letter snaps (jerk-wave) in sequence, left to right, over a flowing
 * spectrum gradient that stays continuous across the letters.
 *
 * The parent h1 should carry aria-label={text} for screen readers; the
 * individual letters are aria-hidden.
 */
export default function AnimatedTitle({ text, delayBase = 0.1, stagger = 0.035, stackWordsBelow }: Props) {
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
        <span
          key={wi}
          className={`inline-block whitespace-nowrap${wi > 0 && stackWordsBelow ? ` ${stackWordsBelow}` : ""}`}
        >
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
