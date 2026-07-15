import { StatCard } from "@/components/ui/StatCard";
import { zmwCompact, MANAGEMENT_KPIS } from "@/lib/mockData";

type Kpis = typeof MANAGEMENT_KPIS;

export function ManagementKpiGrid({ kpis }: { kpis: Kpis }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
      <StatCard label="National Revenue Collected" value={zmwCompact(kpis.nationalRevenueCollected)} />
      <StatCard label="Revenue Target Achievement" value={`${kpis.revenueTargetAchievement}%`} deltaTone="positive" />
      <StatCard label="Tax Compliance Rate" value={`${kpis.taxComplianceRate}%`} deltaTone="positive" />
      <StatCard label="Tax Debt Recovery" value={`${kpis.taxDebtRecovery}%`} />
      <StatCard label="Refund Processing Time" value={kpis.refundProcessingTime} />
      <StatCard label="Active Tax Practitioners" value={kpis.activeTaxPractitioners.toLocaleString()} />
      <StatCard label="Active Tax Consultants" value={kpis.activeTaxConsultants.toLocaleString()} />
      <StatCard label="Active Taxpayers" value={kpis.activeTaxpayers.toLocaleString()} />
    </div>
  );
}
