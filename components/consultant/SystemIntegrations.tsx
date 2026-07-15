import { Check, Network } from "lucide-react";
import { SYSTEM_INTEGRATIONS } from "@/lib/mockData";

export function SystemIntegrations() {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <Network className="h-4 w-4 text-zra-green" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">System Integrations</h2>
      </div>
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 sm:grid-cols-3">
        {SYSTEM_INTEGRATIONS.map((s) => (
          <div key={s} className="flex items-center gap-2 text-sm text-slate-600">
            <Check className="h-3.5 w-3.5 shrink-0 text-zra-green" />
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
