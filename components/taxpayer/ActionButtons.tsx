"use client";

import {
  Bot,
  Calculator,
  CreditCard,
  FileCheck2,
  FileUp,
  RefreshCw,
  Send,
  ShieldCheck,
  Upload,
  type LucideIcon,
} from "lucide-react";

interface ActionButtonsProps {
  onAction: (action: string) => void;
}

const ACTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Calculate Tax", icon: Calculator },
  { label: "Submit Return", icon: Send },
  { label: "Upload Supporting Documents", icon: Upload },
  { label: "Generate Assessment", icon: FileCheck2 },
  { label: "Request Refund", icon: RefreshCw },
  { label: "Make Payment", icon: CreditCard },
  { label: "Generate Tax Clearance", icon: FileUp },
  { label: "Generate Compliance Report", icon: ShieldCheck },
  { label: "AI Compliance Check", icon: Bot },
];

export function ActionButtons({ onAction }: ActionButtonsProps) {
  return (
    <div className="card">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Quick Actions</h3>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-5">
        {ACTIONS.map(({ label, icon: Icon }) => (
          <button
            key={label}
            type="button"
            onClick={() => onAction(label)}
            className="flex flex-col items-center gap-2 rounded-lg border border-slate-200 px-2 py-3 text-center transition hover:-translate-y-0.5 hover:border-zra-navy hover:bg-zra-navy/5 hover:shadow-sm"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zra-navy/5 text-zra-navy">
              <Icon className="h-4 w-4" />
            </span>
            <span className="text-[11px] font-medium leading-tight text-slate-600">{label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
