"use client";

import { useState } from "react";
import { DataTable, type DataTableColumn } from "@/components/ui/DataTable";
import { Pill } from "@/components/ui/Pill";
import { Toast } from "@/components/ui/Toast";
import { ONBOARDING_REQUESTS, type OnboardingRequest } from "@/lib/mockData";

const STATUS_TONE: Record<OnboardingRequest["status"], "amber" | "green" | "red"> = {
  "Pending Review": "amber",
  Verified: "green",
  Flagged: "red",
};

export function TaxpayerOnboardingPage() {
  const [toast, setToast] = useState<string | null>(null);

  const columns: DataTableColumn<OnboardingRequest>[] = [
    { key: "applicantName", header: "Applicant", render: (r) => r.applicantName },
    { key: "type", header: "Type", render: (r) => r.type },
    { key: "submittedOn", header: "Submitted On", render: (r) => r.submittedOn },
    { key: "status", header: "Status", align: "center", render: (r) => <Pill label={r.status} tone={STATUS_TONE[r.status]} /> },
    {
      key: "actions",
      header: "Actions",
      align: "center",
      render: (r) => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            onClick={() => setToast(`${r.applicantName} approved.`)}
            className="rounded-md bg-emerald-50 px-2 py-1 text-xs font-semibold text-emerald-700 hover:bg-emerald-100"
          >
            Approve
          </button>
          <button
            type="button"
            onClick={() => setToast(`${r.applicantName} flagged for review.`)}
            className="rounded-md bg-red-50 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-100"
          >
            Flag
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Taxpayer Onboarding</h1>
        <p className="text-sm text-slate-500">Review and approve new taxpayer and practitioner registrations.</p>
      </div>
      <DataTable columns={columns} data={ONBOARDING_REQUESTS} rowKey={(r) => r.id} />
      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
