import { Bot, Check } from "lucide-react";
import { AI_COMPLIANCE_FUNCTIONS } from "@/lib/mockData";

export function AIComplianceEngine() {
  return (
    <div className="card">
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">AI Compliance Engine</h2>
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="relative flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-zra-green to-zra-green-light text-white shadow-inner">
          <Bot className="h-10 w-10" />
          <span className="absolute inset-0 animate-pulse rounded-full ring-4 ring-emerald-200/60" />
        </div>
        <ul className="grid flex-1 grid-cols-1 gap-x-4 gap-y-2 sm:grid-cols-2">
          {AI_COMPLIANCE_FUNCTIONS.map((f) => (
            <li key={f} className="flex items-center gap-2 text-sm text-slate-600">
              <Check className="h-3.5 w-3.5 shrink-0 text-zra-green" />
              {f}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
