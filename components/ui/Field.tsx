"use client";

import { useId } from "react";

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

interface RadioGroupProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  className?: string;
}

export function RadioGroup({ label, value, onChange, options, required, className }: RadioGroupProps) {
  const name = useId();
  return (
    <div className={className}>
      <span className="field-label">
        {label} {required && <span className="text-zra-red">*</span>}
      </span>
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        {options.map((opt) => (
          <label key={opt.value} className="flex items-center gap-2 text-sm text-slate-700">
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={(e) => onChange(e.target.value)}
              className="h-4 w-4 border-slate-300 text-zra-green focus:ring-zra-green"
            />
            {opt.label}
          </label>
        ))}
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
        className="mt-0.5 h-4 w-4 rounded border-slate-300 text-zra-green focus:ring-zra-green"
      />
      <span>{label}</span>
    </label>
  );
}
