"use client";

import { useEffect, useMemo, useRef } from "react";
import { VARIANTS } from "@/lib/wingdings-maps";

const PALETTE = ["#818cf8", "#a78bfa", "#e879f9", "#6366f1", "#c4b5fd", "#f0abfc"];

interface Mote {
  x: number;
  y: number;
  r: number;
  speed: number;
  phase: number;
  sway: number;
  ch: string;
  color: string;
  alpha: number;
  boost: number;
}

/**
 * A living universe of real Wingdings glyphs drifting behind the hero.
 * Symbols near the cursor glow brighter and gently drift away — the page
 * itself demonstrates the product.
 */
export default function SymbolField({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });

  const glyphs = useMemo(() => {
    const all = VARIANTS.flatMap((v) => v.entries.map((e) => e.symbol));
    // Deterministic-ish spread: stride through the list so every font shows up.
    const picked: string[] = [];
    const step = Math.max(1, Math.floor(all.length / 90));
    for (let i = 0; i < all.length && picked.length < 90; i += step) picked.push(all[i]);
    return picked;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(1.5, window.devicePixelRatio || 1);

    const motes: Mote[] = Array.from({ length: 60 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 13 + Math.random() * 26,
      speed: 0.00012 + Math.random() * 0.00045,
      phase: Math.random() * Math.PI * 2,
      sway: 0.008 + Math.random() * 0.02,
      ch: glyphs[i % glyphs.length],
      color: PALETTE[i % PALETTE.length],
      alpha: 0.1 + Math.random() * 0.28,
      boost: 0,
    }));

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas!.width = Math.max(1, Math.floor(w * dpr));
      canvas!.height = Math.max(1, Math.floor(h * dpr));
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);

    function onMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    }
    function onLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);

    let t = 0;
    function frame() {
      t += 1;
      ctx!.clearRect(0, 0, w, h);
      for (const m of motes) {
        if (!reduced) {
          m.y -= m.speed;
          if (m.y < -0.08) {
            m.y = 1.08;
            m.x = Math.random();
          }
        }
        const px = (m.x + Math.sin(t * 0.008 + m.phase) * m.sway) * w;
        const py = m.y * h;

        // Cursor proximity: glow + gentle repel.
        const dx = px - mouse.current.x;
        const dy = py - mouse.current.y;
        const dist = Math.hypot(dx, dy);
        const target = dist < 150 ? 1 - dist / 150 : 0;
        m.boost += (target - m.boost) * 0.08;

        const a = Math.min(0.95, m.alpha + m.boost * 0.75);
        ctx!.globalAlpha = a;
        ctx!.font = `${m.r + m.boost * 10}px "Segoe UI Symbol","Noto Sans Symbols 2","Apple Symbols",serif`;
        ctx!.fillStyle = m.color;
        ctx!.textAlign = "center";
        ctx!.textBaseline = "middle";
        ctx!.fillText(m.ch, px, py);
      }
      ctx!.globalAlpha = 1;
      if (!reduced) raf = requestAnimationFrame(frame);
    }
    frame();
    // Static single render for reduced motion.
    if (reduced) frame();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
    };
  }, [glyphs]);

  return (
    <div className={`symbol-field-wrap pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  );
}
