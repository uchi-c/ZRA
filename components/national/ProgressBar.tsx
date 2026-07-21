import clsx from "clsx";

const TONE_BAR: Record<string, string> = {
  navy: "bg-zra-navy",
  gold: "bg-zra-gold",
  green: "bg-status-green",
  amber: "bg-status-amber",
  red: "bg-status-red",
};

export function ProgressBar({
  value,
  tone = "navy",
  theme = "light",
  className,
}: {
  value: number;
  tone?: keyof typeof TONE_BAR;
  theme?: "light" | "dark";
  className?: string;
}) {
  return (
    <div
      className={clsx(
        "h-1.5 w-full overflow-hidden rounded-full",
        theme === "light" ? "bg-slate-200" : "bg-white/10",
        className
      )}
    >
      <div className={clsx("h-full rounded-full transition-all", TONE_BAR[tone])} style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
