"use client";

import { useState } from "react";
import Translator from "./Translator";
import Inspector from "./Inspector";
import type { VariantId } from "@/lib/wingdings-maps";

/** Translator + inspector bound to one font variant (for dedicated converter pages). */
export default function VariantTool({ defaultVariant }: { defaultVariant: VariantId }) {
  const [text, setText] = useState("Hello World!");
  const [variant, setVariant] = useState<VariantId>(defaultVariant);

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
