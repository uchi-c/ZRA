"use client";

import { zmw } from "@/lib/mockData";

interface CategoryAmountTableProps {
  categoryLabel: string;
  values: Record<string, number>;
  onChange: (category: string, value: number) => void;
  total: number;
  totalLabel: string;
}

export function CategoryAmountTable({
  categoryLabel,
  values,
  onChange,
  total,
  totalLabel,
}: CategoryAmountTableProps) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-white/10">
      <table className="min-w-full divide-y divide-slate-200 text-sm dark:divide-white/10">
        <thead className="bg-slate-50 dark:bg-white/5">
          <tr>
            <th className="px-4 py-2.5 text-left text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              {categoryLabel}
            </th>
            <th className="px-4 py-2.5 text-right text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-white/50">
              Amount (ZMW)
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100 bg-white dark:divide-white/5 dark:bg-transparent">
          {Object.entries(values).map(([category, value]) => (
            <tr key={category}>
              <td className="px-4 py-2 text-slate-700 dark:text-white/80">{category}</td>
              <td className="px-4 py-2 text-right">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => onChange(category, Number(e.target.value))}
                  className="w-32 rounded-md border border-slate-300 bg-white px-2 py-1 text-right text-sm text-slate-900 focus:border-zra-navy focus:outline-none focus:ring-1 focus:ring-zra-navy dark:border-white/10 dark:bg-white/5 dark:text-white sm:w-40"
                />
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr className="bg-slate-50 font-semibold text-slate-900 dark:bg-white/5 dark:text-white">
            <td className="px-4 py-2.5">{totalLabel}</td>
            <td className="px-4 py-2.5 text-right">{zmw(total)}</td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}
