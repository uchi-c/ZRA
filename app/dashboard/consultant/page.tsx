"use client";

import { useAuth } from "@/lib/auth";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { ManagementKpiGrid } from "@/components/dashboard/ManagementKpiGrid";
import {
  CONSULTANT_SUMMARY,
  MANAGEMENT_KPIS,
  REVENUE_PERFORMANCE,
  zmw,
  zmwCompact,
  type RevenueMonthRow,
} from "@/lib/mockData";
import type { ConsultantProfile } from "@/lib/types";

const columns: DataTableColumn<RevenueMonthRow>[] = [
  { key: "period", header: "Period", render: (r) => r.period },
  { key: "taxpayersRegistered", header: "Taxpayers Registered", align: "right", render: (r) => r.taxpayersRegistered.toLocaleString() },
  { key: "returnsSubmitted", header: "Returns Submitted", align: "right", render: (r) => r.returnsSubmitted.toLocaleString() },
  { key: "taxesAssessed", header: "Taxes Assessed", align: "right", render: (r) => zmwCompact(r.taxesAssessed) },
  { key: "taxesCollected", header: "Taxes Collected", align: "right", render: (r) => zmwCompact(r.taxesCollected) },
  { key: "refundsProcessed", header: "Refunds Processed", align: "right", render: (r) => zmwCompact(r.refundsProcessed) },
  { key: "outstandingDebt", header: "Outstanding Debt", align: "right", render: (r) => zmwCompact(r.outstandingDebt) },
];

export default function ConsultantPage() {
  const { user } = useAuth();
  const profile = user!.profile as ConsultantProfile;

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">
          {profile.firstName} {profile.surname}
        </h1>
        <p className="text-sm text-slate-500">
          Consultant No. {profile.consultantNumber} · {profile.region} Region
        </p>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Consultant Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Consultant Number" value={CONSULTANT_SUMMARY.consultantNumber} />
          <StatCard label="Region" value={CONSULTANT_SUMMARY.region} />
          <StatCard label="Assigned Practitioners" value={CONSULTANT_SUMMARY.assignedPractitioners.toString()} />
          <StatCard label="Assigned Taxpayers" value={CONSULTANT_SUMMARY.assignedTaxpayers.toLocaleString()} />
          <StatCard label="Revenue Collection" value={zmwCompact(CONSULTANT_SUMMARY.revenueCollection)} />
          <StatCard label="Compliance Rate" value={`${CONSULTANT_SUMMARY.complianceRate}%`} deltaTone="positive" />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Revenue Performance Dashboard
        </h2>
        <DataTable columns={columns} data={REVENUE_PERFORMANCE} rowKey={(r) => r.period} />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Management KPI Dashboard</h2>
        <ManagementKpiGrid kpis={MANAGEMENT_KPIS} />
      </section>

      <p className="text-xs text-slate-400">
        Latest period revenue collected: {zmw(REVENUE_PERFORMANCE[REVENUE_PERFORMANCE.length - 1].taxesCollected)}
      </p>
    </div>
  );
}
