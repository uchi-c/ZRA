"use client";

import { useState } from "react";
import clsx from "clsx";

interface FormSectionProps {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
  right?: React.ReactNode;
}

export function FormSection({
  title,
  description,
  defaultOpen = true,
  children,
  className,
  right,
}: FormSectionProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={clsx("card", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-4 text-left"
      >
        <div>
          <h3 className="text-base font-semibold text-slate-900">{title}</h3>
          {description && <p className="mt-0.5 text-sm text-slate-500">{description}</p>}
        </div>
        <div className="flex items-center gap-3">
          {right}
          <span
            className={clsx(
              "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-slate-300 text-slate-500 transition-transform",
              open && "rotate-180"
            )}
          >
            ▾
          </span>
        </div>
      </button>
      {open && <div className="mt-4 border-t border-slate-100 pt-4">{children}</div>}
    </div>
  );
}
