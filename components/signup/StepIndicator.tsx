import clsx from "clsx";
import { Check } from "lucide-react";

export function StepIndicator({ steps, current }: { steps: string[]; current: number }) {
  const progress = (current / (steps.length - 1)) * 100;

  return (
    <div className="mb-6">
      <div className="mb-4 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
        <div
          className="h-full rounded-full bg-zra-gold transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>
      <ol className="flex items-center overflow-x-auto">
        {steps.map((label, i) => {
          const done = i < current;
          const active = i === current;
          return (
            <li key={label} className="flex flex-1 items-center last:flex-none">
              <div className="flex flex-col items-center gap-1.5 text-center">
                <span
                  className={clsx(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition",
                    done && "bg-zra-navy text-white",
                    active && !done && "border-2 border-zra-gold bg-white text-zra-navy",
                    !active && !done && "border-2 border-slate-200 bg-white text-slate-400"
                  )}
                >
                  {done ? <Check className="h-4 w-4" /> : i + 1}
                </span>
                <span
                  className={clsx(
                    "max-w-[5.5rem] text-[11px] font-medium leading-tight",
                    active ? "text-zra-navy" : done ? "text-slate-600" : "text-slate-400"
                  )}
                >
                  {label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={clsx("mx-2 mb-4 h-0.5 flex-1", done ? "bg-zra-navy" : "bg-slate-200")} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
