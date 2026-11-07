"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { getVariant, type VariantId } from "@/lib/wingdings-maps";
import { copyText } from "@/lib/clipboard";

/* ------------------------------------------------------------------ */
/*  Wingdings image decoder — 100% client-side.                        */
/*                                                                     */
/*  Normal OCR engines are trained on letters, not symbol fonts, so    */
/*  they cannot read Wingdings. Instead this tool cuts the picture     */
/*  into single glyphs and visually matches each one against the       */
/*  site's own character map: every known symbol is rendered on a      */
/*  canvas and compared pixel-by-pixel with the glyph in the image.    */
/*                                                                     */
/*  The same symbol is drawn differently by every device font (Segoe   */
/*  UI Symbol on Windows, Apple Symbols on macOS, Noto/DejaVu on       */
/*  Linux/Android), so templates are rendered under several font       */
/*  stacks and a glyph is matched against all of them — whichever      */
/*  rendering the picture was made with, a close template exists.      */
/*  The image never leaves the visitor's browser.                      */
/* ------------------------------------------------------------------ */

const GRID = 24; // normalised glyph bitmap size (GRID x GRID)
const MIN_CONFIDENCE = 0.5; // below this a match is flagged uncertain
const FONT_STACKS = [
  '"Segoe UI Symbol","Noto Sans Symbols 2","Noto Sans Symbols","Apple Symbols",sans-serif',
  '"DejaVu Sans","Segoe UI Symbol","Noto Sans Symbols",sans-serif',
  '"Noto Sans Symbols","Noto Sans Symbols 2","DejaVu Sans",sans-serif',
  '"Apple Symbols","Segoe UI Symbol","Noto Sans Symbols 2",sans-serif',
];

interface Box {
  x: number;
  y: number;
  w: number;
  h: number;
}

interface Template {
  char: string;
  symbol: string;
  bits: Uint8Array;
  ink: number;
}

interface InkImage {
  data: Uint8ClampedArray; // 1 = ink, 0 = background
  w: number;
  h: number;
}

/** Otsu threshold on a luminance buffer. */
function otsuThreshold(lum: Uint8ClampedArray): number {
  const hist = new Array<number>(256).fill(0);
  for (let i = 0; i < lum.length; i++) hist[lum[i]]++;
  const total = lum.length;
  let sum = 0;
  for (let t = 0; t < 256; t++) sum += t * hist[t];
  let sumB = 0;
  let wB = 0;
  let maxVar = -1;
  let threshold = 127;
  for (let t = 0; t < 256; t++) {
    wB += hist[t];
    if (wB === 0) continue;
    const wF = total - wB;
    if (wF === 0) break;
    sumB += t * hist[t];
    const mB = sumB / wB;
    const mF = (sum - sumB) / wF;
    const between = wB * wF * (mB - mF) * (mB - mF);
    if (between > maxVar) {
      maxVar = between;
      threshold = t;
    }
  }
  return threshold;
}

/** Load an image file into a downscaled, binarised ink map. */
async function loadInkImage(file: Blob): Promise<InkImage> {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    await new Promise<void>((resolve, reject) => {
      img.onload = () => resolve();
      img.onerror = () => reject(new Error("Could not read that image file."));
      img.src = url;
    });
    const MAX_DIM = 1600;
    const scale = Math.min(1, MAX_DIM / Math.max(img.naturalWidth, img.naturalHeight));
    const w = Math.max(1, Math.round(img.naturalWidth * scale));
    const h = Math.max(1, Math.round(img.naturalHeight * scale));
    const canvas = document.createElement("canvas");
    canvas.width = w;
    canvas.height = h;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) throw new Error("Canvas is not available in this browser.");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.drawImage(img, 0, 0, w, h);
    const px = ctx.getImageData(0, 0, w, h).data;
    const lum = new Uint8ClampedArray(w * h);
    for (let i = 0; i < w * h; i++) {
      lum[i] = Math.round(0.299 * px[i * 4] + 0.587 * px[i * 4 + 1] + 0.114 * px[i * 4 + 2]);
    }
    const t = otsuThreshold(lum);
    // Polarity: whichever of dark/light is rarer on the border is the ink.
    let borderDark = 0;
    let borderCount = 0;
    const sampleBorder = (x: number, y: number) => {
      borderCount++;
      if (lum[y * w + x] <= t) borderDark++;
    };
    for (let x = 0; x < w; x += 4) {
      sampleBorder(x, 0);
      sampleBorder(x, h - 1);
    }
    for (let y = 0; y < h; y += 4) {
      sampleBorder(0, y);
      sampleBorder(w - 1, y);
    }
    const inkIsDark = borderDark / Math.max(1, borderCount) < 0.5;
    const data = new Uint8ClampedArray(w * h);
    for (let i = 0; i < w * h; i++) {
      data[i] = inkIsDark ? (lum[i] <= t ? 1 : 0) : (lum[i] > t ? 1 : 0);
    }
    return { data, w, h };
  } finally {
    URL.revokeObjectURL(url);
  }
}

/** Split an ink image into lines of glyph boxes (reading order). */
function segmentGlyphs(img: InkImage): { lines: Box[][] } {
  const { data, w, h } = img;
  const rowHas = new Array<boolean>(h).fill(false);
  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      if (data[y * w + x]) {
        rowHas[y] = true;
        break;
      }
    }
  }
  // Line bands: runs of ink rows, merging tiny gaps (diacritic dots etc.).
  const bands: { y0: number; y1: number }[] = [];
  let y = 0;
  while (y < h) {
    if (!rowHas[y]) {
      y++;
      continue;
    }
    let y1 = y;
    let gap = 0;
    for (let yy = y + 1; yy < h; yy++) {
      if (rowHas[yy]) {
        y1 = yy;
        gap = 0;
      } else {
        gap++;
        if (gap > Math.max(3, Math.round((y1 - y) * 0.25))) break;
      }
    }
    bands.push({ y0: y, y1 });
    y = y1 + 1;
  }

  const lines: Box[][] = [];
  for (const band of bands) {
    const lineH = band.y1 - band.y0 + 1;
    if (lineH < 4) continue;
    const colHas = new Array<boolean>(w).fill(false);
    for (let x = 0; x < w; x++) {
      for (let yy = band.y0; yy <= band.y1; yy++) {
        if (data[yy * w + x]) {
          colHas[x] = true;
          break;
        }
      }
    }
    const runs: { x0: number; x1: number }[] = [];
    let x = 0;
    while (x < w) {
      if (!colHas[x]) {
        x++;
        continue;
      }
      let x1 = x;
      while (x1 + 1 < w && colHas[x1 + 1]) x1++;
      runs.push({ x0: x, x1 });
      x = x1 + 1;
    }
    if (runs.length === 0) continue;
    // Typical glyph width for this line (median run width, capped near line height).
    const widths = runs.map((r) => r.x1 - r.x0 + 1).sort((a, b) => a - b);
    const medianW = widths[Math.floor(widths.length / 2)];
    // Boxes per run, kept aligned with `runs` (null = noise speck, skipped) —
    // alignment matters: a skipped run must not shift the boxes after it.
    const runBoxes: (Box[] | null)[] = runs.map((run) => {
      const runW = run.x1 - run.x0 + 1;
      // Tight vertical extent within the band for this column run.
      let ty0 = band.y1;
      let ty1 = band.y0;
      let inkCount = 0;
      for (let xx = run.x0; xx <= run.x1; xx++) {
        for (let yy = band.y0; yy <= band.y1; yy++) {
          if (data[yy * w + xx]) {
            inkCount++;
            if (yy < ty0) ty0 = yy;
            if (yy > ty1) ty1 = yy;
          }
        }
      }
      if (inkCount < 5) return null; // noise speck
      // Split suspiciously wide runs (touching glyphs) into even parts.
      const parts =
        runW > Math.max(medianW * 1.6, lineH * 1.15)
          ? Math.max(2, Math.round(runW / Math.max(1, medianW)))
          : 1;
      const out: Box[] = [];
      for (let p = 0; p < parts; p++) {
        const px0 = run.x0 + Math.floor((runW * p) / parts);
        const px1 = run.x0 + Math.floor((runW * (p + 1)) / parts) - 1;
        out.push({ x: px0, y: ty0, w: px1 - px0 + 1, h: ty1 - ty0 + 1 });
      }
      return out;
    });
    // Flatten in reading order, remembering the gap before each glyph so
    // word spaces can be restored during decoding.
    const withGaps: (Box & { gapBefore: number })[] = [];
    let prevEnd = -1;
    for (const boxes of runBoxes) {
      if (!boxes) continue;
      for (const box of boxes) {
        const gapBefore = prevEnd < 0 ? 0 : box.x - prevEnd - 1;
        withGaps.push({ ...box, gapBefore });
        prevEnd = box.x + box.w - 1;
      }
    }
    if (withGaps.length === 0) continue;
    lines.push(withGaps as Box[]);
    // Stash gap info on the line array for the decoder step.
    (lines[lines.length - 1] as unknown as { gaps: number[] }).gaps = withGaps.map(
      (b) => b.gapBefore
    );
  }
  return { lines };
}

/** Normalise the ink inside a box onto the GRID x GRID bitmap. */
function normaliseBox(img: InkImage, box: Box): { bits: Uint8Array; ink: number } {
  const bits = new Uint8Array(GRID * GRID);
  const pad = 2;
  const avail = GRID - pad * 2;
  const scale = Math.min(avail / box.w, avail / box.h);
  const dw = Math.max(1, Math.round(box.w * scale));
  const dh = Math.max(1, Math.round(box.h * scale));
  const ox = Math.floor((GRID - dw) / 2);
  const oy = Math.floor((GRID - dh) / 2);
  let ink = 0;
  for (let gy = 0; gy < dh; gy++) {
    for (let gx = 0; gx < dw; gx++) {
      // Area-sample the source box into this grid cell.
      const sx0 = box.x + Math.floor((gx / dw) * box.w);
      const sx1 = Math.max(sx0, box.x + Math.floor(((gx + 1) / dw) * box.w) - 1);
      const sy0 = box.y + Math.floor((gy / dh) * box.h);
      const sy1 = Math.max(sy0, box.y + Math.floor(((gy + 1) / dh) * box.h) - 1);
      let sum = 0;
      let n = 0;
      for (let sy = sy0; sy <= sy1; sy++) {
        for (let sx = sx0; sx <= sx1; sx++) {
          sum += img.data[sy * img.w + sx];
          n++;
        }
      }
      if (n > 0 && sum / n >= 0.4) {
        bits[(oy + gy) * GRID + (ox + gx)] = 1;
        ink++;
      }
    }
  }
  return { bits, ink };
}

/**
 * Render every symbol of a variant as template bitmaps — one per font
 * stack, so the same symbol is on file in its Windows, macOS and
 * Linux/Android shapes. Duplicate bitmaps (stacks that fall back to the
 * same font) are kept only once.
 */
async function buildTemplates(variantId: VariantId): Promise<Template[]> {
  await document.fonts.ready;
  const variant = getVariant(variantId);
  const size = 96;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillStyle = "#000000";
  const templates: Template[] = [];
  const seenSymbols = new Set<string>();
  for (const entry of variant.entries) {
    // Identical symbols decode ambiguously; the first key wins (documented
    // priority, same order as the site's text decoder).
    if (seenSymbols.has(entry.symbol)) continue;
    seenSymbols.add(entry.symbol);
    const seenBitmaps = new Set<string>();
    for (const stack of FONT_STACKS) {
      ctx.font = `72px ${stack}`;
      ctx.clearRect(0, 0, size, size);
      ctx.fillText(entry.symbol, size / 2, size / 2 + 4);
      const px = ctx.getImageData(0, 0, size, size).data;
      const data = new Uint8ClampedArray(size * size);
      let minX = size;
      let minY = size;
      let maxX = -1;
      let maxY = -1;
      for (let i = 0; i < size * size; i++) {
        const on = px[i * 4 + 3] > 110 ? 1 : 0;
        data[i] = on;
        if (on) {
          const xx = i % size;
          const yy = Math.floor(i / size);
          if (xx < minX) minX = xx;
          if (xx > maxX) maxX = xx;
          if (yy < minY) minY = yy;
          if (yy > maxY) maxY = yy;
        }
      }
      if (maxX < 0) continue; // this stack's fonts cannot draw the symbol
      const img: InkImage = { data, w: size, h: size };
      const { bits, ink } = normaliseBox(img, {
        x: minX,
        y: minY,
        w: maxX - minX + 1,
        h: maxY - minY + 1,
      });
      if (ink === 0) continue;
      const key = bits.join(",");
      if (seenBitmaps.has(key)) continue;
      seenBitmaps.add(key);
      templates.push({ char: entry.char, symbol: entry.symbol, bits, ink });
    }
  }
  return templates;
}

/** F1 overlap score between two bitmaps, best over ±1px shifts. */
function matchScore(a: Uint8Array, aInk: number, b: Uint8Array, bInk: number): number {
  let best = 0;
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      let inter = 0;
      for (let yy = 0; yy < GRID; yy++) {
        const by = yy + dy;
        if (by < 0 || by >= GRID) continue;
        for (let xx = 0; xx < GRID; xx++) {
          const bx = xx + dx;
          if (bx < 0 || bx >= GRID) continue;
          if (a[yy * GRID + xx] && b[by * GRID + bx]) inter++;
        }
      }
      const f1 = (2 * inter) / Math.max(1, aInk + bInk);
      if (f1 > best) best = f1;
    }
  }
  return best;
}

interface DecodeOutcome {
  text: string;
  glyphCount: number;
  uncertain: number;
}

async function decodeImage(file: Blob, variantId: VariantId): Promise<DecodeOutcome> {
  const [img, templates] = await Promise.all([
    loadInkImage(file),
    buildTemplates(variantId),
  ]);
  if (templates.length === 0) {
    throw new Error("This browser could not render the symbol templates.");
  }
  const { lines } = segmentGlyphs(img);
  const outLines: string[] = [];
  let glyphCount = 0;
  let uncertain = 0;
  for (const line of lines) {
    const gaps = (line as unknown as { gaps?: number[] }).gaps ?? [];
    // Median glyph width on this line drives the space threshold.
    const widths = line.map((b) => b.w).sort((a, b) => a - b);
    const medianW = widths.length ? widths[Math.floor(widths.length / 2)] : 0;
    let text = "";
    line.forEach((box, i) => {
      if (i > 0 && gaps[i] > Math.max(3, medianW * 0.45)) text += " ";
      const { bits, ink } = normaliseBox(img, box);
      if (ink === 0) return;
      glyphCount++;
      let bestChar = "?";
      let bestScore = -1;
      for (const t of templates) {
        const s = matchScore(bits, ink, t.bits, t.ink);
        if (s > bestScore) {
          bestScore = s;
          bestChar = t.char;
        }
      }
      if (bestScore < MIN_CONFIDENCE) uncertain++;
      text += bestChar;
    });
    if (text.trim()) outLines.push(text);
  }
  return { text: outLines.join("\n"), glyphCount, uncertain };
}

/* ------------------------------------------------------------------ */

const VARIANT_OPTIONS: { id: VariantId; label: string }[] = [
  { id: "wingdings1", label: "Wingdings 1" },
  { id: "wingdings2", label: "Wingdings 2" },
  { id: "wingdings3", label: "Wingdings 3" },
  { id: "webdings", label: "Webdings" },
];

export default function ImageTranslator() {
  const [variant, setVariant] = useState<VariantId>("wingdings1");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "decoding" | "done" | "error">("idle");
  const [result, setResult] = useState("");
  const [stats, setStats] = useState<{ glyphs: number; uncertain: number } | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<File | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const runDecode = useCallback(async (file: Blob, v: VariantId) => {
    setStatus("decoding");
    setErrorMsg("");
    setCopied(false);
    try {
      const outcome = await decodeImage(file, v);
      if (outcome.glyphCount === 0) {
        setStatus("error");
        setErrorMsg(
          "No symbols were found in that image. Try a clearer screenshot with dark symbols on a plain, light background."
        );
        setStats(null);
        return;
      }
      setResult(outcome.text);
      setStats({ glyphs: outcome.glyphCount, uncertain: outcome.uncertain });
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Decoding failed. Please try another image.");
      setStats(null);
    }
  }, []);

  const handleFile = useCallback(
    (file: File | Blob) => {
      if (file.type && !file.type.startsWith("image/")) {
        setStatus("error");
        setErrorMsg("That file is not an image. Please choose a PNG, JPG or WEBP picture.");
        return;
      }
      const blob = file as Blob;
      fileRef.current = file instanceof File ? file : null;
      setPreviewUrl((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(blob);
      });
      void runDecode(blob, variant);
    },
    [runDecode, variant]
  );

  // Paste an image straight from the clipboard, anywhere on the page.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const item = Array.from(e.clipboardData?.items ?? []).find((i) =>
        i.type.startsWith("image/")
      );
      const file = item?.getAsFile();
      if (file) handleFile(file);
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, [handleFile]);

  // Re-decode the same image when the visitor switches the font.
  const onVariantChange = (v: VariantId) => {
    setVariant(v);
    if (fileRef.current) void runDecode(fileRef.current, v);
    else if (previewUrl) {
      // Pasted images are kept as a blob URL; refetch it as a blob.
      void fetch(previewUrl)
        .then((r) => r.blob())
        .then((b) => runDecode(b, v));
    }
  };

  const onCopy = async () => {
    if (await copyText(result)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const onClear = () => {
    fileRef.current = null;
    setPreviewUrl((old) => {
      if (old) URL.revokeObjectURL(old);
      return null;
    });
    setResult("");
    setStats(null);
    setStatus("idle");
    setErrorMsg("");
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <section aria-label="Wingdings image translator" className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 shadow-sm">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="img-font" className="text-sm font-semibold text-zinc-100">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">1</span>
          Font in the picture
        </label>
        <select
          id="img-font"
          value={variant}
          onChange={(e) => onVariantChange(e.target.value as VariantId)}
          className="rounded-xl border border-zinc-700 bg-black/60 px-3 py-2 text-sm text-zinc-100 focus:border-indigo-500 focus:outline-none"
        >
          {VARIANT_OPTIONS.map((o) => (
            <option key={o.id} value={o.id}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div
        role="button"
        tabIndex={0}
        aria-label="Upload an image of Wingdings symbols"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") inputRef.current?.click();
        }}
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) handleFile(f);
        }}
        className={`mt-5 cursor-pointer rounded-2xl border-2 border-dashed px-6 py-10 text-center transition ${
          dragOver
            ? "border-indigo-400 bg-indigo-500/10"
            : "border-zinc-700 bg-black/60 hover:border-indigo-500/60"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/*"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) handleFile(f);
          }}
        />
        <p className="text-base font-semibold text-zinc-100">
          <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">2</span>
          Drop a picture here, click to choose one, or paste (Ctrl+V)
        </p>
        <p className="mt-2 text-sm text-zinc-400">
          PNG, JPG or WEBP — a screenshot or photo of Wingdings symbols. The picture is decoded
          in your browser and is <strong className="text-zinc-200">never uploaded</strong>.
        </p>
      </div>

      {previewUrl && (
        <div className="mt-5">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={previewUrl}
            alt="Your uploaded Wingdings image"
            className="max-h-64 w-auto max-w-full rounded-xl border border-zinc-800 bg-white object-contain"
          />
        </div>
      )}

      {status === "decoding" && (
        <p className="mt-5 text-sm font-medium text-indigo-300" role="status">
          Decoding symbols…
        </p>
      )}

      {status === "error" && (
        <p className="mt-5 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200" role="alert">
          {errorMsg}
        </p>
      )}

      {status === "done" && (
        <div className="mt-6">
          <label htmlFor="img-result" className="text-sm font-semibold text-zinc-100">
            <span className="mr-2 inline-flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 text-xs font-bold text-white">3</span>
            Decoded text — check it and fix any mistakes
          </label>
          <textarea
            id="img-result"
            value={result}
            onChange={(e) => setResult(e.target.value)}
            rows={Math.min(8, Math.max(2, result.split("\n").length))}
            className="mt-3 w-full rounded-xl border border-zinc-700 bg-black/60 px-4 py-3 text-base text-zinc-100 focus:border-indigo-500 focus:outline-none"
          />
          {stats && (
            <p className="mt-2 text-sm text-zinc-400">
              Read {stats.glyphs} symbol{stats.glyphs === 1 ? "" : "s"}
              {stats.uncertain > 0
                ? ` — ${stats.uncertain} of them were hard to read, so double-check those letters.`
                : " — every symbol matched clearly."}
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={onCopy}
              className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700"
            >
              {copied ? "Copied ✓" : "Copy decoded text"}
            </button>
            <Link
              href="/#translator"
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-200 hover:border-indigo-500/60 hover:text-white"
            >
              Open in the main translator
            </Link>
            <button
              type="button"
              onClick={onClear}
              className="rounded-xl border border-zinc-700 px-4 py-2 text-sm font-semibold text-zinc-400 hover:text-zinc-200"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
