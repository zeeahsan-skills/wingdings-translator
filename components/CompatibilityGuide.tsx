const NOTES = [
  {
    title: "Using the real Wingdings font in Word or Excel",
    body: "In Microsoft Word or Excel, type your text normally, select it, then choose “Wingdings” (or Wingdings 2 / 3, Webdings) from the font menu — or insert symbols via Insert → Symbol. The font ships with Microsoft Office and Windows, so on those machines the original glyphs render exactly.",
  },
  {
    title: "Google Docs does not ship the Wingdings font",
    body: "Google Docs does not include Microsoft's proprietary Wingdings fonts, so applying “Wingdings” there is not an option and pasted text will not show the original glyphs. For Docs, use this tool's Unicode approximations instead — they are real characters that paste anywhere.",
  },
  {
    title: "Symbols may render as emoji on phones",
    body: "Many Unicode approximations (like 👍 or 💣) have emoji presentation on iOS and Android, so the same copied text can look like colorful emoji on a phone but like plain dingbats on a desktop. If exact appearance matters, test your message in the destination app before sending.",
  },
  {
    title: "Pasted symbols depend on the destination app",
    body: "Copied symbols are plain Unicode text, so any app can receive them — but each app renders them with its own fonts. A symbol that shows fine in one chat app may appear as a blank box in another if that app's font lacks the character. When in doubt, send a screenshot instead.",
  },
];

export default function CompatibilityGuide() {
  return (
    <section id="compatibility" aria-label="Compatibility guide" className="scroll-mt-24">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-100">Compatibility guide</h2>
      <p className="mt-2 max-w-2xl text-zinc-400">
        Honest notes on where Wingdings text works, where it doesn&apos;t, and why — so you&apos;re
        never surprised after hitting copy.
      </p>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {NOTES.map((n) => (
          <article key={n.title} className="rounded-2xl border border-zinc-800 bg-zinc-900 p-5 shadow-sm">
            <h3 className="text-base font-bold text-zinc-100">{n.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-400">{n.body}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
