"use client";

import { useState } from "react";
import { FileCheck2 } from "lucide-react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Toast } from "@/components/ui/Toast";
import { TAX_CLEARANCE_HISTORY, type TaxClearanceRecord } from "@/lib/mockData";

const STATUS_TONE: Record<TaxClearanceRecord["status"], "green" | "red" | "amber"> = {
  Valid: "green",
  Expired: "red",
  Processing: "amber",
};

const columns: DataTableColumn<TaxClearanceRecord>[] = [
  { key: "id", header: "Certificate No.", render: (r) => r.id },
  { key: "issuedOn", header: "Issued On", render: (r) => r.issuedOn },
  { key: "expiresOn", header: "Expires On", render: (r) => r.expiresOn },
  { key: "purpose", header: "Purpose", render: (r) => r.purpose },
  { key: "status", header: "Status", align: "center", render: (r) => <Pill label={r.status} tone={STATUS_TONE[r.status]} /> },
];

export function TaxClearancePage() {
  const [toast, setToast] = useState<string | null>(null);
  const current = TAX_CLEARANCE_HISTORY[0];

  return (
    <div className="flex flex-col gap-6">
      <div className="card bg-gradient-to-r from-zra-navy-dark to-zra-navy text-white">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <FileCheck2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-xs uppercase tracking-wide text-white/80">Current Status</p>
              <h1 className="text-lg font-bold">Tax Clearance {current.status}</h1>
              <p className="text-sm text-white/80">Certificate {current.id} · expires {current.expiresOn}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setToast("Tax clearance certificate generated and sent to your email.")}
            className="rounded-md bg-white px-4 py-2 text-sm font-semibold text-zra-navy hover:bg-zra-navy/5"
          >
            Generate Tax Clearance
          </button>
        </div>
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Certificate History</h2>
        <DataTable columns={columns} data={TAX_CLEARANCE_HISTORY} rowKey={(r) => r.id} />
      </section>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
