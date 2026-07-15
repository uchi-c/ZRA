import clsx from "clsx";

type Tone = "green" | "amber" | "red" | "blue" | "slate";

const STYLES: Record<Tone, string> = {
  green: "bg-emerald-100 text-emerald-800 border-emerald-200",
  amber: "bg-amber-100 text-amber-800 border-amber-200",
  red: "bg-red-100 text-red-800 border-red-200",
  blue: "bg-blue-100 text-blue-800 border-blue-200",
  slate: "bg-slate-100 text-slate-700 border-slate-200",
};

export function Pill({ label, tone = "slate", className }: { label: string; tone?: Tone; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STYLES[tone],
        className
      )}
    >
      {label}
    </span>
  );
}
