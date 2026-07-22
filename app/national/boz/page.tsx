"use client";

import clsx from "clsx";
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
import { useTheme } from "@/lib/theme";
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

function StatRow({
  label,
  value,
  tone,
  isLight,
}: {
  label: string;
  value: string;
  tone?: "green" | "red";
  isLight: boolean;
}) {
  return (
    <li className="flex items-center justify-between gap-2 py-1.5 text-xs">
      <span className={isLight ? "text-slate-500" : "text-white/60"}>{label}</span>
      <span
        className={clsx(
          "font-semibold",
          tone === "green" ? "text-status-green" : tone === "red" ? "text-status-red" : isLight ? "text-slate-900" : "text-white"
        )}
      >
        {value}
      </span>
    </li>
  );
}

export default function BozDashboardPage() {
  const { theme } = useTheme();
  const isLight = theme === "light";

  return (
    <div className="flex flex-col gap-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-5">
        {BOZ_KPIS.map((kpi, i) => {
          const Icon = KPI_ICONS[i];
          return <StatCard key={kpi.label} theme={theme} animate label={kpi.label} value={kpi.value} sub={kpi.sub} icon={<Icon className="h-4 w-4" />} />;
        })}
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="National Economic Overview" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_ECONOMIC_OVERVIEW.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-500" : "text-white/60"}>{r.label}</span>
                <span className={clsx("flex items-center gap-1 font-semibold", isLight ? "text-slate-900" : "text-white")}>
                  {r.value}
                  <span className={r.status === "amber" ? "text-status-amber" : "text-status-green"}>{r.trend === "up" ? "▲" : "▼"}</span>
                </span>
              </li>
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel
          title="Treasury Single Account (TSA) Monitoring"
          theme={theme}
          icon={<Landmark className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
        >
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_TSA_MONITORING.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} tone={r.tone} isLight={isLight} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Daily Revenue Collections (By Source)" theme={theme}>
          <DonutChart data={BOZ_DAILY_REVENUE_BY_SOURCE.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme={theme} centerLabel="" height={140} />
          <DonutLegend data={BOZ_DAILY_REVENUE_BY_SOURCE.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme={theme} />
          <p
            className={clsx(
              "mt-3 rounded-lg px-3 py-2 text-center text-xs font-semibold text-zra-gold",
              isLight ? "bg-zra-gold/10" : "bg-zra-gold/10"
            )}
          >
            Total Daily Revenue K{dailyRevenueTotal.toLocaleString()}
          </p>
        </DarkPanel>

        <DarkPanel
          title="Foreign Exchange Reserves"
          theme={theme}
          icon={<Globe2 className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
        >
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_FOREX_RESERVES.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} isLight={isLight} />
            ))}
          </ul>
          <p
            className={clsx(
              "mt-3 rounded-lg px-3 py-2 text-center text-xs font-semibold",
              isLight ? "bg-zra-navy/5 text-zra-navy" : "bg-white/5 text-white"
            )}
          >
            Total Reserves USD 5.2 Billion
          </p>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="Commercial Banking Sector" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_BANKING_SECTOR.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} isLight={isLight} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Banking Industry Summary (K Billion)" theme={theme}>
          <SimpleBarChart data={BOZ_BANKING_INDUSTRY_SUMMARY} theme={theme} color="#C9A24A" height={200} />
        </DarkPanel>

        <DarkPanel title="Foreign Exchange Market (Live Rates)" theme={theme}>
          <DataTable theme={theme} columns={fxColumns} data={BOZ_FX_RATES} rowKey={(r) => r.currency} />
        </DarkPanel>

        <DarkPanel title="Monetary Policy Dashboard" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_MONETARY_POLICY.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} isLight={isLight} />
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-4">
        <DarkPanel title="Public Debt Monitoring" theme={theme}>
          <DonutChart
            data={BOZ_PUBLIC_DEBT.map((d) => ({ name: d.name, value: d.pct, color: d.color }))}
            theme={theme}
            centerLabel="K650 Bn"
            centerSub="Total Debt"
            height={150}
          />
          <DonutLegend data={BOZ_PUBLIC_DEBT.map((d) => ({ name: d.name, value: d.pct, color: d.color }))} theme={theme} />
          <p
            className={clsx(
              "mt-3 rounded-lg px-3 py-2 text-center text-xs font-semibold",
              isLight ? "bg-zra-navy/5 text-zra-navy" : "bg-white/5 text-white"
            )}
          >
            Debt-to-GDP Ratio 68.5%
          </p>
        </DarkPanel>

        <DarkPanel title="Debt Portfolio Maturity Profile (K Billion)" theme={theme}>
          <SimpleBarChart data={BOZ_DEBT_MATURITY} theme={theme} color="#0EA5E9" height={200} />
        </DarkPanel>

        <DarkPanel title="Government Cash Flow (Month to Date)" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_GOVERNMENT_CASH_FLOW.map((r) => (
              <StatRow key={r.label} label={r.label} value={r.value} tone={r.tone} isLight={isLight} />
            ))}
          </ul>
        </DarkPanel>

        <DarkPanel title="Early Warning & Financial Stability" theme={theme}>
          <ul className={clsx("flex flex-col divide-y", isLight ? "divide-slate-100" : "divide-white/5")}>
            {BOZ_EARLY_WARNING.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 py-1.5 text-xs">
                <span className={isLight ? "text-slate-500" : "text-white/60"}>{r.label}</span>
                <Pill theme={theme} tone={r.status === "green" ? "green" : "amber"} label={r.status === "green" ? "Low" : "Moderate"} />
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>

      <section className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <DarkPanel
          title="System Integration & Data Connectivity"
          theme={theme}
          icon={<Network className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}
          className="xl:col-span-2"
        >
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
            {BOZ_SYSTEM_INTEGRATIONS.map((s) => (
              <div
                key={s}
                className={clsx(
                  "flex items-center gap-2 rounded-lg border px-3 py-2 text-xs",
                  isLight ? "border-slate-200 bg-slate-50 text-slate-700" : "border-white/10 bg-white/[0.02] text-white/80"
                )}
              >
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green/60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green" />
                </span>
                {s}
                <Pill theme={theme} tone="green" label="Connected" className="ml-auto px-2 py-0.5 text-[10px]" />
              </div>
            ))}
          </div>
        </DarkPanel>

        <DarkPanel title="AI & Analytics Engine" theme={theme} icon={<Brain className={clsx("h-4 w-4", isLight ? "text-slate-400" : "text-white/60")} />}>
          <ul className="flex flex-col gap-2">
            {BOZ_AI_ENGINE.map((r) => (
              <li key={r.label} className="flex items-center justify-between gap-2 text-xs">
                <span className={isLight ? "text-slate-600" : "text-white/70"}>{r.label}</span>
                <span className={r.status === "green" ? "text-status-green" : "text-status-amber"}>{r.status === "green" ? "✓" : "△"}</span>
              </li>
            ))}
          </ul>
        </DarkPanel>
      </section>
    </div>
  );
}
