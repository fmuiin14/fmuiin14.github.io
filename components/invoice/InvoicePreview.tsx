/* eslint-disable @next/next/no-img-element -- logo is a user-uploaded data URL */
import type { Invoice, InvoiceSettings } from "@/types";
import {
  calculateTotals,
  formatInvoiceDate,
  formatMoney,
  invoiceLabels,
} from "@/lib/invoice";

interface InvoicePreviewProps {
  invoice: Invoice;
  settings: InvoiceSettings;
}

const statusColors = {
  draft: "#64748B",
  unpaid: "#DC2626",
  partial: "#D97706",
  paid: "#16A34A",
};

export function InvoicePreview({ invoice, settings }: InvoicePreviewProps) {
  const t = invoiceLabels[settings.language];
  const money = (amount: number) =>
    formatMoney(amount, settings.currency, settings.language);
  const totals = calculateTotals(invoice, settings);
  const accent = settings.accentColor;
  const banks = settings.bankAccounts.filter((b) => b.bank || b.accountNumber);
  const client = invoice.client;

  return (
    <div className="invoice-paper bg-white text-[13px] leading-relaxed text-slate-700">
      <div className="h-2" style={{ backgroundColor: accent }} />

      <div className="p-8 sm:p-10">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-6">
          <div className="flex items-start gap-4">
            {settings.logo && (
              <img
                src={settings.logo}
                alt=""
                className="h-14 w-14 rounded object-contain"
              />
            )}
            <div>
              <p className="text-lg font-bold text-slate-900">
                {settings.businessName}
              </p>
              {settings.businessTagline && (
                <p className="text-slate-500">{settings.businessTagline}</p>
              )}
              <div className="mt-2 space-y-0.5 text-xs text-slate-500">
                {settings.address && (
                  <p className="whitespace-pre-line">{settings.address}</p>
                )}
                {settings.email && <p>{settings.email}</p>}
                {settings.phone && <p>{settings.phone}</p>}
                {settings.website && <p>{settings.website}</p>}
              </div>
            </div>
          </div>

          <div className="text-right">
            <p
              className="text-3xl font-extrabold tracking-wider"
              style={{ color: accent }}
            >
              {t.invoice}
            </p>
            <p className="mt-1 font-mono text-sm text-slate-900">
              {invoice.number}
            </p>
            <span
              className="mt-2 inline-block rounded border-2 px-2 py-0.5 text-[11px] font-bold tracking-wider"
              style={{
                color: statusColors[invoice.status],
                borderColor: statusColors[invoice.status],
              }}
            >
              {t.status[invoice.status]}
            </span>
          </div>
        </div>

        {/* Meta */}
        <div className="mt-8 grid gap-6 border-y border-slate-200 py-5 sm:grid-cols-2">
          <div>
            <p className="mb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {t.billTo}
            </p>
            {client.company && (
              <p className="font-semibold text-slate-900">{client.company}</p>
            )}
            {client.name && (
              <p
                className={client.company ? "" : "font-semibold text-slate-900"}
              >
                {client.name}
              </p>
            )}
            <div className="text-xs text-slate-500">
              {client.address && (
                <p className="whitespace-pre-line">{client.address}</p>
              )}
              {client.email && <p>{client.email}</p>}
              {client.phone && <p>{client.phone}</p>}
            </div>
          </div>

          <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 sm:justify-self-end">
            <dt className="text-slate-400">{t.issueDate}</dt>
            <dd className="text-right font-medium text-slate-900">
              {formatInvoiceDate(invoice.issueDate, settings.language)}
            </dd>
            <dt className="text-slate-400">{t.dueDate}</dt>
            <dd className="text-right font-medium text-slate-900">
              {formatInvoiceDate(invoice.dueDate, settings.language)}
            </dd>
            {invoice.projectName && (
              <>
                <dt className="text-slate-400">{t.project}</dt>
                <dd className="max-w-56 text-right font-medium text-slate-900">
                  {invoice.projectName}
                </dd>
              </>
            )}
          </dl>
        </div>

        {/* Items */}
        <table className="mt-6 w-full border-collapse">
          <thead>
            <tr
              className="text-left text-[11px] tracking-wider text-white uppercase"
              style={{ backgroundColor: accent }}
            >
              <th className="w-8 px-3 py-2 font-semibold">#</th>
              <th className="px-3 py-2 font-semibold">{t.description}</th>
              <th className="px-3 py-2 text-center font-semibold">
                {t.quantity}
              </th>
              <th className="px-3 py-2 text-right font-semibold">{t.price}</th>
              <th className="px-3 py-2 text-right font-semibold">{t.amount}</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item, index) => (
              <tr key={item.id} className="border-b border-slate-200 align-top">
                <td className="px-3 py-3 text-slate-400">{index + 1}</td>
                <td className="px-3 py-3">
                  <p className="font-medium text-slate-900">
                    {item.description || "-"}
                  </p>
                  {item.detail && (
                    <p className="text-xs text-slate-500">{item.detail}</p>
                  )}
                </td>
                <td className="px-3 py-3 text-center whitespace-nowrap">
                  {item.quantity} {item.unit}
                </td>
                <td className="px-3 py-3 text-right whitespace-nowrap">
                  {money(item.price)}
                </td>
                <td className="px-3 py-3 text-right font-medium whitespace-nowrap text-slate-900">
                  {money(item.quantity * item.price)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div className="mt-4 flex justify-end">
          <dl className="w-full max-w-72 space-y-1.5">
            <div className="flex justify-between">
              <dt>{t.subtotal}</dt>
              <dd>{money(totals.subtotal)}</dd>
            </div>
            {totals.discount > 0 && (
              <div className="flex justify-between">
                <dt>
                  {t.discount}
                  {invoice.discountType === "percent" &&
                    ` (${invoice.discountValue}%)`}
                </dt>
                <dd>-{money(totals.discount)}</dd>
              </div>
            )}
            {invoice.applyTax && (
              <div className="flex justify-between">
                <dt>
                  {settings.taxLabel} ({settings.taxRate}%)
                </dt>
                <dd>{money(totals.tax)}</dd>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-2 text-base font-bold text-slate-900">
              <dt>{t.total}</dt>
              <dd>{money(totals.total)}</dd>
            </div>
            {invoice.amountPaid > 0 && (
              <>
                <div className="flex justify-between">
                  <dt>{t.paid}</dt>
                  <dd>-{money(invoice.amountPaid)}</dd>
                </div>
                <div
                  className="flex justify-between rounded px-2 py-1.5 font-bold text-white"
                  style={{ backgroundColor: accent }}
                >
                  <dt>{t.balanceDue}</dt>
                  <dd>{money(totals.balanceDue)}</dd>
                </div>
              </>
            )}
          </dl>
        </div>

        {/* Payment, notes, signature */}
        <div className="mt-10 grid gap-8 sm:grid-cols-2">
          <div className="space-y-5">
            {(banks.length > 0 || settings.paymentInstructions) && (
              <div>
                <p
                  className="mb-1.5 text-[11px] font-semibold tracking-wider uppercase"
                  style={{ color: accent }}
                >
                  {t.payment}
                </p>
                {banks.map((bank) => (
                  <div key={bank.id} className="mb-1.5">
                    <p className="font-semibold text-slate-900">
                      {bank.bank}{" "}
                      <span className="font-mono">{bank.accountNumber}</span>
                    </p>
                    {bank.accountName && (
                      <p className="text-xs text-slate-500">
                        {t.accountName} {bank.accountName}
                      </p>
                    )}
                  </div>
                ))}
                {settings.paymentInstructions && (
                  <p className="text-xs whitespace-pre-line text-slate-500">
                    {settings.paymentInstructions}
                  </p>
                )}
              </div>
            )}
            {invoice.notes && (
              <div>
                <p
                  className="mb-1.5 text-[11px] font-semibold tracking-wider uppercase"
                  style={{ color: accent }}
                >
                  {t.notes}
                </p>
                <p className="text-xs whitespace-pre-line">{invoice.notes}</p>
              </div>
            )}
          </div>

          {settings.showSignature && (
            <div className="flex flex-col items-center justify-end text-center sm:items-end sm:text-right">
              <p className="text-xs text-slate-500">{t.regards}</p>
              <div className="h-16" />
              <p className="border-t border-slate-300 pt-1 font-semibold text-slate-900">
                {settings.businessName}
              </p>
            </div>
          )}
        </div>

        {invoice.terms && (
          <div className="mt-8 border-t border-slate-200 pt-4">
            <p className="mb-1 text-[11px] font-semibold tracking-wider text-slate-400 uppercase">
              {t.terms}
            </p>
            <p className="text-xs whitespace-pre-line text-slate-500">
              {invoice.terms}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
