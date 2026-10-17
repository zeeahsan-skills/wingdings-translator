"use client";

import { useState } from "react";
import Translator from "./Translator";
import Inspector from "./Inspector";
import type { VariantId } from "@/lib/wingdings-maps";

/** Owns the translator's live state so the tool and the inspector stay in sync. */
export default function TranslatorSection() {
  const [text, setText] = useState("Hello World!");
  const [variant, setVariant] = useState<VariantId>("wingdings1");

  return (
    <div className="space-y-10">
      <Translator
        text={text}
        setText={setText}
        variant={variant}
        setVariant={setVariant}
      />
      <Inspector text={text} variant={variant} />
    </div>
  );
}
