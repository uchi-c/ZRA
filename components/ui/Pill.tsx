"use client";

import clsx from "clsx";
import { useTheme } from "@/lib/theme";

type Tone = "green" | "amber" | "red" | "blue" | "slate";
type Theme = "light" | "dark";

const STYLES_LIGHT: Record<Tone, string> = {
  green: "bg-status-green/15 text-status-green",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  blue: "bg-blue-500/15 text-blue-700",
  slate: "bg-slate-200/60 text-slate-700",
};

const STYLES_DARK: Record<Tone, string> = {
  green: "bg-status-green/15 text-status-green",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  blue: "bg-sky-400/15 text-sky-300",
  slate: "bg-white/10 text-white/70",
};

export function Pill({
  label,
  tone = "slate",
  theme,
  className,
}: {
  label: string;
  tone?: Tone;
  theme?: Theme;
  className?: string;
}) {
  const { theme: globalTheme } = useTheme();
  const resolvedTheme = theme ?? globalTheme;
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        (resolvedTheme === "light" ? STYLES_LIGHT : STYLES_DARK)[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
