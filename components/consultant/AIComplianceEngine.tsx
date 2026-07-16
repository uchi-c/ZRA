"use client";

import { useState } from "react";
import {
  Activity,
  AlertCircle,
  Bot,
  Gauge,
  LineChart,
  ScanSearch,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import clsx from "clsx";
import { Toggle } from "@/components/ui/Toggle";
import { AI_COMPLIANCE_FUNCTIONS } from "@/lib/mockData";

const ICONS: Record<string, LucideIcon> = {
  "Fraud Detection": ScanSearch,
  "Risk Scoring": Gauge,
  "Audit Selection": AlertCircle,
  "Taxpayer Behaviour Analysis": Users,
  "Revenue Forecasting": LineChart,
  "Compliance Monitoring": ShieldCheck,
  "Real-Time Alerts": Activity,
  "Refund Verification": ShieldCheck,
};

export function AIComplianceEngine() {
  const [active, setActive] = useState<Record<string, boolean>>(
    () => Object.fromEntries(AI_COMPLIANCE_FUNCTIONS.map((f) => [f, true]))
  );

  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-zra-navy to-zra-navy-light text-white">
          <Bot className="h-5 w-5" />
        </span>
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">AI Compliance Engine</h2>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {AI_COMPLIANCE_FUNCTIONS.map((f) => {
          const Icon = ICONS[f] ?? Bot;
          const on = active[f];
          return (
            <div
              key={f}
              className={clsx(
                "flex items-center gap-3 rounded-lg border px-3 py-2.5 transition",
                on ? "border-zra-gold/40 bg-zra-gold-light/10" : "border-slate-200"
              )}
            >
              <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", on ? "bg-zra-gold/20 text-zra-gold" : "bg-slate-100 text-slate-400")}>
                <Icon className="h-4 w-4" />
              </span>
              <span className="flex-1 text-sm font-medium text-slate-700">{f}</span>
              <Toggle on={on} onChange={(v) => setActive((prev) => ({ ...prev, [f]: v }))} label={f} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
