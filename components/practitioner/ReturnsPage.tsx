"use client";

import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { PRACTITIONER_CLIENTS, zmw, type ClientReturnRow } from "@/lib/mockData";

const columns: DataTableColumn<ClientReturnRow>[] = [
  { key: "clientName", header: "Client Name", render: (r) => r.clientName },
  { key: "taxPeriod", header: "Tax Period", render: (r) => r.taxPeriod },
  { key: "income", header: "Income", align: "right", sortable: true, sortValue: (r) => r.income, render: (r) => zmw(r.income) },
  { key: "expenses", header: "Expenses", align: "right", render: (r) => zmw(r.expenses) },
  { key: "taxPayable", header: "Tax Payable", align: "right", sortable: true, sortValue: (r) => r.taxPayable, render: (r) => zmw(r.taxPayable) },
  { key: "refundDue", header: "Refund Due", align: "right", render: (r) => zmw(r.refundDue) },
  { key: "status", header: "Status", align: "center", render: (r) => <StatusBadge status={r.status} /> },
];

export function ReturnsPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Return Preparation</h1>
        <p className="text-sm text-slate-500">Prepare, review, upload, and submit returns on behalf of your clients.</p>
      </div>
      <DataTable columns={columns} data={PRACTITIONER_CLIENTS} rowKey={(r) => r.tpin} />
    </div>
  );
}
