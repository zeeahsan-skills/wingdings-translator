"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_NAME } from "@/lib/site";
import ThemeToggle from "./ThemeToggle";

const NAV = [
  { href: "/", label: "Translator" },
  { href: "/#batch", label: "Batch" },
  { href: "/#symbols", label: "Symbol reference" },
  { href: "/#compatibility", label: "Compatibility" },
  { href: "/#faq", label: "FAQ" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/70 bg-black/75 shadow-[0_8px_30px_-12px_rgba(99,102,241,0.35)] backdrop-blur-xl">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
          <Image
            key={pathname}
            src="/logo.png"
            alt="Wingdings Translator logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl shadow-sm animate-logo-entrance"
            priority
          />
          <span className="text-lg font-bold tracking-tight" aria-label={SITE_NAME} role="text">
            {SITE_NAME.split("").map((ch, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="animate-letter-flip"
                style={{
                  animationDelay: `${0.7 + i * 0.05}s`,
                  backgroundImage:
                    "linear-gradient(to right, #4338ca, #7c3aed, #a21caf)",
                  backgroundSize: "2000% 100%",
                  backgroundPosition: `${(i / (SITE_NAME.length - 1)) * 100}% 0`,
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {ch === " " ? "\u00A0" : ch}
              </span>
            ))}
          </span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 transition hover:bg-indigo-500/10 hover:text-zinc-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link
            href="/#translator"
            className="rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:from-indigo-700 hover:to-violet-700 md:hidden"
          >
            Open tool
          </Link>
        </div>
      </div>
      <nav aria-label="Primary mobile" className="flex gap-1 overflow-x-auto border-t border-zinc-800 px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-zinc-400 hover:bg-zinc-800"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
