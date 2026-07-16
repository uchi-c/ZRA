import { StatCard } from "@/components/ui/StatCard";
import { RevenueTrendChart } from "@/components/consultant/RevenueTrendChart";
import { PRACTITIONER_PERFORMANCE, zmw } from "@/lib/mockData";
import { Award, FileCheck, ShieldCheck, TrendingUp, Users, Wallet } from "lucide-react";

export function PerformancePage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Practitioner Performance</h1>
        <p className="text-sm text-slate-500">Track your compliance rate, revenue contribution, and ranking.</p>
      </div>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard label="Clients Managed" value={PRACTITIONER_PERFORMANCE.clientsManaged.toString()} icon={<Users className="h-4 w-4" />} tone="blue" />
        <StatCard label="Returns Filed" value={PRACTITIONER_PERFORMANCE.returnsFiled.toString()} icon={<FileCheck className="h-4 w-4" />} tone="navy" />
        <StatCard label="Revenue Generated" value={zmw(PRACTITIONER_PERFORMANCE.revenueGenerated)} icon={<Wallet className="h-4 w-4" />} tone="gold" />
        <StatCard
          label="Compliance Rate"
          value={`${PRACTITIONER_PERFORMANCE.complianceRate}%`}
          deltaTone="positive"
          delta="Above average"
          icon={<ShieldCheck className="h-4 w-4" />}
          tone="green"
        />
        <StatCard label="Tax Collection Contribution" value={zmw(PRACTITIONER_PERFORMANCE.taxCollectionContribution)} icon={<TrendingUp className="h-4 w-4" />} tone="purple" />
        <StatCard label="Practitioner Ranking" value={PRACTITIONER_PERFORMANCE.ranking} icon={<Award className="h-4 w-4" />} tone="amber" />
      </div>

      <section className="card">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">Revenue Contribution Trend</h2>
        <p className="mb-2 text-xs text-slate-400">Aggregate taxes collected across your client portfolio (ZMW)</p>
        <RevenueTrendChart />
      </section>
    </div>
  );
}
