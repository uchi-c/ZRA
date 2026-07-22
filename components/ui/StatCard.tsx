import type { ReactNode } from "react";
import clsx from "clsx";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { AnimatedStatValue } from "@/components/reactbits/AnimatedStatValue";

type Tone = "navy" | "gold" | "green" | "blue" | "amber" | "red" | "purple" | "slate";
type Theme = "light" | "dark";

interface StatCardProps {
  label: string;
  value: string;
  sub?: string;
  delta?: string;
  deltaTone?: "positive" | "negative" | "neutral";
  icon?: ReactNode;
  tone?: Tone;
  theme?: Theme;
  animate?: boolean;
  className?: string;
}

const ICON_BG_LIGHT: Record<Tone, string> = {
  navy: "bg-zra-navy/10 text-zra-navy",
  gold: "bg-zra-gold/15 text-zra-gold",
  green: "bg-status-green/15 text-status-green",
  blue: "bg-blue-500/10 text-blue-600",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  purple: "bg-violet-500/10 text-violet-600",
  slate: "bg-slate-100 text-slate-600",
};

const ICON_BG_DARK: Record<Tone, string> = {
  navy: "bg-white/10 text-white",
  gold: "bg-zra-gold/20 text-zra-gold",
  green: "bg-status-green/15 text-status-green",
  blue: "bg-sky-400/15 text-sky-300",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  purple: "bg-violet-400/15 text-violet-300",
  slate: "bg-white/10 text-white/70",
};

export function StatCard({
  label,
  value,
  sub,
  delta,
  deltaTone = "neutral",
  icon,
  tone = "navy",
  theme = "light",
  animate = false,
  className,
}: StatCardProps) {
  const isLight = theme === "light";
  return (
    <div
      className={clsx(
        "flex flex-col gap-2 rounded-xl border p-4 transition hover:-translate-y-0.5",
        isLight ? "border-[#EDEFF3] bg-white shadow-card hover:shadow-md" : "border-white/10 bg-white/[0.03]",
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <span className={clsx("text-xs font-medium uppercase tracking-wide", isLight ? "text-slate-500" : "text-white/50")}>
          {label}
        </span>
        {icon && (
          <span className={clsx("flex h-8 w-8 shrink-0 items-center justify-center rounded-lg", (isLight ? ICON_BG_LIGHT : ICON_BG_DARK)[tone])}>
            {icon}
          </span>
        )}
      </div>
      {animate ? (
        <AnimatedStatValue value={value} className={clsx("text-2xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")} />
      ) : (
        <span className={clsx("text-2xl font-bold tracking-tight", isLight ? "text-slate-900" : "text-white")}>{value}</span>
      )}
      {sub && <span className={clsx("text-xs", isLight ? "text-slate-400" : "text-white/40")}>{sub}</span>}
      {delta && (
        <span
          className={clsx(
            "inline-flex w-fit items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium",
            deltaTone === "positive" && "bg-status-green/15 text-status-green",
            deltaTone === "negative" && "bg-status-red/15 text-status-red",
            deltaTone === "neutral" && (isLight ? "bg-slate-100 text-slate-500" : "bg-white/10 text-white/60")
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
