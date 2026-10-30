import type { Invoice, InvoiceSettings } from "@/types";

// Defaults used the first time /invoice is opened in a browser.
// After that, edits made on the page are kept in that browser's localStorage.
export const defaultInvoiceSettings: InvoiceSettings = {
  businessName: "Fathul Muiin",
  businessTagline: "Full Stack Software Engineer",
  email: "fathulmuiin@gmail.com",
  phone: "",
  website: "https://fmuiin.github.io",
  address: "",
  logo: "",
  bankAccounts: [
    {
      id: "bank-1",
      bank: "",
      accountNumber: "",
      accountName: "Fathul Muiin",
    },
  ],
  paymentInstructions:
    "Mohon cantumkan nomor invoice pada keterangan transfer.",
  currency: "IDR",
  language: "id",
  numberPrefix: "INV",
  nextNumber: 1,
  dueDays: 7,
  taxLabel: "PPN",
  taxRate: 0,
  accentColor: "#2563EB",
  defaultNotes: "Terima kasih atas kepercayaannya!",
  defaultTerms:
    "Pembayaran paling lambat sesuai tanggal jatuh tempo.\nPerpanjangan domain & hosting ditagihkan terpisah setiap tahun.",
  showSignature: true,
};

export const sampleInvoice: Omit<
  Invoice,
  "number" | "issueDate" | "dueDate" | "notes" | "terms"
> = {
  status: "unpaid",
  projectName: "Landing Page, Domain & Hosting nimoland.id",
  client: {
    name: "",
    company: "Nimoland",
    email: "",
    phone: "",
    address: "",
  },
  items: [
    {
      id: "item-1",
      description: "Pembuatan Landing Page nimoland.id",
      detail: "Desain & development landing page responsif",
      quantity: 1,
      unit: "proyek",
      price: 0,
    },
    {
      id: "item-2",
      description: "Domain nimoland.id",
      detail: "Registrasi domain .id (1 tahun)",
      quantity: 1,
      unit: "tahun",
      price: 0,
    },
    {
      id: "item-3",
      description: "Web Hosting",
      detail: "Hosting landing page (1 tahun)",
      quantity: 1,
      unit: "tahun",
      price: 0,
    },
  ],
  discountType: "percent",
  discountValue: 0,
  applyTax: false,
  amountPaid: 0,
};
