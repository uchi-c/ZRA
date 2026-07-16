import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

type Tone = "navy" | "gold" | "green" | "blue" | "amber" | "red" | "purple" | "slate";

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
  navy: "bg-zra-navy/10 text-zra-navy",
  gold: "bg-zra-gold/15 text-zra-gold",
  green: "bg-status-green/15 text-status-green",
  blue: "bg-blue-500/10 text-blue-600",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  purple: "bg-violet-500/10 text-violet-600",
  slate: "bg-slate-100 text-slate-600",
};

export function StatCard({ label, value, delta, deltaTone = "neutral", icon, tone = "navy", className }: StatCardProps) {
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
            deltaTone === "positive" && "bg-status-green/15 text-status-green",
            deltaTone === "negative" && "bg-status-red/15 text-status-red",
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
