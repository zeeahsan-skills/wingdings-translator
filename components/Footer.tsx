import Link from "next/link";
import { SITE_NAME } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800 bg-navy">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 md:grid-cols-3">
        <div>
          <p className="text-sm font-bold text-zinc-100">{SITE_NAME}</p>
          <p className="mt-2 text-sm text-zinc-400">
            A free, instant Wingdings translator for Wingdings 1, Wingdings 2, Wingdings 3 and Webdings.
            Everything runs in your browser — no sign-up, no uploads.
          </p>
        </div>
        <nav aria-label="Footer">
          <p className="text-sm font-bold text-zinc-100">Pages</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/">Translator</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/gaster-translator/">Gaster translator</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/wingdings-alphabet-chart/">Alphabet chart</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/wingdings-2-translator/">Wingdings 2 translator</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/wingdings-3-translator/">Wingdings 3 translator</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/webdings-translator/">Webdings translator</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/how-to-write-in-wingdings/">How to write in Wingdings</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/#compatibility">Compatibility guide</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/about">About</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/privacy">Privacy</Link></li>
            <li><Link className="text-zinc-400 hover:text-indigo-400" href="/contact">Contact</Link></li>
          </ul>
        </nav>
        <div>
          <p className="text-sm font-bold text-zinc-100">Good to know</p>
          <p className="mt-2 text-sm text-zinc-400">
            Symbols shown are portable Unicode approximations of the original font glyphs,
            not the Microsoft Wingdings fonts themselves. Appearance varies by device and app.
          </p>
        </div>
      </div>
      <div className="border-t border-zinc-800">
        <p className="mx-auto max-w-5xl px-4 py-4 text-xs text-zinc-500">
          © 2026 {SITE_NAME}. Wingdings is a trademark of Microsoft Corporation;
          this is an independent tool and is not affiliated with Microsoft.
        </p>
      </div>
    </footer>
  );
}
