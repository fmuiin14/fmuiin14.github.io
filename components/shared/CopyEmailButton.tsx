"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { siteConfig } from "@/lib/constants";

export function CopyEmailButton() {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm text-text transition-colors hover:border-primary/50 hover:text-primary"
    >
      {copied ? (
        <>
          <Check size={14} className="text-success" />
          Copied!
        </>
      ) : (
        <>
          <Copy size={14} />
          {siteConfig.email}
        </>
      )}
    </button>
  );
}
