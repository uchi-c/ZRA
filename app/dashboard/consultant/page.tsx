"use client";

import { useAuth } from "@/lib/auth";
import { StatCard } from "@/components/ui/StatCard";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { ManagementKpiGrid } from "@/components/dashboard/ManagementKpiGrid";
import { RevenueTrendChart } from "@/components/consultant/RevenueTrendChart";
import { AIComplianceEngine } from "@/components/consultant/AIComplianceEngine";
import { PaymentGateway } from "@/components/consultant/PaymentGateway";
import { SystemIntegrations } from "@/components/consultant/SystemIntegrations";
import { useState } from "react";
import {
  CONSULTANT_SUMMARY,
  MANAGEMENT_KPIS,
  PROVINCES,
  REVENUE_PERFORMANCE,
  zmw,
  zmwCompact,
  type RevenueMonthRow,
} from "@/lib/mockData";
import type { ConsultantProfile } from "@/lib/types";
import { Award, MapPin, ShieldCheck, Users, Wallet } from "lucide-react";

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
  const [region, setRegion] = useState(CONSULTANT_SUMMARY.region);

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-col justify-between gap-4 bg-gradient-to-r from-zra-navy-dark to-zra-navy text-white sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold">
            Welcome back, {profile.firstName} {profile.surname}
          </h1>
          <p className="text-sm text-white/80">
            Consultant No. {profile.consultantNumber} · {region} Region
          </p>
        </div>
        <label className="flex items-center gap-2 text-xs font-medium text-white/80">
          Region
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="rounded-md border border-white/20 bg-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-white [&>option]:text-slate-900"
          >
            {PROVINCES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </label>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Consultant Dashboard</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          <StatCard label="Consultant Number" value={CONSULTANT_SUMMARY.consultantNumber} icon={<Award className="h-4 w-4" />} tone="purple" />
          <StatCard label="Region" value={CONSULTANT_SUMMARY.region} icon={<MapPin className="h-4 w-4" />} tone="blue" />
          <StatCard label="Assigned Practitioners" value={CONSULTANT_SUMMARY.assignedPractitioners.toString()} icon={<Users className="h-4 w-4" />} tone="blue" />
          <StatCard label="Assigned Taxpayers" value={CONSULTANT_SUMMARY.assignedTaxpayers.toLocaleString()} icon={<Users className="h-4 w-4" />} tone="navy" />
          <StatCard label="Revenue Collection" value={zmwCompact(CONSULTANT_SUMMARY.revenueCollection)} icon={<Wallet className="h-4 w-4" />} tone="gold" />
          <StatCard
            label="Compliance Rate"
            value={`${CONSULTANT_SUMMARY.complianceRate}%`}
            deltaTone="positive"
            delta="On target"
            icon={<ShieldCheck className="h-4 w-4" />}
            tone="green"
          />
        </div>
      </section>

      <section className="card">
        <h2 className="mb-1 text-sm font-semibold uppercase tracking-wide text-slate-500">Revenue Collection Trend</h2>
        <p className="mb-2 text-xs text-slate-400">Taxes collected by period (ZMW)</p>
        <RevenueTrendChart />
      </section>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Revenue Performance Dashboard
        </h2>
        <DataTable columns={columns} data={REVENUE_PERFORMANCE} rowKey={(r) => r.period} />
      </section>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AIComplianceEngine />
        <PaymentGateway />
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Management KPI Dashboard</h2>
        <ManagementKpiGrid kpis={MANAGEMENT_KPIS} />
      </section>

      <SystemIntegrations />

      <p className="text-xs text-slate-400">
        Latest period revenue collected: {zmw(REVENUE_PERFORMANCE[REVENUE_PERFORMANCE.length - 1].taxesCollected)}
      </p>
    </div>
  );
}
