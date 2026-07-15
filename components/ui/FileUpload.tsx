"use client";

import { useId, useState } from "react";
import clsx from "clsx";

interface FileUploadProps {
  label: string;
  required?: boolean;
  hint?: string;
}

export function FileUpload({ label, required, hint }: FileUploadProps) {
  const id = useId();
  const [fileName, setFileName] = useState<string | null>(null);

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </label>
      <label
        htmlFor={id}
        className={clsx(
          "flex cursor-pointer items-center justify-between gap-3 rounded-md border border-dashed px-3 py-2 text-sm transition",
          fileName
            ? "border-zra-green bg-emerald-50 text-emerald-800"
            : "border-slate-300 bg-slate-50 text-slate-500 hover:border-zra-green hover:bg-emerald-50/50"
        )}
      >
        <span className="truncate">{fileName ?? "Click to choose a file (PDF, JPG, PNG)"}</span>
        <span className="shrink-0 rounded bg-white px-2 py-1 text-xs font-semibold text-zra-green shadow-sm">
          {fileName ? "Change" : "Upload"}
        </span>
      </label>
      <input
        id={id}
        type="file"
        className="sr-only"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
