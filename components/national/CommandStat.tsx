import clsx from "clsx";
import type { ReactNode } from "react";
import { AnimatedStatValue } from "@/components/reactbits/AnimatedStatValue";

interface CommandStatProps {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  iconTone?: string;
  theme?: "light" | "dark";
}

export function CommandStat({ label, value, sub, delta, deltaTone = "neutral", icon, iconTone, theme = "dark" }: CommandStatProps) {
  const isLight = theme === "light";
  return (
    <div
      className={clsx(
        "flex flex-col gap-1.5 rounded-xl border p-4",
        isLight ? "border-[#EDEFF3] bg-white shadow-card" : "border-white/10 bg-white/[0.03]"
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={clsx("text-[11px] font-semibold uppercase tracking-wide", isLight ? "text-slate-500" : "text-white/50")}>
          {label}
        </span>
        {icon && (
          <span
            className={clsx(
              "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
              iconTone ?? (isLight ? "bg-zra-navy/10 text-zra-navy" : "bg-white/10 text-white")
            )}
          >
            {icon}
          </span>
        )}
      </div>
      <AnimatedStatValue
        value={value}
        className={clsx("text-xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}
      />
      {sub && <span className={clsx("text-xs", isLight ? "text-slate-400" : "text-white/40")}>{sub}</span>}
      {delta && (
        <span
          className={clsx(
            "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium",
            deltaTone === "positive" && "bg-status-green/15 text-status-green",
            deltaTone === "negative" && "bg-status-red/15 text-status-red",
            deltaTone === "neutral" && (isLight ? "bg-slate-100 text-slate-500" : "bg-white/10 text-white/60")
          )}
        >
          {deltaTone === "positive" ? "▲" : deltaTone === "negative" ? "▼" : ""} {delta}
        </span>
      )}
    </div>
  );
}
