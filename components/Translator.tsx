"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { VARIANTS, type VariantId } from "@/lib/wingdings-maps";
import { encodeText } from "@/lib/translate";
import { copyText } from "@/lib/clipboard";

interface Props {
  text: string;
  setText: (t: string) => void;
  variant: VariantId;
  setVariant: (v: VariantId) => void;
}

/** Renders output glyphs so newly arrived characters flip into existence. */
function MorphingOutput({ output }: { output: string }) {
  const prev = useRef("");
  // Characters appended since the last render get the materialize animation.
  const freshFrom = output.startsWith(prev.current) ? prev.current.length : 0;
  useEffect(() => {
    prev.current = output;
  }, [output]);

  if (!output) {
    return (
      <span className="text-zinc-500">
        Your symbols will materialize here…
      </span>
    );
  }
  let n = 0;
  return (
    <>
      {output.split("").map((ch, i) => {
        if (ch === "\n") return <br key={i} />;
        const fresh = i >= freshFrom;
        const k = n++;
        return (
          <span
            key={i}
            className={fresh ? "animate-symbol-pop" : undefined}
            style={fresh ? { animationDelay: `${k * 0.018}s` } : undefined}
          >
            {ch}
          </span>
        );
      })}
    </>
  );
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
      <div className="console-frame">
        <div className="console-body p-4 sm:p-7">
          {/* Console header */}
          <div className="flex items-center justify-between gap-3">
            <p className="font-display flex items-center gap-2.5 text-xs font-bold tracking-[0.22em] text-zinc-400">
              <span className="live-dot relative inline-block h-2 w-2 rounded-full bg-emerald-400" />
              DECODER CONSOLE
            </p>
            <p className="rounded-full border border-violet-500/40 bg-violet-500/10 px-3 py-1 text-xs font-bold text-violet-300">
              {activeVariant.short} · LIVE
            </p>
          </div>

          {/* Glyph dials — pick a font, preview its real symbols */}
          <div role="group" aria-label="Choose a symbol font" className="mt-5">
            <div className="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
              {VARIANTS.map((v) => {
                const active = variant === v.id;
                const preview = v.entries.slice(0, 5).map((e) => e.symbol).join(" ");
                return (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setVariant(v.id)}
                    aria-pressed={active}
                    data-active={active}
                    className="glyph-dial rounded-2xl border border-zinc-800 bg-zinc-900/70 p-3.5 text-left"
                  >
                    <span className="flex items-center justify-between">
                      <span className={`font-display rounded-md px-1.5 py-0.5 text-[11px] font-bold tracking-wider ${active ? "bg-gradient-to-r from-indigo-600 to-violet-600 text-white" : "bg-zinc-800 text-zinc-400"}`}>
                        {v.short}
                      </span>
                      {active && <span className="text-sm text-emerald-400" aria-hidden="true">●</span>}
                    </span>
                    <span className="mt-2 block truncate text-xl leading-none text-zinc-100" aria-hidden="true">
                      {preview}
                    </span>
                    <span className="mt-1.5 block text-sm font-bold text-zinc-100">{v.label}</span>
                    <span className="mt-0.5 line-clamp-2 block text-xs leading-snug text-zinc-500">{v.description}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Console panes */}
          <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-stretch">
            {/* Input */}
            <div className="min-w-0">
              <label htmlFor="translator-input" className="font-display text-xs font-bold tracking-[0.18em] text-zinc-400">
                ⌨ INPUT — PLAIN TEXT
              </label>
              <textarea
                id="translator-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={6}
                placeholder="Type English here — watch it become symbols…"
                className="mt-2.5 w-full resize-y rounded-2xl border border-zinc-800 bg-black/60 p-4 text-base leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
              />
              <div className="mt-2.5 flex flex-wrap items-center gap-2">
                <span className="text-xs font-medium text-zinc-600">Try:</span>
                {["Hello World!", "I love you", "Secret message"].map((ex) => (
                  <button
                    key={ex}
                    type="button"
                    onClick={() => setText(ex)}
                    className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-300 transition hover:border-indigo-400/60 hover:bg-indigo-500/20"
                  >
                    {ex}
                  </button>
                ))}
              </div>
              <p className="mt-1.5 text-xs text-zinc-600" aria-live="polite">
                {text.length} character{text.length === 1 ? "" : "s"} · converts live as you type
              </p>
            </div>

            {/* Data stream divider */}
            <div className="flex items-center justify-center" aria-hidden="true">
              <div className="stream-line h-10 w-0.5 md:h-auto md:w-10 md:self-stretch" />
            </div>

            {/* Output */}
            <div className="min-w-0">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-display text-xs font-bold tracking-[0.18em] text-zinc-400" id="translator-output-label">
                  ✦ OUTPUT — {activeVariant.label.toUpperCase()}
                </p>
              </div>
              <div
                role="status"
                aria-labelledby="translator-output-label"
                className="translator-output mt-2.5 min-h-36 whitespace-pre-wrap break-words rounded-2xl p-4 text-2xl leading-relaxed text-zinc-100"
              >
                <MorphingOutput output={output} />
              </div>
              <div className="mt-2.5 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={handleCopy}
                  disabled={!output}
                  className="rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-fuchsia-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-violet-900/40 transition hover:brightness-110 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:shadow-none"
                >
                  {copied ? "✓ Copied to clipboard!" : "⧉ Copy symbols"}
                </button>
                <button
                  type="button"
                  onClick={downloadPng}
                  disabled={!output}
                  className="rounded-xl border border-zinc-700 bg-zinc-900 px-4 py-2.5 text-sm font-semibold text-zinc-200 transition hover:border-zinc-500 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-40"
                  title="Download the result as a PNG image — looks identical on every device"
                >
                  ⬇ PNG
                </button>
                <button
                  type="button"
                  onClick={() => setText("")}
                  disabled={!text}
                  className="rounded-xl border border-zinc-800 px-4 py-2.5 text-sm font-semibold text-zinc-400 transition hover:border-zinc-600 hover:text-zinc-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>

          {/* Honest notice — competitors pass these through silently */}
          {unsupported.length > 0 && (
            <p role="alert" className="mt-4 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-2.5 text-sm text-amber-200">
              These characters have no {activeVariant.label} mapping and were kept as-is:{" "}
              <strong>{unsupported.slice(0, 12).join(" ")}</strong>
              {unsupported.length > 12 && ` (+${unsupported.length - 12} more)`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
