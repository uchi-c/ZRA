"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/lib/auth";
import { useDashboardStatusBar } from "@/lib/dashboardStatus";
import { StatCard } from "@/components/ui/StatCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Tabs } from "@/components/ui/Tabs";
import { Toast } from "@/components/ui/Toast";
import { CategoryAmountTable } from "@/components/taxpayer/CategoryAmountTable";
import { ActionButtons } from "@/components/taxpayer/ActionButtons";
import { RefundStepper } from "@/components/taxpayer/RefundStepper";
import { DEFAULT_EXPENSE, DEFAULT_INCOME, sumValues } from "@/lib/tax";
import { zmw } from "@/lib/mockData";
import type { TaxpayerProfile } from "@/lib/types";
import { AlertTriangle, CheckCircle2, Receipt, TrendingDown, TrendingUp } from "lucide-react";

const TAX_PERIODS = ["2025 Q1", "2025 Q2", "2025 Q3", "2025 Q4", "01 Jan 2025 - 31 Dec 2025"];

const TAB_IDS = ["income", "expense", "computation", "paye", "vat", "wht", "refunds", "liability"];

export function TaxpayerDashboard() {
  const { user } = useAuth();
  const profile = user!.profile as TaxpayerProfile;
  const searchParams = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const initialTab = requestedTab && TAB_IDS.includes(requestedTab) ? requestedTab : "income";

  const [taxPeriod, setTaxPeriod] = useState(TAX_PERIODS[1]);
  const [income, setIncome] = useState<Record<string, number>>(DEFAULT_INCOME);
  const [expense, setExpense] = useState<Record<string, number>>(DEFAULT_EXPENSE);
  const [nonAllowableExpenses, setNonAllowableExpenses] = useState(25000);
  const [capitalAllowancesTax, setCapitalAllowancesTax] = useState(40000);
  const [taxRate, setTaxRate] = useState(25);

  const [employees, setEmployees] = useState(12);
  const [grossSalaries, setGrossSalaries] = useState(360000);
  const [payeDeducted, setPayeDeducted] = useState(60000);
  const [napsa, setNapsa] = useState(18000);
  const [nhima, setNhima] = useState(6000);
  const [payeStatus, setPayeStatus] = useState<"Filed" | "Paid" | "Outstanding">("Filed");

  const [outputVat, setOutputVat] = useState(152000);
  const [inputVat, setInputVat] = useState(108000);

  const [whtDeducted, setWhtDeducted] = useState(30000);
  const [whtCredits, setWhtCredits] = useState(18000);

  const [taxCredits, setTaxCredits] = useState(20000);
  const [advanceTaxPaid, setAdvanceTaxPaid] = useState(15000);
  const [vatCredits, setVatCredits] = useState(0);
  const [refundStep, setRefundStep] = useState(0);

  const [penalties, setPenalties] = useState(0);
  const [interest, setInterest] = useState(0);

  const [toast, setToast] = useState<string | null>(null);

  const totalIncome = useMemo(() => sumValues(income), [income]);
  const totalExpenses = useMemo(() => sumValues(expense), [expense]);
  const netProfit = totalIncome - totalExpenses;
  const taxableIncome = Math.max(0, netProfit + nonAllowableExpenses - capitalAllowancesTax);
  const incomeTaxPayable = Math.round(taxableIncome * (taxRate / 100));

  const payeLiability = payeDeducted;
  const netVatPayable = outputVat - inputVat;
  const whtNetPosition = whtDeducted - whtCredits;

  const totalCredits = taxCredits + advanceTaxPaid + whtCredits + vatCredits;
  const refundAmount = Math.max(0, totalCredits - incomeTaxPayable);
  const hasRefund = refundAmount > 0;

  const totalLiability =
    incomeTaxPayable + payeLiability + Math.max(0, netVatPayable) + penalties + interest;
  const outstandingBalance = Math.max(0, totalLiability - totalCredits);

  const taxStatus = outstandingBalance > 0 ? "Outstanding Taxes" : hasRefund && refundStep < 3 ? "Pending Review" : "Compliant";

  const { setStatus } = useDashboardStatusBar();
  useEffect(() => {
    setStatus({
      label: `TPIN ${profile.tpin}`,
      value: taxStatus,
      tone: taxStatus === "Compliant" ? "green" : taxStatus === "Pending Review" ? "amber" : "red",
    });
    return () => setStatus(null);
  }, [profile.tpin, taxStatus, setStatus]);

  function handleAction(action: string) {
    if (action === "Request Refund") {
      if (hasRefund) {
        setRefundStep((s) => Math.min(3, s + 1));
        setToast(`Refund request submitted for ${zmw(refundAmount)}.`);
      } else {
        setToast("No refund is currently due based on your tax computation.");
      }
      return;
    }
    const messages: Record<string, string> = {
      "Calculate Tax": "Tax recalculated based on the latest declarations.",
      "Submit Return": `Return for ${taxPeriod} submitted to ZRA.`,
      "Upload Supporting Documents": "Document upload dialog would open here.",
      "Generate Assessment": "Assessment notice generated and sent to your inbox.",
      "Make Payment": "Redirecting to the digital payment gateway...",
      "Generate Tax Clearance": "Tax clearance certificate generated.",
      "Generate Compliance Report": "Compliance report generated.",
      "AI Compliance Check": "AI Compliance Engine scan complete — no anomalies detected.",
    };
    setToast(messages[action] ?? `${action} completed.`);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-gradient-to-r from-zra-navy-dark to-zra-navy text-white">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-lg font-bold">
              Welcome back, {profile.firstName} {profile.surname}
            </h1>
            <p className="text-sm text-white/80">
              TPIN {profile.tpin} · {profile.businessName ?? "Individual Taxpayer"} · {profile.taxpayerType}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={taxPeriod}
              onChange={(e) => setTaxPeriod(e.target.value)}
              className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white [&>option]:text-slate-900"
            >
              {TAX_PERIODS.map((p) => (
                <option key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
            <StatusBadge status={taxStatus} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard label="Total Income" value={zmw(totalIncome)} icon={<TrendingUp className="h-4 w-4" />} tone="gold" />
        <StatCard label="Total Expenses" value={zmw(totalExpenses)} icon={<TrendingDown className="h-4 w-4" />} tone="amber" />
        <StatCard label="Tax Payable" value={zmw(incomeTaxPayable)} icon={<Receipt className="h-4 w-4" />} tone="blue" />
        <StatCard
          label="Outstanding Balance"
          value={zmw(outstandingBalance)}
          deltaTone={outstandingBalance > 0 ? "negative" : "positive"}
          delta={outstandingBalance > 0 ? "Payment required" : "All clear"}
          icon={<AlertTriangle className="h-4 w-4" />}
          tone={outstandingBalance > 0 ? "red" : "green"}
        />
      </div>

      <Tabs
        defaultTabId={initialTab}
        tabs={[
          {
            id: "income",
            label: "Income Declaration",
            content: (
              <CategoryAmountTable
                categoryLabel="Income Category"
                values={income}
                onChange={(cat, v) => setIncome((prev) => ({ ...prev, [cat]: v }))}
                total={totalIncome}
                totalLabel="TOTAL INCOME"
              />
            ),
          },
          {
            id: "expense",
            label: "Expense Declaration",
            content: (
              <CategoryAmountTable
                categoryLabel="Expense Category"
                values={expense}
                onChange={(cat, v) => setExpense((prev) => ({ ...prev, [cat]: v }))}
                total={totalExpenses}
                totalLabel="TOTAL EXPENSES"
              />
            ),
          },
          {
            id: "computation",
            label: "Tax Computation",
            content: (
              <div className="overflow-hidden rounded-xl border border-[#EDEFF3] shadow-card">
                <div className="bg-zra-navy px-5 py-3">
                  <h3 className="text-base font-semibold text-white">Tax Computation Summary</h3>
                </div>
                <div className="flex flex-col divide-y divide-slate-100 bg-white px-5 pb-2 text-sm">
                  <Row label="Total Income" value={zmw(totalIncome)} />
                  <Row label="Total Expenses" value={`− ${zmw(totalExpenses)}`} />
                  <Row label="Net Profit" value={zmw(netProfit)} bold />
                  <Row
                    label={
                      <span className="flex items-center gap-2">
                        Non-Allowable Expenses
                        <input
                          type="number"
                          value={nonAllowableExpenses}
                          onChange={(e) => setNonAllowableExpenses(Number(e.target.value))}
                          className="w-28 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
                        />
                      </span>
                    }
                    value={`+ ${zmw(nonAllowableExpenses)}`}
                  />
                  <Row
                    label={
                      <span className="flex items-center gap-2">
                        Capital Allowances
                        <input
                          type="number"
                          value={capitalAllowancesTax}
                          onChange={(e) => setCapitalAllowancesTax(Number(e.target.value))}
                          className="w-28 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
                        />
                      </span>
                    }
                    value={`− ${zmw(capitalAllowancesTax)}`}
                  />
                  <Row label="Taxable Income" value={zmw(taxableIncome)} bold />
                  <Row
                    label={
                      <span className="flex items-center gap-2">
                        Tax Rate
                        <input
                          type="number"
                          value={taxRate}
                          onChange={(e) => setTaxRate(Number(e.target.value))}
                          className="w-16 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
                        />
                        %
                      </span>
                    }
                    value=""
                  />
                  <Row label="Income Tax Payable" value={zmw(incomeTaxPayable)} bold accent />
                </div>
              </div>
            ),
          },
          {
            id: "paye",
            label: "PAYE",
            content: (
              <div className="card flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="Number of Employees" value={employees} onChange={setEmployees} />
                  <NumberField label="Gross Salaries (ZMW)" value={grossSalaries} onChange={setGrossSalaries} />
                  <NumberField label="PAYE Deducted (ZMW)" value={payeDeducted} onChange={setPayeDeducted} />
                  <NumberField label="NAPSA (ZMW)" value={napsa} onChange={setNapsa} />
                  <NumberField label="NHIMA (ZMW)" value={nhima} onChange={setNhima} />
                </div>
                <p className="text-xs italic text-slate-400">Formula: PAYE Liability = PAYE Deducted</p>
                <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">PAYE Liability</span>
                  <span className="text-base font-bold text-zra-gold">{zmw(payeLiability)}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(["Filed", "Paid", "Outstanding"] as const).map((s) => {
                    const selected = payeStatus === s;
                    const selectedTone = s === "Outstanding" ? "border-status-red bg-status-red/10 text-status-red" : "border-status-green bg-status-green/10 text-status-green";
                    return (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setPayeStatus(s)}
                        className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                          selected ? selectedTone : "border-slate-300 text-slate-500 hover:bg-slate-50"
                        }`}
                      >
                        PAYE {s}
                      </button>
                    );
                  })}
                </div>
              </div>
            ),
          },
          {
            id: "vat",
            label: "VAT",
            content: (
              <div className="card flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="Output VAT (ZMW)" value={outputVat} onChange={setOutputVat} />
                  <NumberField label="Input VAT (ZMW)" value={inputVat} onChange={setInputVat} />
                </div>
                <p className="text-xs italic text-slate-400">Formula: Output VAT − Input VAT = VAT Payable</p>
                <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">Net VAT Payable</span>
                  <span className="text-base font-bold text-zra-gold">{zmw(netVatPayable)}</span>
                </div>
              </div>
            ),
          },
          {
            id: "wht",
            label: "Withholding Tax",
            content: (
              <div className="card flex flex-col gap-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="WHT Deducted (ZMW)" value={whtDeducted} onChange={setWhtDeducted} />
                  <NumberField label="WHT Credits (ZMW)" value={whtCredits} onChange={setWhtCredits} />
                </div>
                <p className="text-xs italic text-slate-400">Formula: WHT Deducted − WHT Credits = Net Position</p>
                <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">Net Position</span>
                  <span className="text-base font-bold text-zra-gold">{zmw(whtNetPosition)}</span>
                </div>
              </div>
            ),
          },
          {
            id: "refunds",
            label: "Refund Management",
            content: (
              <div className="card flex flex-col gap-5">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <NumberField label="Tax Credits (ZMW)" value={taxCredits} onChange={setTaxCredits} />
                  <NumberField label="Advance Tax Paid (ZMW)" value={advanceTaxPaid} onChange={setAdvanceTaxPaid} />
                  <NumberField label="WHT Credits (ZMW)" value={whtCredits} onChange={setWhtCredits} />
                  <NumberField label="VAT Credits (ZMW)" value={vatCredits} onChange={setVatCredits} />
                </div>
                <div className="flex items-center justify-between rounded-md bg-slate-50 px-4 py-3">
                  <span className="text-sm font-semibold text-slate-700">Total Credits</span>
                  <span className="text-base font-bold text-slate-900">{zmw(totalCredits)}</span>
                </div>
                {hasRefund ? (
                  <div className="rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
                    Total credits exceed tax payable — a refund of <strong>{zmw(refundAmount)}</strong> has been generated.
                  </div>
                ) : (
                  <div className="rounded-md border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-500">
                    No refund due — total credits do not exceed tax payable.
                  </div>
                )}
                <div>
                  <p className="field-label">Refund Status</p>
                  <RefundStepper currentStep={hasRefund ? refundStep : 0} />
                </div>
              </div>
            ),
          },
          {
            id: "liability",
            label: "Outstanding Liability",
            content: (
              <div
                className={`card flex flex-col gap-4 ${
                  outstandingBalance > 0 ? "border-l-4 border-l-status-red" : "border-l-4 border-l-status-green"
                }`}
              >
                {outstandingBalance === 0 && (
                  <div className="flex items-center gap-2 rounded-md bg-status-green/10 px-4 py-3 text-sm font-medium text-status-green">
                    <CheckCircle2 className="h-4 w-4" /> No outstanding balance — you&apos;re fully up to date.
                  </div>
                )}
                <div className="flex flex-col divide-y divide-slate-100 text-sm">
                  <Row label="Income Tax" value={zmw(incomeTaxPayable)} />
                  <Row label="PAYE" value={zmw(payeLiability)} />
                  <Row label="VAT" value={zmw(Math.max(0, netVatPayable))} />
                  <Row
                    label={
                      <span className="flex items-center gap-2">
                        Penalties
                        <input
                          type="number"
                          value={penalties}
                          onChange={(e) => setPenalties(Number(e.target.value))}
                          className="w-28 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
                        />
                      </span>
                    }
                    value=""
                  />
                  <Row
                    label={
                      <span className="flex items-center gap-2">
                        Interest
                        <input
                          type="number"
                          value={interest}
                          onChange={(e) => setInterest(Number(e.target.value))}
                          className="w-28 rounded-md border border-slate-300 px-2 py-1 text-right text-sm"
                        />
                      </span>
                    }
                    value=""
                  />
                  <Row label="Total Liability" value={zmw(totalLiability)} bold />
                  <Row label="Less Credits" value={`− ${zmw(totalCredits)}`} />
                  <Row
                    label="Outstanding Balance"
                    value={zmw(outstandingBalance)}
                    bold
                    accent
                    accentTone={outstandingBalance > 0 ? "red" : "green"}
                  />
                </div>
              </div>
            ),
          },
        ]}
      />

      <ActionButtons onAction={handleAction} />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}

const ACCENT_COLOR = {
  gold: "text-zra-gold",
  red: "text-status-red",
  green: "text-status-green",
};

function Row({
  label,
  value,
  bold,
  accent,
  accentTone = "gold",
}: {
  label: React.ReactNode;
  value: string;
  bold?: boolean;
  accent?: boolean;
  accentTone?: "gold" | "red" | "green";
}) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <span className={bold ? "font-semibold text-slate-900" : "text-slate-600"}>{label}</span>
      <span className={accent ? `text-lg font-bold ${ACCENT_COLOR[accentTone]}` : bold ? "font-semibold text-slate-900" : "text-slate-700"}>
        {value}
      </span>
    </div>
  );
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="field-label">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="field-input"
      />
    </div>
  );
}
