/**
 * Bidirectional translation engine: English <-> Wingdings symbol approximations.
 *
 * - Encoding maps each character to its symbol via the variant table.
 *   Characters with no mapping (and whitespace) pass through unchanged;
 *   non-whitespace unmapped characters are reported as `unsupported`.
 * - Decoding inverts the table. When one symbol is the approximation for
 *   several keys, a priority order picks the preferred decoding and every
 *   ambiguous symbol is reported with its alternatives — never silently.
 * - Iteration is code-point aware (for...of) so surrogate-pair symbols
 *   (e.g. emoji) are never split.
 */
import { getVariant, type VariantId } from "./wingdings-maps";

/** Preferred-decode priority: uppercase letters win over lowercase,
 *  then digits, then punctuation, then extended keys. */
function charPriority(char: string): number {
  if (/^[A-Z]$/.test(char)) return 0;
  if (/^[a-z]$/.test(char)) return 1;
  if (/^[0-9]$/.test(char)) return 2;
  if (/^[\x20-\x7E]$/.test(char)) return 3;
  return 4;
}

const isWhitespace = (ch: string) => /^\s$/.test(ch);

export interface EncodeResult {
  output: string;
  /** distinct non-whitespace characters that have no mapping */
  unsupported: string[];
}

export function encodeText(text: string, variant: VariantId): EncodeResult {
  const table = new Map(getVariant(variant).entries.map((e) => [e.char, e.symbol]));
  const unsupported = new Set<string>();
  let output = "";
  for (const ch of text) {
    const mapped = table.get(ch);
    if (mapped !== undefined) {
      output += mapped;
    } else {
      output += ch;
      if (!isWhitespace(ch)) unsupported.add(ch);
    }
  }
  return { output, unsupported: [...unsupported] };
}

export interface Ambiguity {
  symbol: string;
  chosen: string;
  alternatives: string[];
}

export interface DecodeResult {
  output: string;
  /** symbols that decode from more than one key, with the chosen reading */
  ambiguous: Ambiguity[];
  /** distinct symbols with no mapping at all */
  unmapped: string[];
}

interface ReverseIndex {
  /** symbol -> keys that encode to it, sorted by decode priority */
  map: Map<string, string[]>;
}

const reverseCache = new Map<VariantId, ReverseIndex>();

function getReverse(variant: VariantId): ReverseIndex {
  const cached = reverseCache.get(variant);
  if (cached) return cached;
  const map = new Map<string, string[]>();
  for (const e of getVariant(variant).entries) {
    const list = map.get(e.symbol);
    if (list) {
      if (!list.includes(e.char)) list.push(e.char);
    } else {
      map.set(e.symbol, [e.char]);
    }
  }
  for (const list of map.values()) {
    list.sort((a, b) => charPriority(a) - charPriority(b) || (a < b ? -1 : 1));
  }
  const index = { map };
  reverseCache.set(variant, index);
  return index;
}

export function decodeText(text: string, variant: VariantId): DecodeResult {
  const { map } = getReverse(variant);
  const ambiguous: Ambiguity[] = [];
  const seenAmbiguous = new Set<string>();
  const unmapped = new Set<string>();
  let output = "";
  for (const ch of text) {
    const keys = map.get(ch);
    if (keys && keys.length > 0) {
      output += keys[0];
      if (keys.length > 1 && !seenAmbiguous.has(ch)) {
        seenAmbiguous.add(ch);
        ambiguous.push({ symbol: ch, chosen: keys[0], alternatives: keys.slice(1) });
      }
    } else {
      output += ch;
      if (!isWhitespace(ch)) unmapped.add(ch);
    }
  }
  return { output, ambiguous, unmapped: [...unmapped] };
}

/** Look up one key's mapping details (for the character inspector). */
export function inspectChar(char: string, variant: VariantId) {
  const entry = getVariant(variant).entries.find((e) => e.char === char);
  if (!entry) return null;
  const { map } = getReverse(variant);
  const alternatives = (map.get(entry.symbol) ?? []).filter((k) => k !== char);
  return { entry, alternatives };
}

/** Format a code point number as "U+XXXX". */
export function formatCodepoint(cp: number): string {
  return "U+" + cp.toString(16).toUpperCase().padStart(4, "0");
}
