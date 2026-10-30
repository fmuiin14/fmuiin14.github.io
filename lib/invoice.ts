import type {
  Invoice,
  InvoiceLanguage,
  InvoiceSettings,
  InvoiceStatus,
} from "@/types";
import { defaultInvoiceSettings, sampleInvoice } from "@/content/data/invoice";

export const CURRENCIES = ["IDR", "USD", "SGD", "MYR", "AUD", "EUR"] as const;

const LOCALES: Record<InvoiceLanguage, string> = {
  id: "id-ID",
  en: "en-US",
};

export const invoiceLabels = {
  id: {
    invoice: "INVOICE",
    number: "No. Invoice",
    issueDate: "Tanggal",
    dueDate: "Jatuh Tempo",
    billTo: "Ditagihkan Kepada",
    from: "Dari",
    project: "Proyek",
    description: "Deskripsi",
    quantity: "Qty",
    price: "Harga",
    amount: "Jumlah",
    subtotal: "Subtotal",
    discount: "Diskon",
    total: "Total",
    paid: "Sudah Dibayar",
    balanceDue: "Sisa Tagihan",
    payment: "Informasi Pembayaran",
    accountName: "a.n.",
    notes: "Catatan",
    terms: "Syarat & Ketentuan",
    regards: "Hormat saya,",
    status: {
      draft: "DRAFT",
      unpaid: "BELUM DIBAYAR",
      partial: "DIBAYAR SEBAGIAN",
      paid: "LUNAS",
    },
  },
  en: {
    invoice: "INVOICE",
    number: "Invoice No.",
    issueDate: "Issue Date",
    dueDate: "Due Date",
    billTo: "Bill To",
    from: "From",
    project: "Project",
    description: "Description",
    quantity: "Qty",
    price: "Price",
    amount: "Amount",
    subtotal: "Subtotal",
    discount: "Discount",
    total: "Total",
    paid: "Amount Paid",
    balanceDue: "Balance Due",
    payment: "Payment Information",
    accountName: "Account name:",
    notes: "Notes",
    terms: "Terms & Conditions",
    regards: "Regards,",
    status: {
      draft: "DRAFT",
      unpaid: "UNPAID",
      partial: "PARTIALLY PAID",
      paid: "PAID",
    },
  },
} satisfies Record<
  InvoiceLanguage,
  Record<string, string | Record<InvoiceStatus, string>>
>;

export function formatMoney(
  amount: number,
  currency: string,
  language: InvoiceLanguage
): string {
  const fractionDigits = currency === "IDR" ? 0 : 2;
  return new Intl.NumberFormat(LOCALES[language], {
    style: "currency",
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

export function formatInvoiceDate(
  date: string,
  language: InvoiceLanguage
): string {
  if (!date) return "-";
  return new Date(`${date}T00:00:00`).toLocaleDateString(LOCALES[language], {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function calculateTotals(invoice: Invoice, settings: InvoiceSettings) {
  const subtotal = invoice.items.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );
  const discount = Math.min(
    subtotal,
    invoice.discountType === "percent"
      ? (subtotal * invoice.discountValue) / 100
      : invoice.discountValue
  );
  const taxable = subtotal - discount;
  const tax = invoice.applyTax ? (taxable * settings.taxRate) / 100 : 0;
  const total = taxable + tax;
  const balanceDue = Math.max(0, total - invoice.amountPaid);

  return { subtotal, discount, tax, total, balanceDue };
}

function toISODate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

export function addDays(date: string, days: number): string {
  const result = new Date(`${date}T00:00:00`);
  result.setDate(result.getDate() + days);
  return toISODate(result);
}

// e.g. INV/2026/10/001
export function buildInvoiceNumber(
  settings: InvoiceSettings,
  issueDate: string
): string {
  const [year, month] = issueDate.split("-");
  const sequence = String(settings.nextNumber).padStart(3, "0");
  return [settings.numberPrefix, year, month, sequence]
    .filter(Boolean)
    .join("/");
}

export function createInvoice(
  settings: InvoiceSettings,
  base: Partial<Invoice> = sampleInvoice
): Invoice {
  const issueDate = toISODate(new Date());
  return {
    ...sampleInvoice,
    items: [],
    client: { name: "", company: "", email: "", phone: "", address: "" },
    projectName: "",
    ...base,
    number: buildInvoiceNumber(settings, issueDate),
    issueDate,
    dueDate: addDays(issueDate, settings.dueDays),
    notes: settings.defaultNotes,
    terms: settings.defaultTerms,
  };
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}

const SETTINGS_KEY = "invoice:settings";
const INVOICE_KEY = "invoice:current";

function readJSON<T>(key: string): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeJSON(key: string, value: unknown): boolean {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function loadSettings(): InvoiceSettings {
  return {
    ...defaultInvoiceSettings,
    ...readJSON<Partial<InvoiceSettings>>(SETTINGS_KEY),
  };
}

export function loadInvoice(settings: InvoiceSettings): Invoice {
  const saved = readJSON<Invoice>(INVOICE_KEY);
  return saved
    ? { ...createInvoice(settings), ...saved }
    : createInvoice(settings);
}

export const saveSettings = (settings: InvoiceSettings) =>
  writeJSON(SETTINGS_KEY, settings);

export const saveInvoice = (invoice: Invoice) =>
  writeJSON(INVOICE_KEY, invoice);
