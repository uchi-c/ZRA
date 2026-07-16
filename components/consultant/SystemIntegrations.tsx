import { Network } from "lucide-react";
import { SYSTEM_INTEGRATIONS } from "@/lib/mockData";

export function SystemIntegrations() {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <Network className="h-4 w-4 text-zra-navy" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">System Integrations</h2>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {SYSTEM_INTEGRATIONS.map((s) => (
          <div key={s} className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-status-green/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-status-green" />
            </span>
            {s}
          </div>
        ))}
      </div>
    </div>
  );
}
