"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { AUDIT_SELECTIONS, type AuditSelection } from "@/lib/mockData";

const STATUS_TONE: Record<AuditSelection["status"], "blue" | "amber" | "green"> = {
  Scheduled: "blue",
  "In Progress": "amber",
  Completed: "green",
};

const columns: DataTableColumn<AuditSelection>[] = [
  { key: "id", header: "Audit No.", render: (r) => r.id },
  { key: "taxpayer", header: "Taxpayer", render: (r) => r.taxpayer },
  {
    key: "riskScore",
    header: "Risk Score",
    align: "right",
    sortable: true,
    sortValue: (r) => r.riskScore,
    render: (r) => (
      <span className={r.riskScore >= 70 ? "font-semibold text-red-600" : "text-slate-700"}>{r.riskScore}</span>
    ),
  },
  { key: "reason", header: "AI Flag Reason", render: (r) => r.reason },
  { key: "status", header: "Status", align: "center", render: (r) => <Pill label={r.status} tone={STATUS_TONE[r.status]} /> },
];

export function RiskAuditPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Risk & Audit Management</h1>
        <p className="text-sm text-slate-500">AI-selected audit cases ranked by risk score.</p>
      </div>
      <DataTable columns={columns} data={AUDIT_SELECTIONS} rowKey={(r) => r.id} />
    </div>
  );
}
