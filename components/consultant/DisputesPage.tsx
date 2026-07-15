"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { DISPUTE_CASES, type DisputeCase } from "@/lib/mockData";

const PRIORITY_TONE: Record<DisputeCase["priority"], "red" | "amber" | "slate"> = {
  High: "red",
  Medium: "amber",
  Low: "slate",
};

const STATUS_TONE: Record<DisputeCase["status"], "amber" | "blue" | "green"> = {
  Open: "amber",
  "Under Review": "blue",
  Resolved: "green",
};

const columns: DataTableColumn<DisputeCase>[] = [
  { key: "id", header: "Case No.", render: (r) => r.id },
  { key: "taxpayer", header: "Taxpayer", render: (r) => r.taxpayer },
  { key: "issue", header: "Issue", render: (r) => r.issue },
  { key: "openedOn", header: "Opened On", render: (r) => r.openedOn },
  { key: "priority", header: "Priority", align: "center", render: (r) => <Pill label={r.priority} tone={PRIORITY_TONE[r.priority]} /> },
  { key: "status", header: "Status", align: "center", render: (r) => <Pill label={r.status} tone={STATUS_TONE[r.status]} /> },
];

export function DisputesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Dispute & Case Management</h1>
        <p className="text-sm text-slate-500">Track objections, appeals, and case resolutions.</p>
      </div>
      <DataTable columns={columns} data={DISPUTE_CASES} rowKey={(r) => r.id} />
    </div>
  );
}
