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
import { CommandStat } from "@/components/national/CommandStat";
import { DonutChart } from "@/components/national/DonutChart";
import { SimpleBarChart } from "@/components/national/SimpleBarChart";
import { ProgressBar } from "@/components/national/ProgressBar";
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
} from "@/lib/nationalMockData";

const KPI_ICONS = [Wallet, TrendingUp, HandCoins, AlertTriangle, ReceiptText, LineChart, Percent, Globe2, Landmark];

const STATUS_DOT = { green: "bg-status-green", amber: "bg-status-amber", red: "bg-status-red" } as const;

function FlowStep({ label }: { label: string }) {
  return <div className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-center text-[11px] font-medium text-white/80">{label}</div>;
}

export default function MofnpDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {MOFNP_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          return <CommandStat key={kpi.label} theme="dark" label={kpi.label} value={kpi.value} sub={kpi.sub} icon={<Icon className="h-4 w-4" />} />;
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DarkPanel title="National Budget Performance">
          <ul className="flex flex-col divide-y divide-white/5">
            {MOFNP_BUDGET_PERFORMANCE.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/60">{r.label}</span>
                <span className={r.tone === "green" ? "font-semibold text-status-green" : "font-semibold text-white"}>{r.value}</span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Budget Performance Summary">
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <DonutChart
              data={MOFNP_BUDGET_EXECUTION.segments.map((s) => ({ name: s.name, value: s.value, color: s.color }))}
              theme="dark"
              centerLabel={`${MOFNP_BUDGET_EXECUTION.executionRate}%`}
              centerSub="Budget Execution"
              height={160}
            />
            <ul className="flex flex-1 flex-col gap-2 text-xs">
              {MOFNP_BUDGET_EXECUTION.segments.map((s) => (
                <li key={s.name} className="flex items-start justify-between gap-2">
                  <span className="flex items-center gap-1.5 text-white/70">
                    <span className="mt-0.5 h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: s.color }} />
                    {s.name}
                  </span>
                  <span className="text-right font-semibold text-white">
                    K{s.value} Billion
                    {s.sub && <span className="block text-[10px] font-normal text-white/40">{s.sub}</span>}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Government Revenue Monitoring (Monthly, May 2025)">
          <table className="mb-4 w-full text-xs">
            <thead>
              <tr className="text-white/40">
                <th className="pb-2 text-left font-medium">Revenue Stream</th>
                <th className="pb-2 text-right font-medium">Collection</th>
                <th className="pb-2 text-right font-medium">% of Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOFNP_REVENUE_MONITORING.map((r) => (
                <tr key={r.stream}>
                  <td className="py-1.5 text-white/80">{r.stream}</td>
                  <td className="py-1.5 text-right text-white">{r.amount}</td>
                  <td className="py-1.5 text-right text-white/60">{r.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <FlowStep label="Taxpayers" />
            <ArrowRight className="h-3.5 w-3.5 text-white/30" />
            <FlowStep label="Zambia Revenue Authority" />
            <ArrowRight className="h-3.5 w-3.5 text-white/30" />
            <FlowStep label="Treasury Single Account" />
            <ArrowRight className="h-3.5 w-3.5 text-white/30" />
            <FlowStep label="MoFNP Dashboard" />
          </div>
        </DarkPanel>

        <DarkPanel title="Government Expenditure Control (Sector, K Billion)">
          <SimpleBarChart data={MOFNP_EXPENDITURE_CONTROL} theme="dark" color="#EF7D00" height={180} />
          <div className="mt-3 flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs">
            <span className="text-white/60">{MOFNP_EXPENDITURE_BREAKDOWN.total}</span>
            <span className="flex gap-3">
              <span className="text-status-green">Recurrent {MOFNP_EXPENDITURE_BREAKDOWN.recurrent}%</span>
              <span className="text-status-amber">Capital {MOFNP_EXPENDITURE_BREAKDOWN.capital}%</span>
            </span>
          </div>
        </DarkPanel>

        <DarkPanel title="Treasury Cash Management">
          <ul className="flex flex-col divide-y divide-white/5">
            {MOFNP_TREASURY_CASH.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/60">{r.label}</span>
                <span className={r.tone === "green" ? "font-semibold text-status-green" : "font-semibold text-white"}>{r.value}</span>
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Economic Affairs Monitoring">
          <ul className="flex flex-col divide-y divide-white/5">
            {MOFNP_ECONOMIC_AFFAIRS.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/60">{r.label}</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  {r.value}
                  <span className={r.trend === "up" ? "text-status-green" : "text-status-red"}>{r.trend === "up" ? "▲" : "▼"}</span>
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Public Debt Management (April 2025)">
          <table className="w-full text-xs">
            <thead>
              <tr className="text-white/40">
                <th className="pb-2 text-left font-medium">Category</th>
                <th className="pb-2 text-right font-medium">K Billion</th>
                <th className="pb-2 text-right font-medium">%</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {MOFNP_PUBLIC_DEBT.map((r) => (
                <tr key={r.category}>
                  <td className="py-1.5 text-white/80">{r.category}</td>
                  <td className="py-1.5 text-right text-white">{r.amount.toFixed(1)}</td>
                  <td className="py-1.5 text-right text-white/60">{r.pct}%</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-3 rounded-lg bg-status-amber/10 px-3 py-2 text-center text-xs font-semibold text-status-amber">
            Debt / GDP Ratio 75% — Moderate Risk
          </p>
        </DarkPanel>

        <DarkPanel title="Public Investment Programme (PIP) — Top Projects">
          <ul className="flex flex-col gap-3">
            {MOFNP_PIP_PROJECTS.map((p) => (
              <li key={p.project} className="text-xs">
                <div className="mb-1 flex items-center justify-between">
                  <span className="flex items-center gap-1.5 text-white/80">
                    <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                    {p.project}
                  </span>
                  <span className="text-white/50">K{p.budget.toFixed(1)}B · {p.progress}%</span>
                </div>
                <ProgressBar value={p.progress} theme="dark" tone={p.status === "green" ? "green" : p.status === "amber" ? "amber" : "red"} />
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel title="Ministry Performance Scorecard (YTD)">
          <ul className="flex flex-col gap-3">
            {MOFNP_MINISTRY_SCORECARD.map((m) => (
              <li key={m.label} className="text-xs">
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-white/70">{m.label}</span>
                  <span className="font-semibold text-white">{m.value}%</span>
                </div>
                <ProgressBar value={m.value} theme="dark" tone="green" />
              </li>
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-status-green/10 px-3 py-2 text-center text-xs font-semibold text-status-green">Overall Performance 82%</p>
        </DarkPanel>

        <DarkPanel title="National Budget Transparency Portal" icon={<Eye className="h-4 w-4 text-white/60" />}>
          <p className="mb-3 text-xs text-white/50">From Taxes to Community Benefits</p>
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="Taxes Collected" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="Government Revenue" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="National Budget" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="Ministry Allocations" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="Projects in Districts" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="Community Benefits" />
            </div>
          </div>
          <p className="mt-3 text-center text-[11px] uppercase tracking-wide text-white/40">Transparency · Accountability · Citizen Engagement</p>
          <a href="/budget" className="btn-primary mt-3 w-full justify-center">
            Visit Public Portal
          </a>
        </DarkPanel>

        <DarkPanel title="Integrated Government Financial Management System (IFMIS)" icon={<Landmark className="h-4 w-4 text-white/60" />}>
          <div className="flex flex-col items-center gap-2">
            <div className="flex flex-wrap items-center justify-center gap-2">
              <FlowStep label="ZRA Tax Revenue" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="Bank of Zambia" />
              <ArrowRight className="h-3.5 w-3.5 text-white/30" />
              <FlowStep label="PACRA" />
            </div>
            <ArrowRight className="h-3.5 w-3.5 rotate-90 text-white/30" />
            <FlowStep label="MoFNP IFMIS Core" />
            <ArrowRight className="h-3.5 w-3.5 rotate-90 text-white/30" />
            <FlowStep label="National Economic Dashboard" />
            <ArrowRight className="h-3.5 w-3.5 rotate-90 text-white/30" />
            <FlowStep label="Presidential Decision Support System" />
          </div>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <DarkPanel title="AI Economic Intelligence Centre" icon={<Brain className="h-4 w-4 text-white/60" />}>
          <p className="mb-3 text-xs text-white/50">Predictive Analytics &amp; Risk Assessment</p>
          <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
            {MOFNP_AI_INTELLIGENCE.map((item) => (
              <li key={item} className="flex items-center gap-2 text-xs text-white/80">
                <span className="text-status-green">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <a href="#" className="mt-3 inline-block text-xs font-semibold text-zra-gold hover:underline">
            View AI Insights →
          </a>
        </DarkPanel>

        <DarkPanel title="Presidential / Cabinet Briefing Panel">
          <p className="mb-3 text-xs text-white/50">National Economic Status</p>
          <ul className="mb-4 flex flex-col divide-y divide-white/5">
            {MOFNP_PRESIDENTIAL_BRIEFING.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/70">{r.label}</span>
                <span className={`flex items-center gap-1.5 font-semibold ${r.tone === "green" ? "text-status-green" : "text-status-amber"}`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${STATUS_DOT[r.tone]}`} />
                  {r.status}
                </span>
              </li>
            ))}
          </ul>
          <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-white/40">Decision Support</p>
          <div className="flex flex-wrap gap-2">
            {MOFNP_DECISION_SUPPORT.map((d) => (
              <span key={d} className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-white/70">
                {d}
              </span>
            ))}
          </div>
        </DarkPanel>
      </section>
    </div>
  );
}
