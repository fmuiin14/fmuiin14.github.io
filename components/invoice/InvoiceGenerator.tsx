"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Download,
  FilePlus,
  FileUp,
  Plus,
  Printer,
  RefreshCw,
  RotateCcw,
  Trash2,
} from "lucide-react";
import type {
  Invoice,
  InvoiceClient,
  InvoiceItem,
  InvoiceSettings,
  InvoiceStatus,
} from "@/types";
import { defaultInvoiceSettings } from "@/content/data/invoice";
import {
  CURRENCIES,
  addDays,
  buildInvoiceNumber,
  calculateTotals,
  createInvoice,
  formatMoney,
  loadInvoice,
  loadSettings,
  newId,
  saveInvoice,
  saveSettings,
} from "@/lib/invoice";
import { cn } from "@/lib/utils";
import { InvoicePreview } from "./InvoicePreview";

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary";

const buttonClass =
  "inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-muted transition-colors hover:border-primary/50 hover:text-text";

const MAX_LOGO_BYTES = 300 * 1024;

const statusOptions: { value: InvoiceStatus; label: string }[] = [
  { value: "draft", label: "Draft" },
  { value: "unpaid", label: "Belum dibayar" },
  { value: "partial", label: "Dibayar sebagian (DP)" },
  { value: "paid", label: "Lunas" },
];

function emptyItem(): InvoiceItem {
  return {
    id: newId(),
    description: "",
    detail: "",
    quantity: 1,
    unit: "",
    price: 0,
  };
}

function Field({
  label,
  children,
  className,
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={cn("block", className)}>
      <span className="mb-1 block text-xs font-medium text-text-muted">
        {label}
      </span>
      {children}
    </label>
  );
}

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-xl border border-border bg-surface p-5">
      <h2 className="mb-4 text-sm font-semibold tracking-wide text-text uppercase">
        {title}
      </h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

export function InvoiceGenerator() {
  const [settings, setSettings] = useState<InvoiceSettings>(loadSettings);
  const [invoice, setInvoice] = useState<Invoice>(() =>
    loadInvoice(loadSettings())
  );
  const [tab, setTab] = useState<"invoice" | "settings">("invoice");
  const [message, setMessage] = useState("");
  const importRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  useEffect(() => {
    saveInvoice(invoice);
  }, [invoice]);

  const totals = calculateTotals(invoice, settings);
  const money = (amount: number) =>
    formatMoney(amount, settings.currency, settings.language);

  function flash(text: string) {
    setMessage(text);
    window.setTimeout(() => setMessage(""), 3000);
  }

  function updateSettings(patch: Partial<InvoiceSettings>) {
    setSettings((prev) => ({ ...prev, ...patch }));
  }

  function updateInvoice(patch: Partial<Invoice>) {
    setInvoice((prev) => ({ ...prev, ...patch }));
  }

  function updateClient(patch: Partial<InvoiceClient>) {
    setInvoice((prev) => ({ ...prev, client: { ...prev.client, ...patch } }));
  }

  function updateItem(id: string, patch: Partial<InvoiceItem>) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.id === id ? { ...item, ...patch } : item
      ),
    }));
  }

  function removeItem(id: string) {
    setInvoice((prev) => ({
      ...prev,
      items: prev.items.filter((item) => item.id !== id),
    }));
  }

  function handleIssueDateChange(issueDate: string) {
    updateInvoice({
      issueDate,
      dueDate: issueDate ? addDays(issueDate, settings.dueDays) : "",
    });
  }

  function handlePrint() {
    const previousTitle = document.title;
    // Browsers use the document title as the default PDF filename.
    document.title =
      `${invoice.number.replace(/\//g, "-")} ${invoice.client.company || invoice.client.name}`.trim();
    window.print();
    document.title = previousTitle;
  }

  function handleNewInvoice() {
    if (!window.confirm("Buat invoice baru? Draft saat ini akan diganti.")) {
      return;
    }
    const nextSettings = { ...settings, nextNumber: settings.nextNumber + 1 };
    setSettings(nextSettings);
    setInvoice(createInvoice(nextSettings, { items: [emptyItem()] }));
    setTab("invoice");
  }

  function handleExport() {
    const blob = new Blob([JSON.stringify({ settings, invoice }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${invoice.number.replace(/\//g, "-")}.json`;
    link.click();
    URL.revokeObjectURL(url);
  }

  async function handleImport(file: File | undefined) {
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (data.settings) {
        setSettings({ ...defaultInvoiceSettings, ...data.settings });
      }
      if (data.invoice) {
        setInvoice({ ...createInvoice(settings), ...data.invoice });
      }
      flash("Data berhasil diimport.");
    } catch {
      flash("File tidak valid.");
    }
    if (importRef.current) importRef.current.value = "";
  }

  function handleReset() {
    if (
      !window.confirm(
        "Reset semua pengaturan & invoice ke default? Data di browser ini akan dihapus."
      )
    ) {
      return;
    }
    setSettings(defaultInvoiceSettings);
    setInvoice(createInvoice(defaultInvoiceSettings));
  }

  function handleLogo(file: File | undefined) {
    if (!file) return;
    if (file.size > MAX_LOGO_BYTES) {
      flash("Logo maksimal 300 KB.");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => updateSettings({ logo: String(reader.result) });
    reader.readAsDataURL(file);
  }

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-16">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-text">Invoice Generator</h1>
            <p className="mt-2 text-sm text-text-muted">
              Data tersimpan otomatis di browser ini, tidak dikirim ke server.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-primary/90"
            >
              <Printer size={16} />
              Cetak / Simpan PDF
            </button>
            <button
              type="button"
              onClick={handleNewInvoice}
              className={buttonClass}
            >
              <FilePlus size={16} />
              Invoice baru
            </button>
            <button
              type="button"
              onClick={handleExport}
              className={buttonClass}
            >
              <Download size={16} />
              Export
            </button>
            <button
              type="button"
              onClick={() => importRef.current?.click()}
              className={buttonClass}
            >
              <FileUp size={16} />
              Import
            </button>
            <input
              ref={importRef}
              type="file"
              accept="application/json"
              className="hidden"
              onChange={(e) => handleImport(e.target.files?.[0])}
            />
          </div>
        </div>

        {message && (
          <p className="mb-4 rounded-lg border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-text">
            {message}
          </p>
        )}

        <div className="grid gap-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
          {/* Editor */}
          <div className="space-y-5">
            <div className="flex gap-1 rounded-lg border border-border bg-surface p-1">
              {(
                [
                  ["invoice", "Invoice"],
                  ["settings", "Pengaturan"],
                ] as const
              ).map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTab(value)}
                  className={cn(
                    "flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    tab === value
                      ? "bg-primary text-white"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            {tab === "invoice" ? (
              <>
                <Section title="Detail Invoice">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Nomor invoice">
                      <div className="flex gap-2">
                        <input
                          className={inputClass}
                          value={invoice.number}
                          onChange={(e) =>
                            updateInvoice({ number: e.target.value })
                          }
                        />
                        <button
                          type="button"
                          title="Buat ulang dari prefix & nomor urut"
                          onClick={() =>
                            updateInvoice({
                              number: buildInvoiceNumber(
                                settings,
                                invoice.issueDate
                              ),
                            })
                          }
                          className="shrink-0 rounded-lg border border-border px-2.5 text-text-muted hover:text-text"
                        >
                          <RefreshCw size={14} />
                        </button>
                      </div>
                    </Field>
                    <Field label="Status">
                      <select
                        className={inputClass}
                        value={invoice.status}
                        onChange={(e) =>
                          updateInvoice({
                            status: e.target.value as InvoiceStatus,
                          })
                        }
                      >
                        {statusOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Tanggal invoice">
                      <input
                        type="date"
                        className={inputClass}
                        value={invoice.issueDate}
                        onChange={(e) => handleIssueDateChange(e.target.value)}
                      />
                    </Field>
                    <Field label="Jatuh tempo">
                      <input
                        type="date"
                        className={inputClass}
                        value={invoice.dueDate}
                        onChange={(e) =>
                          updateInvoice({ dueDate: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Nama proyek">
                    <input
                      className={inputClass}
                      value={invoice.projectName}
                      onChange={(e) =>
                        updateInvoice({ projectName: e.target.value })
                      }
                    />
                  </Field>
                </Section>

                <Section title="Klien">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Perusahaan / brand">
                      <input
                        className={inputClass}
                        value={invoice.client.company}
                        onChange={(e) =>
                          updateClient({ company: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Nama kontak">
                      <input
                        className={inputClass}
                        value={invoice.client.name}
                        onChange={(e) => updateClient({ name: e.target.value })}
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        className={inputClass}
                        value={invoice.client.email}
                        onChange={(e) =>
                          updateClient({ email: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Telepon / WhatsApp">
                      <input
                        className={inputClass}
                        value={invoice.client.phone}
                        onChange={(e) =>
                          updateClient({ phone: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Alamat">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={invoice.client.address}
                      onChange={(e) =>
                        updateClient({ address: e.target.value })
                      }
                    />
                  </Field>
                </Section>

                <Section title="Item">
                  {invoice.items.map((item, index) => (
                    <div
                      key={item.id}
                      className="space-y-2 rounded-lg border border-border bg-background/50 p-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-medium text-text-muted">
                          Item {index + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          className="text-text-muted hover:text-red-400"
                          aria-label={`Hapus item ${index + 1}`}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                      <input
                        className={inputClass}
                        placeholder="Deskripsi"
                        value={item.description}
                        onChange={(e) =>
                          updateItem(item.id, { description: e.target.value })
                        }
                      />
                      <input
                        className={inputClass}
                        placeholder="Detail (opsional)"
                        value={item.detail}
                        onChange={(e) =>
                          updateItem(item.id, { detail: e.target.value })
                        }
                      />
                      <div className="grid grid-cols-[1fr_1fr_2fr] gap-2">
                        <Field label="Qty">
                          <input
                            type="number"
                            min={0}
                            step="any"
                            className={inputClass}
                            value={item.quantity}
                            onChange={(e) =>
                              updateItem(item.id, {
                                quantity: Number(e.target.value),
                              })
                            }
                          />
                        </Field>
                        <Field label="Satuan">
                          <input
                            className={inputClass}
                            placeholder="pcs"
                            value={item.unit}
                            onChange={(e) =>
                              updateItem(item.id, { unit: e.target.value })
                            }
                          />
                        </Field>
                        <Field label={`Harga (${settings.currency})`}>
                          <input
                            type="number"
                            min={0}
                            step="any"
                            className={inputClass}
                            value={item.price}
                            onChange={(e) =>
                              updateItem(item.id, {
                                price: Number(e.target.value),
                              })
                            }
                          />
                        </Field>
                      </div>
                      <p className="text-right text-xs text-text-muted">
                        = {money(item.quantity * item.price)}
                      </p>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateInvoice({ items: [...invoice.items, emptyItem()] })
                    }
                    className={cn(buttonClass, "w-full justify-center")}
                  >
                    <Plus size={16} />
                    Tambah item
                  </button>
                </Section>

                <Section title="Diskon, Pajak & Pembayaran">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Diskon">
                      <div className="flex gap-2">
                        <input
                          type="number"
                          min={0}
                          step="any"
                          className={inputClass}
                          value={invoice.discountValue}
                          onChange={(e) =>
                            updateInvoice({
                              discountValue: Number(e.target.value),
                            })
                          }
                        />
                        <select
                          className={cn(inputClass, "w-24")}
                          value={invoice.discountType}
                          onChange={(e) =>
                            updateInvoice({
                              discountType: e.target
                                .value as Invoice["discountType"],
                            })
                          }
                        >
                          <option value="percent">%</option>
                          <option value="fixed">{settings.currency}</option>
                        </select>
                      </div>
                    </Field>
                    <Field label={`Sudah dibayar / DP (${settings.currency})`}>
                      <input
                        type="number"
                        min={0}
                        step="any"
                        className={inputClass}
                        value={invoice.amountPaid}
                        onChange={(e) =>
                          updateInvoice({ amountPaid: Number(e.target.value) })
                        }
                      />
                    </Field>
                  </div>
                  <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                      type="checkbox"
                      checked={invoice.applyTax}
                      onChange={(e) =>
                        updateInvoice({ applyTax: e.target.checked })
                      }
                    />
                    Kenakan {settings.taxLabel} {settings.taxRate}% (atur tarif
                    di Pengaturan)
                  </label>
                  <div className="rounded-lg bg-background/50 p-3 text-sm">
                    <div className="flex justify-between text-text-muted">
                      <span>Total</span>
                      <span>{money(totals.total)}</span>
                    </div>
                    <div className="flex justify-between font-semibold text-text">
                      <span>Sisa tagihan</span>
                      <span>{money(totals.balanceDue)}</span>
                    </div>
                  </div>
                </Section>

                <Section title="Catatan">
                  <Field label="Catatan">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={invoice.notes}
                      onChange={(e) => updateInvoice({ notes: e.target.value })}
                    />
                  </Field>
                  <Field label="Syarat & ketentuan">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={invoice.terms}
                      onChange={(e) => updateInvoice({ terms: e.target.value })}
                    />
                  </Field>
                </Section>
              </>
            ) : (
              <>
                <Section title="Profil Bisnis">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Nama">
                      <input
                        className={inputClass}
                        value={settings.businessName}
                        onChange={(e) =>
                          updateSettings({ businessName: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Tagline / jabatan">
                      <input
                        className={inputClass}
                        value={settings.businessTagline}
                        onChange={(e) =>
                          updateSettings({ businessTagline: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Email">
                      <input
                        type="email"
                        className={inputClass}
                        value={settings.email}
                        onChange={(e) =>
                          updateSettings({ email: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Telepon / WhatsApp">
                      <input
                        className={inputClass}
                        value={settings.phone}
                        onChange={(e) =>
                          updateSettings({ phone: e.target.value })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Website">
                    <input
                      className={inputClass}
                      value={settings.website}
                      onChange={(e) =>
                        updateSettings({ website: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Alamat">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={settings.address}
                      onChange={(e) =>
                        updateSettings({ address: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Logo (PNG/JPG/SVG, maks 300 KB)">
                    <div className="flex items-center gap-3">
                      <input
                        type="file"
                        accept="image/*"
                        className="text-xs text-text-muted file:mr-3 file:rounded-md file:border-0 file:bg-primary file:px-3 file:py-1.5 file:text-white"
                        onChange={(e) => handleLogo(e.target.files?.[0])}
                      />
                      {settings.logo && (
                        <button
                          type="button"
                          onClick={() => updateSettings({ logo: "" })}
                          className="text-xs text-red-400 hover:underline"
                        >
                          Hapus logo
                        </button>
                      )}
                    </div>
                  </Field>
                </Section>

                <Section title="Rekening & Pembayaran">
                  {settings.bankAccounts.map((account, index) => (
                    <div
                      key={account.id}
                      className="grid gap-2 rounded-lg border border-border bg-background/50 p-3 sm:grid-cols-[1fr_1fr_1fr_auto]"
                    >
                      {(
                        [
                          ["bank", "Bank / e-wallet"],
                          ["accountNumber", "No. rekening"],
                          ["accountName", "Atas nama"],
                        ] as const
                      ).map(([key, placeholder]) => (
                        <input
                          key={key}
                          className={inputClass}
                          placeholder={placeholder}
                          value={account[key]}
                          onChange={(e) =>
                            updateSettings({
                              bankAccounts: settings.bankAccounts.map((a) =>
                                a.id === account.id
                                  ? { ...a, [key]: e.target.value }
                                  : a
                              ),
                            })
                          }
                        />
                      ))}
                      <button
                        type="button"
                        onClick={() =>
                          updateSettings({
                            bankAccounts: settings.bankAccounts.filter(
                              (a) => a.id !== account.id
                            ),
                          })
                        }
                        className="justify-self-end px-1 text-text-muted hover:text-red-400"
                        aria-label={`Hapus rekening ${index + 1}`}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() =>
                      updateSettings({
                        bankAccounts: [
                          ...settings.bankAccounts,
                          {
                            id: newId(),
                            bank: "",
                            accountNumber: "",
                            accountName: settings.businessName,
                          },
                        ],
                      })
                    }
                    className={cn(buttonClass, "w-full justify-center")}
                  >
                    <Plus size={16} />
                    Tambah rekening
                  </button>
                  <Field label="Instruksi pembayaran">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={settings.paymentInstructions}
                      onChange={(e) =>
                        updateSettings({ paymentInstructions: e.target.value })
                      }
                    />
                  </Field>
                </Section>

                <Section title="Format & Penomoran">
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Mata uang">
                      <select
                        className={inputClass}
                        value={settings.currency}
                        onChange={(e) =>
                          updateSettings({ currency: e.target.value })
                        }
                      >
                        {CURRENCIES.map((currency) => (
                          <option key={currency} value={currency}>
                            {currency}
                          </option>
                        ))}
                      </select>
                    </Field>
                    <Field label="Bahasa invoice">
                      <select
                        className={inputClass}
                        value={settings.language}
                        onChange={(e) =>
                          updateSettings({
                            language: e.target
                              .value as InvoiceSettings["language"],
                          })
                        }
                      >
                        <option value="id">Bahasa Indonesia</option>
                        <option value="en">English</option>
                      </select>
                    </Field>
                    <Field label="Prefix nomor">
                      <input
                        className={inputClass}
                        value={settings.numberPrefix}
                        onChange={(e) =>
                          updateSettings({ numberPrefix: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Nomor urut berikutnya">
                      <input
                        type="number"
                        min={1}
                        className={inputClass}
                        value={settings.nextNumber}
                        onChange={(e) =>
                          updateSettings({
                            nextNumber: Math.max(1, Number(e.target.value)),
                          })
                        }
                      />
                    </Field>
                    <Field label="Jatuh tempo (hari)">
                      <input
                        type="number"
                        min={0}
                        className={inputClass}
                        value={settings.dueDays}
                        onChange={(e) =>
                          updateSettings({ dueDays: Number(e.target.value) })
                        }
                      />
                    </Field>
                    <Field label="Warna aksen">
                      <input
                        type="color"
                        className="h-[38px] w-full cursor-pointer rounded-lg border border-border bg-background p-1"
                        value={settings.accentColor}
                        onChange={(e) =>
                          updateSettings({ accentColor: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Nama pajak">
                      <input
                        className={inputClass}
                        value={settings.taxLabel}
                        onChange={(e) =>
                          updateSettings({ taxLabel: e.target.value })
                        }
                      />
                    </Field>
                    <Field label="Tarif pajak (%)">
                      <input
                        type="number"
                        min={0}
                        step="any"
                        className={inputClass}
                        value={settings.taxRate}
                        onChange={(e) =>
                          updateSettings({ taxRate: Number(e.target.value) })
                        }
                      />
                    </Field>
                  </div>
                  <p className="text-xs text-text-muted">
                    Contoh nomor:{" "}
                    <span className="font-mono text-text">
                      {buildInvoiceNumber(settings, invoice.issueDate)}
                    </span>
                  </p>
                  <label className="flex items-center gap-2 text-sm text-text-muted">
                    <input
                      type="checkbox"
                      checked={settings.showSignature}
                      onChange={(e) =>
                        updateSettings({ showSignature: e.target.checked })
                      }
                    />
                    Tampilkan kolom tanda tangan
                  </label>
                </Section>

                <Section title="Teks Default (untuk invoice baru)">
                  <Field label="Catatan default">
                    <textarea
                      rows={2}
                      className={inputClass}
                      value={settings.defaultNotes}
                      onChange={(e) =>
                        updateSettings({ defaultNotes: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Syarat & ketentuan default">
                    <textarea
                      rows={3}
                      className={inputClass}
                      value={settings.defaultTerms}
                      onChange={(e) =>
                        updateSettings({ defaultTerms: e.target.value })
                      }
                    />
                  </Field>
                </Section>

                <button
                  type="button"
                  onClick={handleReset}
                  className={cn(
                    buttonClass,
                    "hover:border-red-500/50 hover:text-red-400"
                  )}
                >
                  <RotateCcw size={16} />
                  Reset ke default
                </button>
              </>
            )}
          </div>

          {/* Preview */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <p className="mb-2 text-xs font-medium tracking-wide text-text-muted uppercase">
              Preview
            </p>
            <div className="overflow-hidden rounded-xl shadow-2xl shadow-black/40">
              <InvoicePreview invoice={invoice} settings={settings} />
            </div>
          </div>
        </div>
      </div>

      {createPortal(
        <div className="invoice-print-portal">
          <InvoicePreview invoice={invoice} settings={settings} />
        </div>,
        document.body
      )}
    </>
  );
}
