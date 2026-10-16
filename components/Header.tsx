import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

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
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
          <span aria-hidden="true" className="grid h-9 w-9 place-items-center rounded-xl bg-indigo-600 text-xl text-white">
            ✌
          </span>
          <span className="text-lg font-bold tracking-tight text-slate-900">{SITE_NAME}</span>
        </Link>
        <nav aria-label="Primary" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href + item.label}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/#translator"
          className="rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 md:hidden"
        >
          Open tool
        </Link>
      </div>
      <nav aria-label="Primary mobile" className="flex gap-1 overflow-x-auto border-t border-slate-100 px-4 py-2 md:hidden">
        {NAV.map((item) => (
          <Link
            key={item.href + item.label}
            href={item.href}
            className="whitespace-nowrap rounded-lg px-3 py-1.5 text-sm font-medium text-slate-600 hover:bg-slate-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
