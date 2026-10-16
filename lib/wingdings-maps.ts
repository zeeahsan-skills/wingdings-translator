/**
 * Wingdings mapping tables — Unicode approximations of the classic
 * Microsoft symbol fonts, keyed by keyboard character.
 *
 * WHAT THIS IS: factual character-mapping data compiled from published,
 * documented code charts. It is NOT copied prose or design from any site.
 *
 * SOURCES (per-entry provenance is stored in `sources`):
 *   - "brief-mandate": the Wingdings 1 A-Z row required by the project brief
 *     (A->U+270C ... Z->U+25C6). Reproduced EXACTLY.
 *   - "popular-chart": widely published Unicode-approximation chart for
 *     Wingdings 1 (cross-checked between two independent published charts).
 *   - "wikipedia": the documented Unicode code charts in the Wikipedia
 *     articles "Microsoft_Wingdings" (Wingdings 1/2/3) and "Webdings",
 *     which list an explicit Unicode code point per key position.
 *   - "competitor-chart": symbol/key/Unicode rows observed on a live
 *     competitor symbol chart (fetched 2026-10-16); used only as factual
 *     cross-confirmation of individual mappings.
 *
 * VERIFICATION: `verified` is true when an entry is brief-mandated or
 * confirmed by 2+ independent sources. Entries with a single source are
 * kept (they come from a documented chart) but flagged unverified so the
 * QA report can list them honestly. Nothing here is invented.
 *
 * DECODE AMBIGUITY: a few Unicode symbols are the approximation for more
 * than one key (e.g. U+262F yin-yang for both "Y" and "[" in Wingdings 1).
 * lib/translate.ts resolves these with a documented priority and surfaces
 * an ambiguity warning instead of silently guessing.
 */

export type VariantId = "wingdings1" | "wingdings2" | "wingdings3" | "webdings";

export interface SymbolEntry {
  /** keyboard character that produces the symbol */
  char: string;
  /** Unicode approximation of the font glyph */
  symbol: string;
  /** short searchable name, e.g. "arrow", "check mark" */
  name: string;
  /** Unicode code point label, e.g. "U+270C" */
  codepoint: string;
  /** provenance labels, see header */
  sources: string[];
  /** true when brief-mandated or confirmed by 2+ independent sources */
  verified: boolean;
}

export interface VariantInfo {
  id: VariantId;
  label: string;
  short: string;
  description: string;
  entries: SymbolEntry[];
}

/** Compact raw row: [char, symbol, name, codepoint, sourceFlags]
 *  flags: m = brief-mandate, p = popular-chart, w = wikipedia, c = competitor-chart */
type RawEntry = [string, string, string, string, string];

const SOURCE_LABELS: Record<string, string> = {
  m: "brief-mandate",
  p: "popular-chart",
  w: "wikipedia",
  c: "competitor-chart",
};

function buildEntries(raw: RawEntry[]): SymbolEntry[] {
  return raw.map(([char, symbol, name, codepoint, flags]) => ({
    char,
    symbol,
    name,
    codepoint,
    sources: [...flags].map((f) => SOURCE_LABELS[f] ?? f),
    verified: flags.includes("m") || flags.length >= 2,
  }));
}

/* ------------------------------------------------------------------ */
/* Wingdings 1                                                         */
/* ------------------------------------------------------------------ */

const WINGDINGS_1_AZ: RawEntry[] = [
  // Mandated A-Z row — must reproduce exactly.
  ["A", "✌", "victory hand", "U+270C", "m"],
  ["B", "👌", "ok hand", "U+1F44C", "m"],
  ["C", "👍", "thumbs up", "U+1F44D", "m"],
  ["D", "👎", "thumbs down", "U+1F44E", "m"],
  ["E", "☜", "pointing hand left", "U+261C", "m"],
  ["F", "☞", "pointing hand right", "U+261E", "m"],
  ["G", "☝", "pointing hand up", "U+261D", "m"],
  ["H", "☟", "pointing hand down", "U+261F", "m"],
  ["I", "✋", "raised hand", "U+270B", "m"],
  ["J", "☺", "smiling face", "U+263A", "m"],
  ["K", "😐", "neutral face", "U+1F610", "m"],
  ["L", "☹", "frowning face", "U+2639", "m"],
  ["M", "💣", "bomb", "U+1F4A3", "m"],
  ["N", "☠", "skull and crossbones", "U+2620", "m"],
  ["O", "⚐", "white flag", "U+2690", "m"],
  ["P", "☛", "pointing hand right black", "U+261B", "m"],
  ["Q", "✈", "airplane", "U+2708", "m"],
  ["R", "☼", "sun", "U+263C", "m"],
  ["S", "💧", "droplet", "U+1F4A7", "m"],
  ["T", "❄", "snowflake", "U+2744", "m"],
  ["U", "✞", "latin cross", "U+271E", "m"],
  ["V", "✠", "maltese cross", "U+2720", "m"],
  ["W", "✡", "star of david", "U+2721", "m"],
  ["X", "☪", "star and crescent", "U+262A", "m"],
  ["Y", "☯", "yin yang", "U+262F", "m"],
  ["Z", "◆", "black diamond", "U+25C6", "m"],
];

const WINGDINGS_1_LOWER: RawEntry[] = [
  ["a", "♋", "cancer zodiac", "U+264B", "pw"],
  ["b", "♌", "leo zodiac", "U+264C", "pw"],
  ["c", "♍", "virgo zodiac", "U+264D", "pw"],
  ["d", "♎", "libra zodiac", "U+264E", "pw"],
  ["e", "♏", "scorpio zodiac", "U+264F", "pw"],
  ["f", "♐", "sagittarius zodiac", "U+2650", "pw"],
  ["g", "♑", "capricorn zodiac", "U+2651", "pw"],
  ["h", "♒", "aquarius zodiac", "U+2652", "pw"],
  ["i", "♓", "pisces zodiac", "U+2653", "pw"],
  ["j", "♈", "aries zodiac", "U+2648", "p"],
  ["k", "♉", "taurus zodiac", "U+2649", "p"],
  ["l", "●", "black circle", "U+25CF", "pc"],
  ["m", "❍", "shadowed white circle", "U+274D", "p"],
  ["n", "■", "black square", "U+25A0", "pc"],
  ["o", "□", "white square", "U+25A1", "p"],
  ["p", "◻", "white medium square", "U+25FB", "p"],
  ["q", "❑", "ballot box", "U+2751", "w"],
  ["r", "❒", "ballot box with check", "U+2752", "w"],
  ["s", "🞟", "geometric square", "U+1F79F", "w"],
  ["t", "⧫", "black lozenge", "U+29EB", "w"],
  ["u", "◆", "black diamond", "U+25C6", "w"],
  ["v", "❖", "black diamond minus white x", "U+2756", "w"],
  ["w", "🞙", "geometric shape", "U+1F799", "w"],
  ["x", "⌧", "x in rectangle box", "U+2327", "w"],
  ["y", "⮹", "arrow to bar", "U+2BB9", "w"],
  ["z", "⌘", "place of interest sign", "U+2318", "w"],
];

const WINGDINGS_1_DIGITS: RawEntry[] = [
  ["0", "📁", "file folder", "U+1F4C1", "p"],
  ["1", "📂", "open file folder", "U+1F4C2", "p"],
  ["2", "📄", "page facing up", "U+1F4C4", "p"],
  ["3", "🗏", "document", "U+1F5CF", "pw"],
  ["4", "🗐", "document", "U+1F5D0", "pw"],
  ["5", "🗄", "file cabinet", "U+1F5C4", "pw"],
  ["6", "⌛", "hourglass", "U+231B", "pc"],
  ["7", "🖮", "document icon", "U+1F5AE", "w"],
  ["8", "🖰", "document icon", "U+1F5B0", "w"],
  ["9", "🖲", "document icon", "U+1F5B2", "w"],
];

const WINGDINGS_1_PUNCT: RawEntry[] = [
  ["!", "✏", "pencil", "U+270F", "pc"],
  ['"', "✂", "scissors", "U+2702", "pcw"],
  ["#", "✁", "scissors upper blade", "U+2701", "pw"],
  ["$", "👓", "glasses", "U+1F453", "pw"],
  ["%", "🕭", "bell", "U+1F56D", "pw"],
  ["&", "🕮", "book", "U+1F56E", "pw"],
  ["'", "🕯", "candle", "U+1F56F", "w"],
  ["(", "☎", "telephone", "U+260E", "c"],
  [")", "✆", "telephone", "U+2706", "w"],
  ["*", "🖂", "page icon", "U+1F582", "w"],
  ["+", "🖃", "page icon", "U+1F583", "w"],
  [",", "📪", "mailbox", "U+1F4EA", "w"],
  ["-", "📫", "mailbox", "U+1F4EB", "w"],
  [".", "📬", "mailbox", "U+1F4EC", "w"],
  ["/", "📭", "mailbox", "U+1F4ED", "w"],
  [":", "🖳", "document icon", "U+1F5B3", "w"],
  [";", "🖴", "document icon", "U+1F5B4", "w"],
  ["<", "🖫", "document icon", "U+1F5AB", "w"],
  ["=", "🖬", "document icon", "U+1F5AC", "w"],
  [">", "✇", "tape drive", "U+2707", "w"],
  ["?", "✍", "writing hand", "U+270D", "w"],
  ["@", "🖎", "pencil", "U+1F58E", "w"],
  ["[", "☯", "yin yang", "U+262F", "cw"],
  ["\\", "🕉", "om symbol", "U+1F549", "w"],
  ["]", "☸", "wheel of dharma", "U+2638", "w"],
  ["^", "♈", "aries zodiac", "U+2648", "w"],
  ["_", "♉", "taurus zodiac", "U+2649", "w"],
  ["`", "♊", "gemini zodiac", "U+264A", "w"],
  ["{", "🏵", "rosette", "U+1F3F5", "w"],
  ["|", "🏶", "building icon", "U+1F3F6", "w"],
  ["}", "🙶", "geometric icon", "U+1F676", "w"],
  ["~", "🙷", "geometric icon", "U+1F677", "w"],
  // Extended Latin keys present in the documented chart / observed charts
  ["«", "★", "black star", "U+2605", "c"],
  ["ü", "✓", "check mark", "U+2713", "c"],
  ["û", "✗", "ballot x", "U+2717", "c"],
  ["þ", "✔", "heavy check mark", "U+2714", "c"],
];

/* ------------------------------------------------------------------ */
/* Wingdings 2 — stationery, hands, circled numbers (Wikipedia chart)  */
/* ------------------------------------------------------------------ */

const WINGDINGS_2: RawEntry[] = [
  ["!", "🖊", "pen", "U+1F58A", "w"],
  ['"', "🖋", "fountain pen", "U+1F58B", "w"],
  ["#", "🖌", "paintbrush", "U+1F58C", "w"],
  ["$", "🖍", "crayon", "U+1F58D", "w"],
  ["%", "✄", "scissors", "U+2704", "w"],
  ["&", "✀", "scissors", "U+2700", "w"],
  ["'", "🕾", "telephone", "U+1F57E", "w"],
  ["(", "🕽", "telephone", "U+1F57D", "w"],
  [")", "🗅", "page icon", "U+1F5C5", "w"],
  ["*", "🗆", "page icon", "U+1F5C6", "w"],
  ["+", "🗇", "page icon", "U+1F5C7", "w"],
  [",", "🗈", "page icon", "U+1F5C8", "w"],
  ["-", "🗉", "page icon", "U+1F5C9", "w"],
  [".", "🗊", "page icon", "U+1F5CA", "w"],
  ["/", "🗋", "page icon", "U+1F5CB", "w"],
  ["0", "🗌", "page icon", "U+1F5CC", "w"],
  ["1", "🗍", "page icon", "U+1F5CD", "w"],
  ["2", "📋", "clipboard", "U+1F4CB", "w"],
  ["3", "🗑", "wastebasket", "U+1F5D1", "w"],
  ["4", "🗔", "page icon", "U+1F5D4", "w"],
  ["5", "🖵", "page icon", "U+1F5B5", "w"],
  ["6", "🖶", "page icon", "U+1F5B6", "w"],
  ["7", "🖷", "page icon", "U+1F5B7", "w"],
  ["8", "🖸", "page icon", "U+1F5B8", "w"],
  ["9", "🖭", "page icon", "U+1F5AD", "w"],
  [":", "🖯", "page icon", "U+1F5AF", "w"],
  [";", "🖱", "computer mouse", "U+1F5B1", "w"],
  ["<", "🖒", "hand gesture", "U+1F592", "w"],
  ["=", "🖓", "hand gesture", "U+1F593", "w"],
  [">", "🖘", "hand gesture", "U+1F598", "w"],
  ["?", "🖙", "hand gesture", "U+1F599", "w"],
  ["@", "🖚", "hand gesture", "U+1F59A", "w"],
  ["A", "🖛", "hand gesture", "U+1F59B", "w"],
  ["B", "👈", "pointing left", "U+1F448", "w"],
  ["C", "👉", "pointing right", "U+1F449", "w"],
  ["D", "🖜", "hand gesture", "U+1F59C", "w"],
  ["E", "🖝", "hand gesture", "U+1F59D", "w"],
  ["F", "🖞", "hand gesture", "U+1F59E", "w"],
  ["G", "🖟", "hand gesture", "U+1F59F", "w"],
  ["H", "🖠", "hand gesture", "U+1F5A0", "w"],
  ["I", "🖡", "hand gesture", "U+1F5A1", "w"],
  ["J", "👆", "pointing up", "U+1F446", "w"],
  ["K", "👇", "pointing down", "U+1F447", "w"],
  ["L", "🖢", "hand gesture", "U+1F5A2", "w"],
  ["M", "🖣", "hand gesture", "U+1F5A3", "w"],
  ["N", "🖑", "hand gesture", "U+1F591", "w"],
  ["O", "🗴", "ballot box check", "U+1F5F4", "w"],
  ["P", "🗸", "check mark", "U+1F5F8", "w"],
  ["Q", "🗵", "ballot box check", "U+1F5F5", "w"],
  ["R", "☑", "ballot box check", "U+2611", "w"],
  ["S", "⮽", "ballot", "U+2BBD", "w"],
  ["T", "☒", "ballot box x", "U+2612", "w"],
  ["U", "⮾", "ballot", "U+2BBE", "w"],
  ["V", "⮿", "ballot", "U+2BBF", "w"],
  ["W", "🛇", "prohibited", "U+1F6C7", "w"],
  ["X", "⦸", "circled slash", "U+29B8", "w"],
  ["Y", "🙱", "geometric icon", "U+1F671", "w"],
  ["Z", "🙴", "geometric icon", "U+1F674", "w"],
  ["[", "🙲", "geometric icon", "U+1F672", "w"],
  ["\\", "🙳", "geometric icon", "U+1F673", "w"],
  ["]", "‽", "interrobang", "U+203D", "w"],
  ["^", "🙹", "geometric icon", "U+1F679", "w"],
  ["_", "🙺", "geometric icon", "U+1F67A", "w"],
  ["`", "🙻", "geometric icon", "U+1F67B", "w"],
  ["a", "🙦", "geometric icon", "U+1F666", "w"],
  ["b", "🙤", "geometric icon", "U+1F664", "w"],
  ["c", "🙥", "geometric icon", "U+1F665", "w"],
  ["d", "🙧", "geometric icon", "U+1F667", "w"],
  ["e", "🙚", "geometric icon", "U+1F65A", "w"],
  // U+1F658: code point listed by the documented chart; render support varies.
  ["f", "\u{1F658}", "geometric icon", "U+1F658", "w"],
  ["g", "🙙", "geometric icon", "U+1F659", "w"],
  ["h", "🙛", "geometric icon", "U+1F65B", "w"],
  ["i", "⓪", "circled zero", "U+24EA", "w"],
  ["j", "①", "circled one", "U+2460", "w"],
  ["k", "②", "circled two", "U+2461", "w"],
  ["l", "③", "circled three", "U+2462", "w"],
  ["m", "④", "circled four", "U+2463", "w"],
  ["n", "⑤", "circled five", "U+2464", "w"],
  ["o", "⑥", "circled six", "U+2465", "w"],
  ["p", "⑦", "circled seven", "U+2466", "w"],
  ["q", "⑧", "circled eight", "U+2467", "w"],
  ["r", "⑨", "circled nine", "U+2468", "w"],
  ["s", "⑩", "circled ten", "U+2469", "w"],
  ["t", "⓿", "circled zero", "U+24FF", "w"],
  ["u", "❶", "circled one", "U+2776", "w"],
  ["v", "❷", "circled two", "U+2777", "w"],
  ["w", "❸", "circled three", "U+2778", "w"],
  ["x", "❹", "circled four", "U+2779", "w"],
  ["y", "❺", "circled five", "U+277A", "w"],
  ["z", "❻", "circled six", "U+277B", "w"],
  ["{", "❼", "circled seven", "U+277C", "w"],
  ["|", "❽", "circled eight", "U+277D", "w"],
  ["}", "❾", "circled nine", "U+277E", "w"],
  ["~", "❿", "circled ten", "U+277F", "w"],
];

/* ------------------------------------------------------------------ */
/* Wingdings 3 — almost entirely arrows (Wikipedia chart)               */
/* ------------------------------------------------------------------ */

const WINGDINGS_3: RawEntry[] = [
  ["!", "⭠", "leftwards arrow", "U+2B60", "w"],
  ['"', "⭢", "rightwards arrow", "U+2B62", "w"],
  ["#", "⭡", "upwards arrow", "U+2B61", "w"],
  ["$", "⭣", "downwards arrow", "U+2B63", "w"],
  ["%", "⭦", "arrow", "U+2B66", "w"],
  ["&", "⭧", "arrow", "U+2B67", "w"],
  ["'", "⭩", "arrow", "U+2B69", "w"],
  ["(", "⭨", "arrow", "U+2B68", "w"],
  [")", "⭰", "arrow", "U+2B70", "w"],
  ["*", "⭲", "arrow", "U+2B72", "w"],
  ["+", "⭱", "arrow", "U+2B71", "w"],
  [",", "⭳", "arrow", "U+2B73", "w"],
  ["-", "⭶", "arrow", "U+2B76", "w"],
  [".", "⭸", "arrow", "U+2B78", "w"],
  ["/", "⭻", "arrow", "U+2B7B", "w"],
  ["0", "⭽", "arrow", "U+2B7D", "w"],
  ["1", "⭤", "arrow", "U+2B64", "w"],
  ["2", "⭥", "arrow", "U+2B65", "w"],
  ["3", "⭪", "arrow", "U+2B6A", "w"],
  ["4", "⭬", "arrow", "U+2B6C", "w"],
  ["5", "⭫", "arrow", "U+2B6B", "w"],
  ["6", "⭭", "arrow", "U+2B6D", "w"],
  ["7", "⭍", "arrow", "U+2B4D", "w"],
  ["8", "⮠", "arrow", "U+2BA0", "w"],
  ["9", "⮡", "arrow", "U+2BA1", "w"],
  [":", "⮢", "arrow", "U+2BA2", "w"],
  [";", "⮣", "arrow", "U+2BA3", "w"],
  ["<", "⮤", "arrow", "U+2BA4", "w"],
  ["=", "⮥", "arrow", "U+2BA5", "w"],
  [">", "⮦", "arrow", "U+2BA6", "w"],
  ["?", "⮧", "arrow", "U+2BA7", "w"],
  ["@", "⮐", "arrow", "U+2B90", "w"],
  ["A", "⮑", "arrow", "U+2B91", "w"],
  ["B", "⮒", "arrow", "U+2B92", "w"],
  ["C", "⮓", "arrow", "U+2B93", "w"],
  ["D", "⮀", "arrow", "U+2B80", "w"],
  ["E", "⮃", "arrow", "U+2B83", "w"],
  ["F", "⭾", "arrow", "U+2B7E", "w"],
  ["G", "⭿", "arrow", "U+2B7F", "w"],
  ["H", "⮄", "arrow", "U+2B84", "w"],
  ["I", "⮆", "arrow", "U+2B86", "w"],
  ["J", "⮅", "arrow", "U+2B85", "w"],
  ["K", "⮇", "arrow", "U+2B87", "w"],
  ["L", "⮏", "arrow", "U+2B8F", "w"],
  ["M", "⮍", "arrow", "U+2B8D", "w"],
  ["N", "⮎", "arrow", "U+2B8E", "w"],
  ["O", "⮌", "arrow", "U+2B8C", "w"],
  ["P", "⭮", "arrow", "U+2B6E", "w"],
  ["Q", "⭯", "arrow", "U+2B6F", "w"],
  ["R", "⎋", "escape key", "U+238B", "w"],
  ["S", "⌤", "enter key", "U+2324", "w"],
  ["T", "⌃", "control key", "U+2303", "w"],
  ["U", "⌥", "option key", "U+2325", "w"],
  ["V", "␣", "space symbol", "U+2423", "w"],
  ["W", "⍽", "open box", "U+237D", "w"],
  ["X", "⇪", "caps lock", "U+21EA", "w"],
  ["Y", "⮸", "arrow", "U+2BB8", "w"],
  ["Z", "🢠", "arrow", "U+1F8A0", "w"],
  ["[", "🢡", "arrow", "U+1F8A1", "w"],
  ["\\", "🢢", "arrow", "U+1F8A2", "w"],
  ["]", "🢣", "arrow", "U+1F8A3", "w"],
  ["^", "🢤", "arrow", "U+1F8A4", "w"],
  ["_", "🢥", "arrow", "U+1F8A5", "w"],
  ["`", "🢦", "arrow", "U+1F8A6", "w"],
  ["a", "🢧", "arrow", "U+1F8A7", "w"],
  ["b", "🢨", "arrow", "U+1F8A8", "w"],
  ["c", "🢩", "arrow", "U+1F8A9", "w"],
  ["d", "🢪", "arrow", "U+1F8AA", "w"],
  ["e", "🢫", "arrow", "U+1F8AB", "w"],
  ["f", "🡐", "arrow", "U+1F850", "w"],
  ["g", "🡒", "arrow", "U+1F852", "w"],
  ["h", "🡑", "arrow", "U+1F851", "w"],
  ["i", "🡓", "arrow", "U+1F853", "w"],
  ["j", "🡔", "arrow", "U+1F854", "w"],
  ["k", "🡕", "arrow", "U+1F855", "w"],
  ["l", "🡗", "arrow", "U+1F857", "w"],
  ["m", "🡖", "arrow", "U+1F856", "w"],
  ["n", "🡘", "arrow", "U+1F858", "w"],
  ["o", "🡙", "arrow", "U+1F859", "w"],
  ["p", "▲", "up triangle", "U+25B2", "w"],
  ["q", "▼", "down triangle", "U+25BC", "w"],
  ["r", "△", "triangle", "U+25B3", "w"],
  ["s", "▽", "triangle", "U+25BD", "w"],
  ["t", "◀", "left triangle", "U+25C0", "w"],
  ["u", "▶", "right triangle", "U+25B6", "w"],
  ["v", "◁", "triangle", "U+25C1", "w"],
  ["w", "▷", "triangle", "U+25B7", "w"],
  ["x", "◣", "triangle", "U+25E3", "w"],
  ["y", "◢", "triangle", "U+25E2", "w"],
  ["z", "◤", "triangle", "U+25E4", "w"],
  ["{", "◥", "triangle", "U+25E5", "w"],
  ["|", "🞀", "geometric shape", "U+1F780", "w"],
  ["}", "🞂", "geometric shape", "U+1F782", "w"],
  ["~", "🞁", "geometric shape", "U+1F781", "w"],
];

/* ------------------------------------------------------------------ */
/* Webdings — web/interface pictograms (Wikipedia chart)                */
/* ------------------------------------------------------------------ */

const WEBDINGS: RawEntry[] = [
  ["!", "🕷", "spider", "U+1F577", "w"],
  ['"', "🕸", "spider web", "U+1F578", "w"],
  ["#", "🕲", "paw prints", "U+1F572", "w"],
  ["$", "🕶", "sunglasses", "U+1F576", "w"],
  ["%", "🏆", "trophy", "U+1F3C6", "w"],
  ["&", "🎖", "medal", "U+1F396", "w"],
  ["'", "🖇", "paperclips", "U+1F587", "w"],
  ["(", "🗨", "speech bubble", "U+1F5E8", "w"],
  [")", "🗩", "speech bubble", "U+1F5E9", "w"],
  ["*", "🗰", "dialog icon", "U+1F5F0", "w"],
  ["+", "🗱", "dialog icon", "U+1F5F1", "w"],
  [",", "🌶", "hot pepper", "U+1F336", "w"],
  ["-", "🎗", "ribbon", "U+1F397", "w"],
  [".", "🙾", "geometric icon", "U+1F67E", "w"],
  ["/", "🙼", "geometric icon", "U+1F67C", "w"],
  ["0", "🗕", "page icon", "U+1F5D5", "w"],
  ["1", "🗖", "page icon", "U+1F5D6", "w"],
  ["2", "🗗", "page icon", "U+1F5D7", "w"],
  ["3", "⏴", "reverse", "U+23F4", "w"],
  ["4", "⏵", "play", "U+23F5", "w"],
  ["5", "⏶", "media icon", "U+23F6", "w"],
  ["6", "⏷", "media icon", "U+23F7", "w"],
  ["7", "⏪", "rewind", "U+23EA", "w"],
  ["8", "⏩", "fast forward", "U+23E9", "w"],
  ["9", "⏮", "previous track", "U+23EE", "w"],
  [":", "⏭", "next track", "U+23ED", "w"],
  [";", "⏸", "pause", "U+23F8", "w"],
  ["<", "⏹", "stop", "U+23F9", "w"],
  ["=", "⏺", "record", "U+23FA", "w"],
  [">", "🗚", "page icon", "U+1F5DA", "w"],
  ["?", "🗳", "ballot box", "U+1F5F3", "w"],
  ["@", "🛠", "hammer and wrench", "U+1F6E0", "w"],
  ["A", "🏗", "building construction", "U+1F3D7", "pw"],
  ["B", "🏘", "houses", "U+1F3D8", "w"],
  ["C", "🏙", "cityscape", "U+1F3D9", "pw"],
  ["D", "🏚", "derelict house", "U+1F3DA", "pw"],
  ["E", "🏜", "desert", "U+1F3DC", "w"],
  ["F", "🏭", "factory", "U+1F3ED", "pw"],
  ["G", "🏛", "classical building", "U+1F3DB", "w"],
  ["H", "🏠", "house", "U+1F3E0", "w"],
  ["I", "🏖", "beach", "U+1F3D6", "w"],
  ["J", "🏝", "desert island", "U+1F3DD", "w"],
  ["K", "🛣", "motorway", "U+1F6E3", "w"],
  ["L", "🔍", "magnifying glass", "U+1F50D", "w"],
  ["M", "🏔", "snow-capped mountain", "U+1F3D4", "w"],
  ["N", "👁", "eye", "U+1F441", "w"],
  ["O", "👂", "ear", "U+1F442", "w"],
  ["P", "🏞", "national park", "U+1F3DE", "w"],
  ["Q", "🏕", "camping", "U+1F3D5", "w"],
  ["R", "🛤", "railway track", "U+1F6E4", "w"],
  ["S", "🏟", "stadium", "U+1F3DF", "w"],
  ["T", "🛳", "passenger ship", "U+1F6F3", "w"],
  ["U", "🕬", "alarm icon", "U+1F56C", "w"],
  ["V", "🕫", "alarm icon", "U+1F56B", "w"],
  ["W", "🕨", "alarm icon", "U+1F568", "w"],
  ["X", "🔈", "speaker", "U+1F508", "w"],
  ["Y", "🎔", "media icon", "U+1F394", "w"],
  ["Z", "🎕", "media icon", "U+1F395", "w"],
  ["[", "🗬", "page icon", "U+1F5EC", "w"],
  ["\\", "🙽", "geometric icon", "U+1F67D", "w"],
  ["]", "🗭", "page icon", "U+1F5ED", "w"],
  ["^", "🗪", "page icon", "U+1F5EA", "w"],
  ["_", "🗫", "page icon", "U+1F5EB", "w"],
  ["`", "⮔", "geometric icon", "U+2B94", "w"],
  ["a", "✔", "check mark", "U+2714", "pw"],
  ["b", "🚲", "bicycle", "U+1F6B2", "pw"],
  ["c", "⬜", "white large square", "U+2B1C", "w"],
  ["d", "🛡", "shield", "U+1F6E1", "pw"],
  ["e", "📦", "package", "U+1F4E6", "pw"],
  ["f", "🛱", "ferry icon", "U+1F6F1", "w"],
  ["g", "⬛", "black large square", "U+2B1B", "w"],
  ["h", "🚑", "ambulance", "U+1F691", "w"],
  ["i", "🛈", "information", "U+1F6C8", "w"],
  ["j", "🛩", "small airplane", "U+1F6E9", "w"],
  ["k", "🛰", "satellite", "U+1F6F0", "w"],
  ["l", "🟈", "geometric icon", "U+1F7C8", "w"],
  ["m", "🕴", "person levitating", "U+1F574", "w"],
  ["n", "⬤", "black large circle", "U+2B24", "w"],
  ["o", "🛥", "motor boat", "U+1F6E5", "w"],
  ["p", "🚔", "police car", "U+1F694", "w"],
  ["q", "🗘", "page icon", "U+1F5D8", "w"],
  ["r", "🗙", "page icon", "U+1F5D9", "w"],
  ["s", "❓", "question mark", "U+2753", "w"],
  ["t", "🛲", "ferry icon", "U+1F6F2", "w"],
  ["u", "🚇", "metro", "U+1F687", "w"],
  ["v", "🚍", "bus", "U+1F68D", "w"],
  ["w", "⛳", "flag in hole", "U+26F3", "w"],
  ["x", "⦸", "circled slash", "U+29B8", "w"],
  ["y", "⊖", "circled minus", "U+2296", "w"],
  ["z", "🚭", "no smoking", "U+1F6AD", "w"],
  ["{", "🗮", "page icon", "U+1F5EE", "w"],
  ["|", "⏐", "vertical line", "U+23D0", "w"],
  ["}", "🗯", "anger bubble", "U+1F5EF", "w"],
  ["~", "🗲", "lightning icon", "U+1F5F2", "w"],
];

/* ------------------------------------------------------------------ */

export const VARIANTS: VariantInfo[] = [
  {
    id: "wingdings1",
    label: "Wingdings 1",
    short: "W1",
    description: "The original 1990 symbol font — hands, faces, zodiac, office icons and more.",
    entries: buildEntries([...WINGDINGS_1_AZ, ...WINGDINGS_1_LOWER, ...WINGDINGS_1_DIGITS, ...WINGDINGS_1_PUNCT]),
  },
  {
    id: "wingdings2",
    label: "Wingdings 2",
    short: "W2",
    description: "Stationery, hand gestures, ballot boxes and circled numbers.",
    entries: buildEntries(WINGDINGS_2),
  },
  {
    id: "wingdings3",
    label: "Wingdings 3",
    short: "W3",
    description: "Almost entirely arrows, triangles and keyboard key symbols.",
    entries: buildEntries(WINGDINGS_3),
  },
  {
    id: "webdings",
    label: "Webdings",
    short: "WD",
    description: "Web-era pictograms — transport, buildings, media controls, faces.",
    entries: buildEntries(WEBDINGS),
  },
];

export function getVariant(id: VariantId): VariantInfo {
  const v = VARIANTS.find((x) => x.id === id);
  if (!v) throw new Error(`Unknown variant: ${id}`);
  return v;
}

/** Every entry tagged with its variant — used by the searchable reference. */
export interface TaggedEntry extends SymbolEntry {
  variantId: VariantId;
  variantLabel: string;
}

export const ALL_TAGGED: TaggedEntry[] = VARIANTS.flatMap((v) =>
  v.entries.map((e) => ({ ...e, variantId: v.id, variantLabel: v.label }))
);
