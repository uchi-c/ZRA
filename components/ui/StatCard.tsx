import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Tone = "green" | "blue" | "amber" | "red" | "purple" | "slate";

interface StatCardProps {
  label: string;
  value: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  tone?: Tone;
  className?: string;
}

const ICON_BG: Record<Tone, string> = {
  green: "bg-emerald-50 text-emerald-600",
  blue: "bg-blue-50 text-blue-600",
  amber: "bg-amber-50 text-amber-600",
  red: "bg-red-50 text-red-600",
  purple: "bg-violet-50 text-violet-600",
  slate: "bg-slate-100 text-slate-600",
};

export function StatCard({ label, value, delta, deltaTone = "neutral", icon, tone = "green", className }: StatCardProps) {
  return (
    <div
      className={clsx(
        "card flex flex-col gap-3 transition hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</span>
        {icon && (
          <span className={clsx("flex h-8 w-8 items-center justify-center rounded-lg", ICON_BG[tone])}>
            {icon}
          </span>
        )}
      </div>
      <span className="text-2xl font-bold tracking-tight text-slate-900">{value}</span>
      {delta && (
        <span
          className={clsx(
            "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            deltaTone === "positive" && "bg-emerald-50 text-emerald-700",
            deltaTone === "negative" && "bg-red-50 text-red-700",
            deltaTone === "neutral" && "bg-slate-100 text-slate-500"
          )}
        >
          {deltaTone === "positive" && <ArrowUpRight className="h-3 w-3" />}
          {deltaTone === "negative" && <ArrowDownRight className="h-3 w-3" />}
          {delta}
        </span>
      )}
    </div>
  );
}
