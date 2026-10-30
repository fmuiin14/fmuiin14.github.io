"use client";

import dynamic from "next/dynamic";

// The generator reads localStorage on first render, so skip prerendering it.
const InvoiceGenerator = dynamic(
  () => import("./InvoiceGenerator").then((mod) => mod.InvoiceGenerator),
  {
    ssr: false,
    loading: () => (
      <p className="px-6 py-24 text-center text-sm text-text-muted">
        Memuat invoice generator…
      </p>
    ),
  }
);

export function InvoiceApp() {
  return <InvoiceGenerator />;
}
