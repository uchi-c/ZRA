import { BookOpen } from "lucide-react";
import { RESOURCE_LINKS } from "@/lib/mockData";
import { Pill } from "@/components/ui/Pill";

export function ResourcesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Resources</h1>
        <p className="text-sm text-slate-500">Guides, legislation, and training material to support your practice.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {RESOURCE_LINKS.map((r) => (
          <div key={r.id} className="card flex gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <BookOpen className="h-4 w-4" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-semibold text-slate-900">{r.title}</h2>
                <Pill label={r.category} tone="blue" />
              </div>
              <p className="mt-1 text-sm text-slate-500">{r.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
