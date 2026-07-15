"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { Toast } from "@/components/ui/Toast";
import { PRACTITIONER_CLIENTS, zmw, type ClientReturnRow } from "@/lib/mockData";

const columns: DataTableColumn<ClientReturnRow>[] = [
  { key: "clientName", header: "Client Name", sortable: true, sortValue: (r) => r.clientName, render: (r) => r.clientName },
  { key: "tpin", header: "TPIN", render: (r) => r.tpin },
  { key: "income", header: "Income", align: "right", sortable: true, sortValue: (r) => r.income, render: (r) => zmw(r.income) },
  { key: "status", header: "Compliance", align: "center", render: (r) => <StatusBadge status={r.status} /> },
];

export function ClientsPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Client Management</h1>
          <p className="text-sm text-slate-500">Add, manage, and view client profiles, authorisations, and engagements.</p>
        </div>
        <button type="button" onClick={() => setToast("New client registration started.")} className="btn-primary">
          <UserPlus className="h-4 w-4" /> Register Client
        </button>
      </div>

      <DataTable columns={columns} data={PRACTITIONER_CLIENTS} rowKey={(r) => r.tpin} />

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
