import type { Metadata } from "next";
import { CONTACT_EMAIL, SITE_NAME } from "@/lib/site";
import BreadcrumbJsonLd from "@/components/BreadcrumbJsonLd";
import AnimatedTitle from "@/components/AnimatedTitle";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${SITE_NAME}: what data is (and isn't) collected.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <BreadcrumbJsonLd trail={[{ name: "Home", path: "/" }, { name: "Privacy Policy", path: "/privacy/" }]} />
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="font-title text-3xl font-extrabold tracking-tight" aria-label="Privacy Policy"><AnimatedTitle text="Privacy Policy" /></h1>
      <p className="mt-2 text-sm text-zinc-500">Last updated: October 2026</p>
      <div className="mt-6 space-y-4 text-zinc-400 leading-relaxed">
        <h2 className="text-xl font-bold text-zinc-100">The short version</h2>
        <p>
          {SITE_NAME} does not collect, store, or transmit the text you convert. All translation
          happens locally in your browser via JavaScript — your input never leaves your device to
          reach our servers, because there is nothing to send it to.
        </p>
        <h2 className="text-xl font-bold text-zinc-100">What we don&apos;t collect</h2>
        <ul className="list-disc pl-5 space-y-1">
          <li>No accounts, so no names, emails, or passwords.</li>
          <li>No text you type into the translator, batch converter, or inspector.</li>
          <li>No analytics or tracking scripts are currently installed on this site.</li>
        </ul>
        <h2 className="text-xl font-bold text-zinc-100">Technical logs</h2>
        <p>
          Like any website, our hosting provider may keep standard server logs (such as IP address,
          browser type, and pages requested) for security and reliability. We do not combine these
          logs with any content you convert.
        </p>
        <h2 className="text-xl font-bold text-zinc-100">Cookies</h2>
        <p>
          This site does not set advertising or tracking cookies. Any preferences you change stay in
          your current browser session only.
        </p>
        <h2 className="text-xl font-bold text-zinc-100">Contact</h2>
        <p>
          Questions about this policy: <a className="text-indigo-400 underline" href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
        </p>
      </div>
    </div>
    </>
  );
}
