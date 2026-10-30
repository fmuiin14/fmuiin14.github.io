import type { Metadata } from "next";
import { InvoiceApp } from "@/components/invoice/InvoiceApp";

export const metadata: Metadata = {
  title: "Invoice Generator",
  description:
    "Create and print professional invoices right in your browser. Nothing is sent to a server.",
};

export default function InvoicePage() {
  return (
    <main>
      <InvoiceApp />
    </main>
  );
}
