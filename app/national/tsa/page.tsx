"use client";

import {
  Wallet,
  TrendingUp,
  Landmark,
  Users,
  Briefcase,
  UserCheck,
  Building2,
  HeartPulse,
  Share2,
  Globe2,
} from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatCard } from "@/components/ui/StatCard";
import { Pill } from "@/components/ui/Pill";
import { DonutChart } from "@/components/national/DonutChart";
import { DonutLegend } from "@/components/national/DonutLegend";
import { ProgressBar } from "@/components/national/ProgressBar";
import { useTheme } from "@/lib/theme";
import {
  TSA_KPIS,
  TSA_REVENUE_SUMMARY,
  TSA_REVENUE_BY_TYPE,
  TSA_BUDGET_ALLOCATION,
  TSA_MINISTRY_TRACKERS,
  TSA_PROVINCIAL_ALLOCATION,
  TSA_PROJECT_MONITORING,
  TSA_TAXPAYER_TRANSPARENCY,
  TSA_TREASURY_KPIS,
  TSA_SYSTEM_INTEGRATIONS,
  type RevenueSummaryRow,
  type BudgetAllocationRow,
  type ProvincialAllocationRow,
  type ProjectMonitoringRow,
} from "@/lib/nationalMockData";

const formatK = (n: number) => `K ${n.toLocaleString("en-US")}`;

const KPI_ICONS = [Wallet, TrendingUp, TrendingUp, Users, Briefcase, UserCheck];

const revenueColumns: DataTableColumn<RevenueSummaryRow>[] = [
  { key: "taxType", header: "Tax Type", render: (r) => r.taxType },
  { key: "daily", header: "Daily Collection (K)", align: "right", render: (r) => r.daily.toLocaleString() },
  { key: "monthly", header: "Monthly Collection (K)", align: "right", render: (r) => r.monthly.toLocaleString() },
  { key: "annual", header: "Annual Collection (K)", align: "right", render: (r) => r.annual.toLocaleString() },
];

const budgetColumns: DataTableColumn<BudgetAllocationRow>[] = [
  { key: "ministry", header: "Ministry / Sector", render: (r) => r.ministry },
  { key: "pct", header: "Allocation %", align: "right", render: (r) => `${r.pct}%` },
  { key: "amount", header: "Budget Allocation (K)", align: "right", render: (r) => r.amount.toLocaleString() },
  {
    key: "progress",
    header: "Progress",
    render: (r) => (
      <div className="flex items-center gap-2">
        <ProgressBar value={r.progress} tone="green" className="w-24" />
        <span className="text-xs text-slate-500">{r.progress}%</span>
      </div>
    ),
  },
];

const provincialColumns: DataTableColumn<ProvincialAllocationRow>[] = [
  { key: "province", header: "Province", render: (r) => r.province },
  { key: "amount", header: "Allocation (K)", align: "right", render: (r) => r.amount.toLocaleString() },
  { key: "pct", header: "% of Total", align: "right", render: (r) => `${r.pct}%` },
];

const projectColumns: DataTableColumn<ProjectMonitoringRow>[] = [
  { key: "project", header: "Project", render: (r) => r.project },
  { key: "budget", header: "Budget (K)", align: "right", render: (r) => r.budget.toLocaleString() },
  {
    key: "status",
    header: "Status",
    render: (r) => (
      <Pill label={r.status} tone={r.status === "On Track" ? "green" : r.status === "In Progress" ? "amber" : "red"} />
    ),
  },
  {
    key: "progress",
    header: "Progress",
    render: (r) => (
      <div className="flex items-center gap-2">
        <ProgressBar value={r.progress} tone="green" className="w-24" />
        <span className="text-xs text-slate-500">{r.progress}%</span>
      </div>
    ),
  },
];

const provincialTotal = TSA_PROVINCIAL_ALLOCATION.reduce((s, r) => s + r.amount, 0);
const provincialTotalPct = TSA_PROVINCIAL_ALLOCATION.reduce((s, r) => s + r.pct, 0);
const revenueTotals = TSA_REVENUE_SUMMARY.reduce(
  (acc, r) => ({ daily: acc.daily + r.daily, monthly: acc.monthly + r.monthly, annual: acc.annual + r.annual }),
  { daily: 0, monthly: 0, annual: 0 }
);
const budgetTotal = TSA_BUDGET_ALLOCATION.reduce((s, r) => s + r.amount, 0);

export default function TsaDashboardPage() {
  const { theme } = useTheme();
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        {TSA_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          return (
            <StatCard
              key={kpi.label}
              theme={theme}
              animate
              label={kpi.label}
              value={kpi.value}
              delta={kpi.delta}
              deltaTone={kpi.deltaTone}
              icon={<Icon className="h-4 w-4" />}
            />
          );
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="card xl:col-span-1">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Revenue Collection Summary</h2>
          <DataTable
            theme={theme}
            columns={revenueColumns}
            data={[
              ...TSA_REVENUE_SUMMARY,
              { taxType: "TOTAL", daily: revenueTotals.daily, monthly: revenueTotals.monthly, annual: revenueTotals.annual },
            ]}
            rowKey={(r) => r.taxType}
          />
        </div>

        <div className="card">
          <div className="mb-1 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Revenue by Tax Type (This Year)</h2>
            <span className="text-xs text-slate-400">Total: 100%</span>
          </div>
          <DonutChart data={TSA_REVENUE_BY_TYPE} theme={theme} centerLabel="K150B" centerSub="Total Collection" />
          <DonutLegend data={TSA_REVENUE_BY_TYPE} theme={theme} />
        </div>

        <div className="card">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">National Budget Allocation</h2>
            <span className="text-xs text-slate-400">Total Annual Revenue Available: {formatK(budgetTotal)}</span>
          </div>
          <DataTable theme={theme} columns={budgetColumns} data={TSA_BUDGET_ALLOCATION} rowKey={(r) => r.ministry} />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="flex flex-col gap-4 xl:col-span-1">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Ministry Allocation Tracker</h2>
          {TSA_MINISTRY_TRACKERS.map((m) => (
            <div key={m.ministry} className={`card border-l-4 ${m.tone === "navy" ? "border-l-zra-navy" : "border-l-status-red"}`}>
              <div className="mb-3 flex items-center gap-2">
                {m.ministry.includes("Education") ? (
                  <Building2 className="h-4 w-4 text-zra-navy" />
                ) : (
                  <HeartPulse className="h-4 w-4 text-status-red" />
                )}
                <div>
                  <p className="text-sm font-semibold text-slate-900">{m.ministry}</p>
                  <p className="text-xs text-slate-400">Allocated Budget {formatK(m.allocated)}</p>
                </div>
              </div>
              <ul className="mb-3 flex flex-col gap-1 text-xs text-slate-600">
                {m.programs.map((p) => (
                  <li key={p.name} className="flex justify-between">
                    <span>{p.name}</span>
                    <span className="font-semibold text-slate-800">{formatK(p.amount)}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col gap-1.5 border-t border-slate-100 pt-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-green" /> Budget Released
                  </span>
                  <span className="font-semibold text-slate-800">{m.released}%</span>
                </div>
                <ProgressBar value={m.released} tone="green" />
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-slate-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-status-amber" /> Pending Release
                  </span>
                  <span className="font-semibold text-slate-800">{m.pending}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Provincial Allocation Dashboard</h2>
          <DataTable
            theme={theme}
            columns={provincialColumns}
            data={[...TSA_PROVINCIAL_ALLOCATION, { province: "TOTAL", amount: provincialTotal, pct: provincialTotalPct }]}
            rowKey={(r) => r.province}
          />
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Project Monitoring Dashboard</h2>
          <DataTable theme={theme} columns={projectColumns} data={TSA_PROJECT_MONITORING} rowKey={(r) => r.project} />
          <a href="#" className="mt-3 inline-block text-xs font-semibold text-zra-navy hover:underline">
            View All Projects →
          </a>
        </div>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Taxpayer Transparency Portal</h2>
          <p className="mb-3 text-xs text-slate-400">See how your tax was used</p>
          <div className="mb-4 flex items-center gap-3 rounded-lg bg-slate-50 p-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zra-navy/10 text-zra-navy">
              <Users className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs text-slate-400">Taxpayer TPIN {TSA_TAXPAYER_TRANSPARENCY.tpin}</p>
              <p className="text-sm font-bold text-slate-900">Total Tax Paid This Year K{TSA_TAXPAYER_TRANSPARENCY.totalPaid.toLocaleString()}</p>
            </div>
          </div>
          <ul className="flex flex-col gap-1.5 text-xs">
            {TSA_TAXPAYER_TRANSPARENCY.sectors.map((s) => (
              <li key={s.sector} className="flex justify-between text-slate-600">
                <span>{s.sector}</span>
                <span className="font-semibold text-slate-800">
                  {s.amount.toLocaleString()} · {s.pct}%
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Treasury Analytics Center (KPIs)</h2>
          <ul className="flex flex-col divide-y divide-slate-100 text-xs">
            {TSA_TREASURY_KPIS.map((k) => (
              <li key={k.indicator} className="flex items-center justify-between gap-2 py-1.5">
                <span className="text-slate-600">{k.indicator}</span>
                <span className="text-slate-400">Target {k.target}</span>
                <Pill theme={theme} label={k.actual} tone={k.status === "green" ? "green" : "amber"} />
              </li>
            ))}
          </ul>
        </div>

        <div className="card">
          <div className="mb-3 flex items-center gap-2">
            <Share2 className="h-4 w-4 text-zra-navy" />
            <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">System Integrations</h2>
          </div>
          <div className="flex flex-col items-center gap-3 text-xs">
            <div className="flex items-center gap-2 rounded-lg bg-zra-navy px-3 py-2 font-semibold text-white">
              <Landmark className="h-4 w-4" /> ZRA Tax System
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="flex items-center gap-2 rounded-lg bg-zra-navy-dark px-3 py-2 font-semibold text-white">
              <Globe2 className="h-4 w-4" /> Treasury Single Account
            </div>
            <div className="h-4 w-px bg-slate-300" />
            <div className="grid w-full grid-cols-2 gap-2">
              {TSA_SYSTEM_INTEGRATIONS.map((s) => (
                <span key={s} className="flex items-center gap-1.5 rounded-md border border-slate-200 px-2 py-1.5 text-center text-[11px] font-medium text-slate-600">
                  <span className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green/60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-status-green" />
                  </span>
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
