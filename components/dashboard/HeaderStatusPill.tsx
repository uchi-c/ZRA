"use client";

import { Pill } from "@/components/ui/Pill";
import { useDashboardStatusBar } from "@/lib/dashboardStatus";

export function HeaderStatusPill() {
  const { status } = useDashboardStatusBar();
  if (!status) return null;

  return (
    <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-slate-50 py-1 pl-3 pr-1 text-xs font-medium text-slate-600 md:flex">
      {status.label}
      <Pill label={status.value} tone={status.tone} />
    </div>
  );
}
