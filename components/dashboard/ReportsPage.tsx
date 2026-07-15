"use client";

import { useState } from "react";
import { BarChart3, Download } from "lucide-react";
import { Toast } from "@/components/ui/Toast";
import { REPORT_TEMPLATES } from "@/lib/mockData";

export function ReportsPage({ title, description }: { title: string; description: string }) {
  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-zra-green">
          <BarChart3 className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-lg font-bold text-slate-900">{title}</h1>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {REPORT_TEMPLATES.map((r) => (
          <div key={r.id} className="card flex flex-col gap-3">
            <div>
              <h2 className="text-sm font-semibold text-slate-900">{r.name}</h2>
              <p className="mt-1 text-sm text-slate-500">{r.description}</p>
            </div>
            <button
              type="button"
              onClick={() => setToast(`${r.name} generated.`)}
              className="btn-secondary mt-auto w-fit"
            >
              <Download className="h-4 w-4" /> Generate Report
            </button>
          </div>
        ))}
      </div>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
