import type { ReactNode } from "react";
import clsx from "clsx";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  className?: string;
}

export function StatCard({ label, value, delta, deltaTone = "neutral", icon, className }: StatCardProps) {
  return (
    <div className={clsx("card flex flex-col gap-2", className)}>
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
        {icon && <span className="text-zra-green">{icon}</span>}
      </div>
      <span className="text-2xl font-bold text-slate-900">{value}</span>
      {delta && (
        <span
          className={clsx(
            "text-xs font-medium",
            deltaTone === "positive" && "text-emerald-600",
            deltaTone === "negative" && "text-red-600",
            deltaTone === "neutral" && "text-slate-500"
          )}
        >
          {delta}
        </span>
      )}
    </div>
  );
}
