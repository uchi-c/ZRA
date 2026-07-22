"use client";

import clsx from "clsx";
import {
  Wallet,
  TrendingUp,
  HandCoins,
  AlertTriangle,
  ReceiptText,
  LineChart,
  Percent,
  Globe2,
  Landmark,
  ArrowRight,
  Eye,
  Brain,
} from "lucide-react";
import { DarkPanel } from "@/components/national/DarkPanel";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { DonutChart } from "@/components/national/DonutChart";
import { SimpleBarChart } from "@/components/national/SimpleBarChart";
import { ProgressBar } from "@/components/national/ProgressBar";
import { useTheme } from "@/lib/theme";
import {
  MOFNP_KPIS,
  MOFNP_BUDGET_PERFORMANCE,
  MOFNP_BUDGET_EXECUTION,
  MOFNP_REVENUE_MONITORING,
  MOFNP_EXPENDITURE_CONTROL,
  MOFNP_EXPENDITURE_BREAKDOWN,
  MOFNP_TREASURY_CASH,
  MOFNP_ECONOMIC_AFFAIRS,
  MOFNP_PUBLIC_DEBT,
  MOFNP_PIP_PROJECTS,
  MOFNP_MINISTRY_SCORECARD,
  MOFNP_AI_INTELLIGENCE,
  MOFNP_PRESIDENTIAL_BRIEFING,
  MOFNP_DECISION_SUPPORT,
  type RevenueStreamRow,
} from "@/lib/nationalMockData";

const KPI_ICONS = [Wallet, TrendingUp, HandCoins, AlertTriangle, ReceiptText, LineChart, Percent, Globe2, Landmark];

const revenueColumns: DataTableColumn<RevenueStreamRow>[] = [
  { key: "stream", header: "Revenue Stream", render: (r) => r.stream },
  { key: "amount", header: "Collection", align: "right", render: (r) => r.amount },
  { key: "pct", header: "% of Total", align: "right", render: (r) => `${r.pct}%` },
];

const publicDebtColumns: DataTableColumn<(typeof MOFNP_PUBLIC_DEBT)[number]>[] = [
  { key: "category", header: "Category", render: (r) => r.category },
  { key: "amount", header: "K Billion", align: "right", render: (r) => r.amount.toFixed(1) },
  { key: "pct", header: "%", align: "right", render: (r) => `${r.pct}%` },
];

function FlowStep({ label, isLight }: { label: string; isLight: boolean }) {
  return (
    <div
      className={clsx(
        "rounded-lg border px-3 py-2 text-center text-[11px] font-medium",
        isLight ? "border-slate-200 bg-slate-50 text-slate-700" : "border-white/10 bg-white/[0.03] text-white/80"
      )}
    >
      {label}
    </div>
  );
}

export default function MofnpDashboardPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const arrowClass = clsx("h-3.5 w-3.5", isLight ? "text-slate-300" : "text-white/30");
  const divideClass = isLight ? "divide-slate-100" : "divide-white/5";

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {MOFNP_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          return <StatCard key={kpi.label} theme={theme} animate label={kpi.label} value={kpi.value} sub={kpi.sub} icon={<Icon className="h-4 w-4" />} />;
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DarkPanel title="National Budget Performance" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", divideClass)}>
            {MOFNP_BUDGET_PERFORMANCE.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-500" : "text-white/60"}>{r.label}</span>
                <span
                  className={clsx(
                    "font-semibold",
                    r.tone === "green" ? "text-status-green" : isLight ? "text-slate-900" : "text-white"
                  )}
                >
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Budget Performance Summary" theme={theme}>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <DonutChart
              data={MOFNP_BUDGET_EXECUTION.segments.map((s) => ({ name: s.name, value: s.value, color: s.color }))}
              theme={theme}
              centerLabel={`${MOFNP_BUDGET_EXECUTION.executionRate}%`}
              centerSub="Budget Execution"
              height={160}
            />
            <ul className="flex flex-1 flex-col gap-2 text-xs">
              {MOFNP_BUDGET_EXECUTION.segments.map((s) => (
                <li key={s.name} className="flex items-start justify-between gap-2">
                  <span className={clsx("flex items-center gap-1.5", isLight ? "text-slate-600" : "text-white/70")}>
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </span>
                  <span className={clsx("text-right font-semibold", isLight ? "text-slate-900" : "text-white")}>
                    K{s.value} Billion
                    {s.sub && <span className={clsx("block text-[10px] font-normal", isLight ? "text-slate-400" : "text-white/40")}>{s.sub}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Government Revenue Monitoring (Monthly, May 2025)" theme={theme}>
          <DataTable theme={theme} columns={revenueColumns} data={MOFNP_REVENUE_MONITORING} rowKey={(r) => r.stream} className="mb-4" />
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FlowStep label="Taxpayers" isLight={isLight} />
            <ArrowRight className={arrowClass} />
            <FlowStep label="Zambia Revenue Authority" isLight={isLight} />
            <ArrowRight className={arrowClass} />
            <FlowStep label="Treasury Single Account" isLight={isLight} />
            <ArrowRight className={arrowClass} />
            <FlowStep label="MoFNP Dashboard" isLight={isLight} />
          </div>
        </DarkPanel>

        <DarkPanel title="Government Expenditure Control (Sector, K Billion)" theme={theme}>
          <SimpleBarChart data={MOFNP_EXPENDITURE_CONTROL} theme={theme} color="#EF7D00" height={180} />
          <div
            className={clsx(
              "mt-3 flex items-center justify-between rounded-lg px-3 py-2 text-xs",
              isLight ? "bg-slate-50" : "bg-white/5"
            )}
          >
            <span className={isLight ? "text-slate-500" : "text-white/60"}>{MOFNP_EXPENDITURE_BREAKDOWN.total}</span>
            <span className="flex gap-3">
              <span className="text-status-green">Recurrent {MOFNP_EXPENDITURE_BREAKDOWN.recurrent}%</span>
              <span className="text-status-amber">Capital {MOFNP_EXPENDITURE_BREAKDOWN.capital}%</span>
            </span>
          </div>
        </DarkPanel>

        <DarkPanel title="Treasury Cash Management" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", divideClass)}>
            {MOFNP_TREASURY_CASH.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-500" : "text-white/60"}>{r.label}</span>
                <span
                  className={clsx(
                    "font-semibold",
                    r.tone === "green" ? "text-status-green" : isLight ? "text-slate-900" : "text-white"
                  )}
                >
                  {r.value}
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Economic Affairs Monitoring" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", divideClass)}>
            {MOFNP_ECONOMIC_AFFAIRS.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-500" : "text-white/60"}>{r.label}</span>
                <span className={clsx("flex items-center gap-1 font-semibold", isLight ? "text-slate-900" : "text-white")}>
                  {r.value}
                  <span className={r.trend === "up" ? "text-status-green" : "text-status-red"}>{r.trend === "up" ? "▲" : "▼"}</span>
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Public Debt Management (April 2025)" theme={theme}>
          <DataTable theme={theme} columns={publicDebtColumns} data={MOFNP_PUBLIC_DEBT} rowKey={(r) => r.category} />
          <p className="mt-3 rounded-lg bg-status-amber/10 px-3 py-2 text-center text-xs font-semibold text-status-amber">
            Debt / GDP Ratio 75% — Moderate Risk
          </p>
        </DarkPanel>

        <DarkPanel title="Public Investment Programme (PIP) — Top Projects" theme={theme}>
          <ul className="flex flex-col gap-3">
            {MOFNP_PIP_PROJECTS.map((p) => (
              <li key={p.project} className="text-xs">
                <div className="mb-1 flex items-center justify-between">
                  <span className={clsx("flex items-center gap-1.5", isLight ? "text-slate-700" : "text-white/80")}>
                    <span
                      className={clsx(
                        "h-1.5 w-1.5 rounded-full",
                        p.status === "green" ? "bg-status-green" : p.status === "amber" ? "bg-status-amber" : "bg-status-red"
                      )}
                    />
                    {p.project}
                  </span>
                  <span className={isLight ? "text-slate-400" : "text-white/50"}>
                    K{p.budget.toFixed(1)}B · {p.progress}%
                  </span>
                </div>
                <ProgressBar value={p.progress} theme={theme} tone={p.status === "green" ? "green" : p.status === "amber" ? "amber" : "red"} />
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Ministry Performance Scorecard (YTD)" theme={theme}>
          <ul className="flex flex-col gap-3">
            {MOFNP_MINISTRY_SCORECARD.map((m) => (
              <li key={m.label} className="text-xs">
                <div className="mb-1 flex items-center justify-between">
                  <span className={isLight ? "text-slate-600" : "text-white/70"}>{m.label}</span>
                  <span className={clsx("font-semibold", isLight ? "text-slate-900" : "text-white")}>{m.value}%</span>
                </div>
                <ProgressBar value={m.value} theme={theme} tone="green" />
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-status-green/10 px-3 py-2 text-center text-xs font-semibold text-status-green">Overall Performance 82%</p>
        </DarkPanel>

        <DarkPanel
          title="National Budget Transparency Portal"
          theme={theme}
          icon={<Eye className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
        >
          <p className={clsx("mb-3 text-xs", isLight ? "text-slate-400" : "text-white/50")}>From Taxes to Community Benefits</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="Taxes Collected" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="Government Revenue" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="National Budget" isLight={isLight} />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="Ministry Allocations" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="Projects in Districts" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="Community Benefits" isLight={isLight} />
            </div>
          </div>
          <p className={clsx("mt-3 text-center text-[11px] uppercase tracking-wide", isLight ? "text-slate-400" : "text-white/40")}>
            Transparency · Accountability · Citizen Engagement
          </p>
          <a href="/budget" className="btn-primary mt-3 w-full justify-center">
            Visit Public Portal
          </a>
        </DarkPanel>

        <DarkPanel
          title="Integrated Government Financial Management System (IFMIS)"
          theme={theme}
          icon={<Landmark className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="ZRA Tax Revenue" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="Bank of Zambia" isLight={isLight} />
              <ArrowRight className={arrowClass} />
              <FlowStep label="PACRA" isLight={isLight} />
            </div>
            <ArrowRight className={clsx(arrowClass, "rotate-90")} />
            <FlowStep label="MoFNP IFMIS Core" isLight={isLight} />
            <ArrowRight className={clsx(arrowClass, "rotate-90")} />
            <FlowStep label="National Economic Dashboard" isLight={isLight} />
            <ArrowRight className={clsx(arrowClass, "rotate-90")} />
            <FlowStep label="Presidential Decision Support System" isLight={isLight} />
          </div>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DarkPanel
          title="AI Economic Intelligence Centre"
          theme={theme}
          icon={<Brain className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
        >
          <p className={clsx("mb-3 text-xs", isLight ? "text-slate-400" : "text-white/50")}>Predictive Analytics &amp; Risk Assessment</p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MOFNP_AI_INTELLIGENCE.map((item) => (
              <li key={item} className={clsx("flex items-center gap-2 text-xs", isLight ? "text-slate-700" : "text-white/80")}>
                <span className="text-status-green">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href="#" className="mt-3 inline-block text-xs font-semibold text-zra-gold hover:underline">
            View AI Insights →
          </a>
        </DarkPanel>

        <DarkPanel title="Presidential / Cabinet Briefing Panel" theme={theme}>
          <p className={clsx("mb-3 text-xs", isLight ? "text-slate-400" : "text-white/50")}>National Economic Status</p>
          <ul className={clsx("mb-4 flex flex-col divide-y", divideClass)}>
            {MOFNP_PRESIDENTIAL_BRIEFING.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-600" : "text-white/70"}>{r.label}</span>
                <Pill theme={theme} tone={r.tone === "green" ? "green" : "amber"} label={r.status} />
              </li>
            ))}
          </ul>
          <p className={clsx("mb-2 text-[11px] font-semibold uppercase tracking-wide", isLight ? "text-slate-400" : "text-white/40")}>
            Decision Support
          </p>
          <div className="flex flex-wrap gap-2">
            {MOFNP_DECISION_SUPPORT.map((d) => (
              <span
                key={d}
                className={clsx(
                  "rounded-full border px-2.5 py-1 text-[11px]",
                  isLight ? "border-slate-200 bg-slate-50 text-slate-600" : "border-white/10 bg-white/[0.03] text-white/70"
                )}
              >
                {d}
              </span>
            ))}
          </div>
        </DarkPanel>
      </section>
    </div>
  );
}
