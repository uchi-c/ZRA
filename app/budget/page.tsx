import Link from "next/link";
import { Landmark, ShieldCheck, TrendingUp } from "lucide-react";
import { StatCard } from "@/components/ui/StatCard";
import { RevenueFlowSankey } from "@/components/budget/RevenueFlowSankey";
import { SectorAllocationChart } from "@/components/budget/SectorAllocationChart";
import { BUDGET_SECTORS, MANAGEMENT_KPIS, NATIONAL_BUDGET } from "@/lib/mockData";

export default function BudgetPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-1.5">
        <div className="flex-1 bg-zra-green" />
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-zra-red" />
        <div className="flex-1 bg-zra-gold" />
      </div>
      <header className="bg-gradient-to-br from-zra-green-dark via-zra-green to-zra-green-light text-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Landmark className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-emerald-100">
                Zambia Revenue Authority
              </p>
              <h1 className="text-xl font-bold sm:text-2xl">Sample National Budget — FY {NATIONAL_BUDGET.fiscalYear}</h1>
            </div>
          </div>
          <Link href="/login" className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20">
            Portal Login
          </Link>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-8 sm:px-6">
        <section className="card text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Total National Revenue Collected — FY {NATIONAL_BUDGET.fiscalYear}
          </p>
          <p className="mt-2 text-4xl font-bold text-zra-green sm:text-5xl">
            K{NATIONAL_BUDGET.totalRevenue.toFixed(1)} Billion
          </p>
          <div className="mx-auto mt-4 grid max-w-xl grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-md bg-slate-50 px-4 py-2">
              <p className="text-xs text-slate-500">Tax Revenue</p>
              <p className="font-semibold text-slate-900">K{NATIONAL_BUDGET.taxRevenue.toFixed(1)}B</p>
            </div>
            <div className="rounded-md bg-slate-50 px-4 py-2">
              <p className="text-xs text-slate-500">Non-Tax Revenue</p>
              <p className="font-semibold text-slate-900">K{NATIONAL_BUDGET.nonTaxRevenue.toFixed(1)}B</p>
            </div>
            <div className="rounded-md bg-slate-50 px-4 py-2">
              <p className="text-xs text-slate-500">Grants & Aid</p>
              <p className="font-semibold text-slate-900">K{NATIONAL_BUDGET.grantsAid.toFixed(1)}B</p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="mb-1 text-base font-semibold text-slate-900">
            Revenue Collection → Treasury Single Account → Budget Allocation
          </h2>
          <p className="mb-4 text-sm text-slate-500">
            Funds collected by ZRA flow into the Treasury Single Account before being allocated across government
            sectors for service delivery.
          </p>
          <RevenueFlowSankey />
        </section>

        <section className="card">
          <h2 className="mb-1 text-base font-semibold text-slate-900">Budget Allocation by Sector</h2>
          <p className="mb-4 text-sm text-slate-500">Share of the K{NATIONAL_BUDGET.totalBudget.toFixed(1)}B national budget per sector.</p>
          <SectorAllocationChart />
          <div className="mt-4 grid grid-cols-2 gap-2 text-sm sm:grid-cols-3">
            {BUDGET_SECTORS.map((s) => (
              <div key={s.sector} className="flex justify-between rounded-md bg-slate-50 px-3 py-1.5">
                <span className="text-slate-600">{s.sector}</span>
                <span className="font-semibold text-slate-900">
                  K{s.amount.toFixed(1)}B ({s.percent}%)
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <StatCard
            label="Revenue Target Achievement"
            value={`${MANAGEMENT_KPIS.revenueTargetAchievement}%`}
            deltaTone="positive"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <StatCard
            label="Tax Compliance Rate"
            value={`${MANAGEMENT_KPIS.taxComplianceRate}%`}
            deltaTone="positive"
            icon={<ShieldCheck className="h-4 w-4" />}
          />
        </section>
      </main>
    </div>
  );
}
