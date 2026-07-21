import clsx from "clsx";
import type { ReactNode } from "react";

export function DarkPanel({ title, icon, children, className }: { title: string; icon?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <section className={clsx("rounded-xl border border-white/10 bg-white/[0.03] p-4", className)}>
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className="text-xs font-semibold uppercase tracking-wide text-white/60">{title}</h2>
      </div>
      {children}
    </section>
  );
}
