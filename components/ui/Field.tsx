"use client";

import { useId } from "react";
import clsx from "clsx";

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function TextField({ label, value, onChange, type = "text", required, placeholder, className }: TextFieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      />
    </div>
  );
}

interface SelectFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  required?: boolean;
  placeholder?: string;
  className?: string;
}

export function SelectField({ label, value, onChange, options, required, placeholder, className }: SelectFieldProps) {
  const id = useId();
  return (
    <div className={className}>
      <label htmlFor={id} className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </label>
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="field-input"
      >
        <option value="" disabled>
          {placeholder ?? "Select..."}
        </option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}

interface SegmentedGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

export function SegmentedGroup({ label, value, onChange, options, required, className }: SegmentedGroupProps) {
  return (
    <div className={className}>
      <span className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </span>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const selected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={selected}
              className={clsx(
                "rounded-full border px-3.5 py-1.5 text-sm font-medium transition",
                selected
                  ? "border-zra-navy bg-zra-navy text-white"
                  : "border-slate-300 bg-white text-zra-navy hover:border-zra-navy"
              )}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface CheckboxFieldProps {
  label: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
  required?: boolean;
  className?: string;
}

export function CheckboxField({ label, checked, onChange, required, className }: CheckboxFieldProps) {
  return (
    <label className={`flex items-start gap-2 text-sm text-slate-700 ${className ?? ""}`}>
      <input
        type="checkbox"
        required={required}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-zra-navy focus:ring-zra-navy"
      />
      <span>{label}</span>
    </label>
  );
}
