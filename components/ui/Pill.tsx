import clsx from "clsx";

type Tone = "green" | "amber" | "red" | "blue" | "slate";

const STYLES: Record<Tone, string> = {
  green: "bg-status-green/15 text-status-green",
  amber: "bg-status-amber/15 text-status-amber",
  red: "bg-status-red/15 text-status-red",
  blue: "bg-blue-500/15 text-blue-700",
  slate: "bg-slate-200/60 text-slate-700",
};

export function Pill({ label, tone = "slate", className }: { label: string; tone?: Tone; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        STYLES[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
