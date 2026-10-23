import Link from "next/link";
import AnimatedTitle from "@/components/AnimatedTitle";

/** Branded 404 — renders inside the root layout (header/footer included). */
export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 text-center">
      <p className="text-sm font-bold uppercase tracking-widest text-indigo-400">404</p>
      <h1
        className="font-title mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
        aria-label="Page not found"
      >
        <AnimatedTitle text="Page Not Found" />
      </h1>
      <p className="mx-auto mt-5 max-w-xl leading-relaxed text-zinc-400">
        This page doesn&apos;t exist — it may have been moved, or the symbols got scrambled in
        transit. Head back to the translator or pick a tool below.
      </p>
      <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-indigo-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-500"
        >
          Wingdings Translator
        </Link>
        <Link
          href="/gaster-translator"
          className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-indigo-500 hover:text-indigo-300"
        >
          Gaster Translator
        </Link>
        <Link
          href="/wingdings-alphabet-chart"
          className="rounded-full border border-zinc-700 px-6 py-3 text-sm font-semibold text-zinc-200 transition hover:border-indigo-500 hover:text-indigo-300"
        >
          Wingdings Chart
        </Link>
      </div>
    </div>
  );
}
