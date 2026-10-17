"use client";

import { useMemo, useState } from "react";
import { VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { encodeText } from "@/lib/translate";
import { copyText } from "@/lib/clipboard";

interface Props {
  text: string;
  setText: (t: string) => void;
  variant: VariantId;
  setVariant: (v: VariantId) => void;
}

export default function Translator({ text, setText, variant, setVariant }: Props) {
  const [copied, setCopied] = useState(false);

  const result = useMemo(() => encodeText(text, variant), [text, variant]);
  const output = result.output;

  const unsupported = result.unsupported;

  const activeVariant = VARIANTS.find((v) => v.id === variant)!;

  async function handleCopy() {
    const ok = await copyText(output);
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    }
  }

  /** Render the result to a PNG image and download it. Useful because some
   *  Unicode symbols render as emoji on phones — an image looks the same
   *  everywhere. */
  function downloadPng() {
    if (!output) return;
    const fontPx = 40;
    const lineHeight = Math.round(fontPx * 1.5);
    const pad = 32;
    const maxWidth = 1600;
    const measurer = document.createElement("canvas").getContext("2d")!;
    measurer.font = `${fontPx}px "Segoe UI Symbol","Noto Sans Symbols 2","Apple Symbols",sans-serif`;
    // Wrap long lines so the image never gets absurdly wide.
    const lines: string[] = [];
    for (const raw of output.split("\n")) {
      let line = raw;
      while (measurer.measureText(line).width > maxWidth - pad * 2 && line.length > 1) {
        let cut = line.length;
        while (cut > 1 && measurer.measureText(line.slice(0, cut)).width > maxWidth - pad * 2) {
          cut = Math.floor(cut * 0.9);
        }
        lines.push(line.slice(0, cut));
        line = line.slice(cut);
      }
      lines.push(line);
    }
    const canvas = document.createElement("canvas");
    canvas.width = maxWidth;
    canvas.height = lines.length * lineHeight + pad * 2;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = measurer.font;
    ctx.fillStyle = "#0f172a";
    ctx.textBaseline = "top";
    lines.forEach((l, i) => ctx.fillText(l, pad, pad + i * lineHeight));
    const a = document.createElement("a");
    a.download = `wingdings-${variant}.png`;
    a.href = canvas.toDataURL("image/png");
    document.body.appendChild(a);
    a.click();
    a.remove();
  }

  return (
    <section id="translator" aria-label="Wingdings translator tool" className="scroll-mt-24">
      <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-4 shadow-sm sm:p-6">
        {/* Variant selector — the 4-way converter is the headline differentiator */}
        <div role="group" aria-label="Choose a symbol font">
          <p className="text-sm font-semibold text-zinc-100">
            <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-sm">1</span>
            Pick a font
          </p>
          <div className="mt-2 grid grid-cols-2 gap-2 lg:grid-cols-4">
            {VARIANTS.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setVariant(v.id)}
                aria-pressed={variant === v.id}
                className={`rounded-xl border p-3 text-left transition ${
                  variant === v.id
                    ? "border-violet-600 bg-gradient-to-br from-indigo-950 to-violet-950 ring-1 ring-violet-600"
                    : "border-zinc-800 bg-zinc-900 hover:border-zinc-700 hover:bg-zinc-900"
                }`}
              >
                <span className="block text-sm font-bold text-zinc-100">{v.label}</span>
                <span className="mt-0.5 block text-xs leading-snug text-zinc-300">{v.description}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {/* Input */}
          <div>
          <label htmlFor="translator-input" className="text-sm font-semibold text-zinc-100">
            <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-sm">2</span>
            Type or paste your text
          </label>
          <textarea
            id="translator-input"
            value={text}
            onChange={(e) => setText(e.target.value)}
            rows={6}
            placeholder="Type English here — symbols appear instantly…"
            className="mt-2 w-full rounded-xl border border-zinc-700 p-3 text-base text-zinc-100 placeholder:text-zinc-500 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-800"
          />
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500">Try:</span>
            {["Hello World!", "I love you", "Secret message"].map((ex) => (
              <button
                key={ex}
                type="button"
                onClick={() => setText(ex)}
                className="rounded-full border border-indigo-800 bg-indigo-950 px-3 py-1 text-xs font-semibold text-indigo-300 hover:bg-indigo-950"
              >
                {ex}
              </button>
            ))}
          </div>
          <p className="mt-1 text-xs text-zinc-500" aria-live="polite">
            {text.length} character{text.length === 1 ? "" : "s"} · converts live as you type
          </p>
        </div>

          {/* Output */}
          <div>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-sm font-semibold text-zinc-100" id="translator-output-label">
              <span className="mr-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-br from-indigo-600 to-violet-600 text-[11px] font-bold text-white shadow-sm">3</span>
              Your result <span className="font-normal text-zinc-500">({activeVariant.label})</span>
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={handleCopy}
                disabled={!output}
                className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 disabled:cursor-not-allowed disabled:bg-zinc-700 disabled:bg-none"
              >
                {copied ? "✓ Copied!" : "⧉ Copy result"}
              </button>
              <button
                type="button"
                onClick={downloadPng}
                disabled={!output}
                className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
                title="Download the result as a PNG image — looks identical on every device"
              >
                ⬇ PNG
              </button>
              <button
                type="button"
                onClick={() => setText("")}
                disabled={!text}
                className="rounded-xl border border-zinc-800 px-4 py-2 text-sm font-semibold text-zinc-300 hover:bg-zinc-900 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Clear
              </button>
            </div>
          </div>
          <div
            role="status"
            aria-labelledby="translator-output-label"
            className="mt-2 min-h-36 whitespace-pre-wrap break-words rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-lg leading-relaxed text-zinc-100"
          >
            {output || <span className="text-zinc-500">Your converted text will appear here…</span>}
          </div>
          </div>
        </div>

        {/* Honest notice — competitors pass these through silently */}
        {unsupported.length > 0 && (
          <p role="alert" className="mt-3 rounded-xl bg-amber-950 px-3 py-2 text-sm text-amber-200">
            These characters have no {activeVariant.label} mapping and were kept as-is:{" "}
            <strong>{unsupported.slice(0, 12).join(" ")}</strong>
            {unsupported.length > 12 && ` (+${unsupported.length - 12} more)`}
          </p>
        )}
      </div>
    </section>
  );
}
