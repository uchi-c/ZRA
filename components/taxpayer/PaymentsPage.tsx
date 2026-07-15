"use client";

import { useState } from "react";
import { CreditCard } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Toast } from "@/components/ui/Toast";
import { PAYMENT_HISTORY, zmw, type PaymentRecord } from "@/lib/mockData";

const STATUS_TONE: Record<PaymentRecord["status"], "green" | "amber" | "red"> = {
  Completed: "green",
  Pending: "amber",
  Failed: "red",
};

const columns: DataTableColumn<PaymentRecord>[] = [
  { key: "id", header: "Reference", render: (r) => r.id },
  { key: "date", header: "Date", render: (r) => r.date },
  { key: "description", header: "Description", render: (r) => r.description },
  { key: "method", header: "Method", render: (r) => r.method },
  { key: "amount", header: "Amount", align: "right", render: (r) => zmw(r.amount) },
  { key: "status", header: "Status", align: "center", render: (r) => <Pill label={r.status} tone={STATUS_TONE[r.status]} /> },
];

export function PaymentsPage() {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Payments</h1>
          <p className="text-sm text-slate-500">View your payment history and make a new payment.</p>
        </div>
        <button type="button" onClick={() => setToast("Redirecting to the digital payment gateway...")} className="btn-primary">
          <CreditCard className="h-4 w-4" /> Make Payment
        </button>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Payment History</h2>
        <DataTable columns={columns} data={PAYMENT_HISTORY} rowKey={(r) => r.id} />
      </section>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
