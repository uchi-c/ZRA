"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { PRACTITIONER_DIRECTORY, type PractitionerDirectoryEntry } from "@/lib/mockData";

const columns: DataTableColumn<PractitionerDirectoryEntry>[] = [
  { key: "name", header: "Practitioner", sortable: true, sortValue: (r) => r.name, render: (r) => r.name },
  { key: "firm", header: "Firm", render: (r) => r.firm },
  { key: "category", header: "Category", render: (r) => r.category },
  { key: "clientsManaged", header: "Clients", align: "right", sortable: true, sortValue: (r) => r.clientsManaged, render: (r) => r.clientsManaged.toString() },
  { key: "complianceRate", header: "Compliance", align: "right", render: (r) => `${r.complianceRate}%` },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (r) => <Pill label={r.status} tone={r.status === "Active" ? "green" : "red"} />,
  },
];

export function PractitionerManagementPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Practitioner Management</h1>
        <p className="text-sm text-slate-500">Approve, monitor, and manage accredited tax practitioners in your region.</p>
      </div>
      <DataTable columns={columns} data={PRACTITIONER_DIRECTORY} rowKey={(r) => r.id} />
    </div>
  );
}
