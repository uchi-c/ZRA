"use client";

import { useId, useState } from "react";
import clsx from "clsx";
import { CheckCircle2, UploadCloud } from "lucide-react";

interface FileUploadProps {
  label: string;
  required?: boolean;
  hint?: string;
}

function formatSize(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({ label, required, hint }: FileUploadProps) {
  const id = useId();
  const [file, setFile] = useState<{ name: string; size: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(f: File | undefined | null) {
    if (f) setFile({ name: f.name, size: f.size });
  }

  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </label>
      <label
        htmlFor={id}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          handleFile(e.dataTransfer.files?.[0]);
        }}
        className={clsx(
          "flex cursor-pointer flex-col items-center justify-center gap-1.5 rounded-lg border-2 border-dashed px-4 py-6 text-center transition",
          file
            ? "border-status-green bg-status-green/5"
            : isDragging
              ? "border-zra-navy bg-zra-navy/5"
              : "border-slate-300 bg-slate-50 hover:border-zra-navy hover:bg-zra-navy/5"
        )}
      >
        {file ? (
          <>
            <CheckCircle2 className="h-6 w-6 text-status-green" />
            <span className="text-sm font-medium text-slate-800">{file.name}</span>
            <span className="text-xs text-slate-400">{formatSize(file.size)} · click to change</span>
          </>
        ) : (
          <>
            <UploadCloud className="h-6 w-6 text-slate-400" />
            <span className="text-sm font-medium text-slate-600">Drag & drop or click to upload</span>
            <span className="text-xs text-slate-400">PDF, JPG or PNG, up to 10MB</span>
          </>
        )}
      </label>
      <input
        id={id}
        type="file"
        className="sr-only"
        accept=".pdf,.jpg,.jpeg,.png"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {hint && <p className="mt-1 text-xs text-slate-400">{hint}</p>}
    </div>
  );
}
