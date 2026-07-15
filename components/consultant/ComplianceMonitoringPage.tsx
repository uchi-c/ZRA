import { StatCard } from "@/components/ui/StatCard";
import { ComplianceDonut } from "@/components/practitioner/ComplianceDonut";
import { MANAGEMENT_KPIS } from "@/lib/mockData";
import { AlertTriangle, ShieldCheck, TrendingUp } from "lucide-react";

export function ComplianceMonitoringPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Compliance Monitoring</h1>
        <p className="text-sm text-slate-500">Region-wide compliance tracking across taxpayers and practitioners.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Tax Compliance Rate" value={`${MANAGEMENT_KPIS.taxComplianceRate}%`} icon={<ShieldCheck className="h-4 w-4" />} tone="green" deltaTone="positive" delta="+2% MoM" />
        <StatCard label="Tax Debt Recovery" value={`${MANAGEMENT_KPIS.taxDebtRecovery}%`} icon={<TrendingUp className="h-4 w-4" />} tone="blue" />
        <StatCard label="Flagged for Review" value="18 Taxpayers" icon={<AlertTriangle className="h-4 w-4" />} tone="amber" />
      </div>

      <section className="card">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">Compliance Breakdown</h2>
        <p className="mb-2 text-xs text-slate-400">Sample of monitored taxpayer accounts</p>
        <ComplianceDonut />
      </section>
    </div>
  );
}
