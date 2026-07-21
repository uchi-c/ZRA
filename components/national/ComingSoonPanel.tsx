import { Construction } from "lucide-react";
import clsx from "clsx";

export function ComingSoonPanel({ title, theme }: { title: string; theme: "light" | "dark" }) {
  const isLight = theme === "light";
  return (
    <div
      className={clsx(
        "flex flex-1 flex-col items-center justify-center gap-3 rounded-xl border py-24 text-center",
        isLight ? "border-[#EDEFF3] bg-white shadow-card" : "border-white/10 bg-white/[0.03]"
      )}
    >
      <span
        className={clsx(
          "flex h-12 w-12 items-center justify-center rounded-full",
          isLight ? "bg-zra-navy/10 text-zra-navy" : "bg-white/10 text-white/60"
        )}
      >
        <Construction className="h-6 w-6" />
      </span>
      <h1 className={clsx("text-lg font-bold", isLight ? "text-slate-900" : "text-white")}>{title}</h1>
      <p className={clsx("max-w-sm text-sm", isLight ? "text-slate-500" : "text-white/50")}>
        This module is being connected to the national fiscal data integration platform and will be available in a future release.
      </p>
    </div>
  );
}
