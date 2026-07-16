"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

interface VerificationChecklistProps {
  steps: string[];
  onComplete: () => void;
}

export function VerificationChecklist({ steps, onComplete }: VerificationChecklistProps) {
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (completedCount >= steps.length) {
      const timeout = setTimeout(onComplete, 600);
      return () => clearTimeout(timeout);
    }
    const timeout = setTimeout(() => setCompletedCount((c) => c + 1), 550);
    return () => clearTimeout(timeout);
  }, [completedCount, steps.length, onComplete]);

  return (
    <div className="card mx-auto max-w-lg text-center">
      <h2 className="text-lg font-semibold text-slate-900">Automated System Verification</h2>
      <p className="mt-1 text-sm text-slate-500">
        Please wait while we verify your details against national and ZRA databases.
      </p>
      <ul className="mt-6 flex flex-col gap-3 text-left">
        {steps.map((step, i) => {
          const done = i < completedCount;
          const active = i === completedCount;
          return (
            <li
              key={step}
              className={clsx(
                "flex items-center gap-3 rounded-md border px-4 py-2.5 text-sm transition-colors",
                done && "border-emerald-200 bg-emerald-50 text-emerald-800",
                active && !done && "border-zra-navy bg-emerald-50/40 text-slate-700",
                !done && !active && "border-slate-200 bg-slate-50 text-slate-400"
              )}
            >
              <span
                className={clsx(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-xs font-bold",
                  done && "bg-emerald-500 text-white",
                  active && !done && "animate-pulse bg-zra-navy text-white",
                  !done && !active && "bg-slate-200 text-slate-400"
                )}
              >
                {done ? "✓" : i + 1}
              </span>
              {step}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
