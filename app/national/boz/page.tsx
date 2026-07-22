"use client";

import {
  Percent,
  TrendingUp,
  DollarSign,
  Globe2,
  Landmark,
  ReceiptText,
  Droplets,
  Coins,
  LineChart,
  Network,
  Brain,
} from "lucide-react";
import { DarkPanel } from "@/components/national/DarkPanel";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { DonutChart } from "@/components/national/DonutChart";
import { DonutLegend } from "@/components/national/DonutLegend";
import { SimpleBarChart } from "@/components/national/SimpleBarChart";
import {
  BOZ_KPIS,
  BOZ_ECONOMIC_OVERVIEW,
  BOZ_TSA_MONITORING,
  BOZ_DAILY_REVENUE_BY_SOURCE,
  BOZ_FOREX_RESERVES,
  BOZ_BANKING_SECTOR,
  BOZ_BANKING_INDUSTRY_SUMMARY,
  BOZ_FX_RATES,
  BOZ_MONETARY_POLICY,
  BOZ_PUBLIC_DEBT,
  BOZ_DEBT_MATURITY,
  BOZ_GOVERNMENT_CASH_FLOW,
  BOZ_EARLY_WARNING,
  BOZ_SYSTEM_INTEGRATIONS,
  BOZ_AI_ENGINE,
  type FxRateRow,
} from "@/lib/nationalMockData";

const fxColumns: DataTableColumn<FxRateRow>[] = [
  { key: "currency", header: "Currency", render: (r) => `${r.flag} ${r.currency}` },
  { key: "buy", header: "Buy", align: "right", render: (r) => r.buy },
  { key: "sell", header: "Sell", align: "right", render: (r) => r.sell },
  { key: "change", header: "Change", align: "right", render: (r) => <span className="font-semibold text-status-green">{r.change}</span> },
];

const KPI_ICONS = [Percent, TrendingUp, DollarSign, Globe2, Landmark, ReceiptText, Droplets, Coins, LineChart];

const dailyRevenueTotal = BOZ_DAILY_REVENUE_BY_SOURCE.reduce((s, r) => s + r.value, 0);

function StatRow({ label, value, tone }: { label: string; value: string; tone?: "green" | "red" }) {
  return (
    <li className="flex items-center justify-between gap-2 py-1.5 text-xs">
      <span className="text-white/60">{label}</span>
      <span className={tone === "green" ? "font-semibold text-status-green" : tone === "red" ? "font-semibold text-status-red" : "font-semibold text-white"}>
        {value}
      </span>
    </li>
  );
}

export default function BozDashboardPage() {
  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {BOZ_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          return <StatCard key={kpi.label} theme="dark" animate label={kpi.label} value={kpi.value} sub={kpi.sub} icon={<Icon className="h-4 w-4" />} />;
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="National Economic Overview">
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_ECONOMIC_OVERVIEW.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/60">{r.label}</span>
                <span className="flex items-center gap-1 font-semibold text-white">
                  {r.value}
                  <span className={r.status === "amber" ? "text-status-amber" : "text-status-green"}>{r.trend === "up" ? "▲" : "▼"}</span>
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Treasury Single Account (TSA) Monitoring" icon={<Landmark className="h-4 w-4 text-white/60" />}>
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_TSA_MONITORING.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} tone={r.tone} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Daily Revenue Collections (By Source)">
          <DonutChart data={BOZ_DAILY_REVENUE_BY_SOURCE.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme="dark" centerLabel="" height={140} />
          <DonutLegend data={BOZ_DAILY_REVENUE_BY_SOURCE.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme="dark" />
          <p className="mt-3 rounded-lg bg-zra-gold/10 px-3 py-2 text-center text-xs font-semibold text-zra-gold">
            Total Daily Revenue K{dailyRevenueTotal.toLocaleString()}
          </p>
        </DarkPanel>

        <DarkPanel title="Foreign Exchange Reserves" icon={<Globe2 className="h-4 w-4 text-white/60" />}>
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_FOREX_RESERVES.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} />
            ))}
          </ul>
          <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white">Total Reserves USD 5.2 Billion</p>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="Commercial Banking Sector">
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_BANKING_SECTOR.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Banking Industry Summary (K Billion)">
          <SimpleBarChart data={BOZ_BANKING_INDUSTRY_SUMMARY} theme="dark" color="#C9A24A" height={200} />
        </DarkPanel>

        <DarkPanel title="Foreign Exchange Market (Live Rates)">
          <DataTable theme="dark" columns={fxColumns} data={BOZ_FX_RATES} rowKey={(r) => r.currency} />
        </DarkPanel>

        <DarkPanel title="Monetary Policy Dashboard">
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_MONETARY_POLICY.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} />
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="Public Debt Monitoring">
          <DonutChart
            data={BOZ_PUBLIC_DEBT.map((d) => ({ name: d.name, value: d.pct, color: d.color }))}
            theme="dark"
            centerLabel="K650 Bn"
            centerSub="Total Debt"
            height={150}
          />
          <DonutLegend data={BOZ_PUBLIC_DEBT.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme="dark" />
          <p className="mt-3 rounded-lg bg-white/5 px-3 py-2 text-center text-xs font-semibold text-white">Debt-to-GDP Ratio 68.5%</p>
        </DarkPanel>

        <DarkPanel title="Debt Portfolio Maturity Profile (K Billion)">
          <SimpleBarChart data={BOZ_DEBT_MATURITY} theme="dark" color="#0EA5E9" height={200} />
        </DarkPanel>

        <DarkPanel title="Government Cash Flow (Month to Date)">
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_GOVERNMENT_CASH_FLOW.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} tone={r.tone} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Early Warning & Financial Stability">
          <ul className="flex flex-col divide-y divide-white/5">
            {BOZ_EARLY_WARNING.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className="text-white/60">{r.label}</span>
                <Pill theme="dark" tone={r.status === "green" ? "green" : "amber"} label={r.status === "green" ? "Low" : "Moderate"} />
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel
          title="System Integration & Data Connectivity"
          icon={<Network className="h-4 w-4 text-white/60" />}
          className="xl:col-span-2"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BOZ_SYSTEM_INTEGRATIONS.map((s) => (
              <div key={s} className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-xs text-white/80">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green" />
                </span>
                {s}
                <Pill theme="dark" tone="green" label="Connected" className="ml-auto px-2 py-0.5 text-[10px]" />
              </div>
            ))}
          </div>
        </DarkPanel>

        <DarkPanel title="AI & Analytics Engine" icon={<Brain className="h-4 w-4 text-white/60" />}>
          <ul className="flex flex-col gap-2">
            {BOZ_AI_ENGINE.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 text-xs">
                <span className="text-white/70">{r.label}</span>
                <span className={r.status === "green" ? "text-status-green" : "text-status-amber"}>{r.status === "green" ? "✓" : "△"}</span>
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>
    </div>
  );
}
