import clsx from "clsx";
import type { ReactNode } from "react";

interface DarkPanelProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function DarkPanel({ title, icon, children, className, theme = "dark" }: DarkPanelProps) {
  const isLight = theme === "light";
  return (
    <section
      className={clsx(
        "rounded-xl border p-4",
        isLight ? "border-[#EDEFF3] bg-white shadow-card" : "border-white/10 bg-white/[0.03]",
        className
      )}
    >
      <div className="mb-3 flex items-center gap-2">
        {icon}
        <h2 className={clsx("text-xs font-semibold uppercase tracking-wide", isLight ? "text-slate-500" : "text-white/60")}>{title}</h2>
      </div>
      {children}
    </section>
  );
}
