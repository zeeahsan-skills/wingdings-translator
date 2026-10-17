import Image from "next/image";
import Link from "next/link";
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
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800 bg-black/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
          <Image
            src="/logo.png"
            alt="Wingdings Translator logo"
            width={36}
            height={36}
            className="h-9 w-9 rounded-xl shadow-sm animate-logo-entrance"
            priority
          />
          <span className="bg-gradient-to-r from-indigo-700 via-violet-700 to-fuchsia-700 bg-clip-text text-lg font-bold tracking-tight text-transparent">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
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
