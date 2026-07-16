import { StatCard } from "@/components/ui/StatCard";
import { zmwCompact, MANAGEMENT_KPIS } from "@/lib/mockData";
import { Clock, ShieldCheck, TrendingUp, UserCheck, Users, Wallet } from "lucide-react";

type Kpis = typeof MANAGEMENT_KPIS;

export function ManagementKpiGrid({ kpis }: { kpis: Kpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard
        label="National Revenue Collected"
        value={zmwCompact(kpis.nationalRevenueCollected)}
        icon={<Wallet className="h-4 w-4" />}
        tone="gold"
      />
      <StatCard
        label="Revenue Target Achievement"
        value={`${kpis.revenueTargetAchievement}%`}
        deltaTone="positive"
        icon={<TrendingUp className="h-4 w-4" />}
        tone="gold"
      />
      <StatCard
        label="Tax Compliance Rate"
        value={`${kpis.taxComplianceRate}%`}
        deltaTone="positive"
        icon={<ShieldCheck className="h-4 w-4" />}
        tone="blue"
      />
      <StatCard label="Tax Debt Recovery" value={`${kpis.taxDebtRecovery}%`} icon={<TrendingUp className="h-4 w-4" />} tone="amber" />
      <StatCard label="Refund Processing Time" value={kpis.refundProcessingTime} icon={<Clock className="h-4 w-4" />} tone="purple" />
      <StatCard
        label="Active Tax Practitioners"
        value={kpis.activeTaxPractitioners.toLocaleString()}
        icon={<UserCheck className="h-4 w-4" />}
        tone="blue"
      />
      <StatCard
        label="Active Tax Consultants"
        value={kpis.activeTaxConsultants.toLocaleString()}
        icon={<UserCheck className="h-4 w-4" />}
        tone="blue"
      />
      <StatCard
        label="Active Taxpayers"
        value={kpis.activeTaxpayers.toLocaleString()}
        icon={<Users className="h-4 w-4" />}
        tone="navy"
      />
    </div>
  );
}
