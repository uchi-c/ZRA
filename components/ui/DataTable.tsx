"use client";

import { useMemo, useState } from "react";
import clsx from "clsx";
import { useTheme } from "@/lib/theme";

export interface DataTableColumn<T> {
  key: string;
  header: string;
  sortable?: boolean;
  align?: "left" | "right" | "center";
  render: (row: T) => React.ReactNode;
  sortValue?: (row: T) => string | number;
}

interface DataTableProps<T> {
  columns: DataTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  className?: string;
  emptyMessage?: string;
  theme?: "light" | "dark";
}

export function DataTable<T>({ columns, data, rowKey, className, emptyMessage, theme }: DataTableProps<T>) {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");
  const { theme: globalTheme } = useTheme();
  const isLight = (theme ?? globalTheme) === "light";

  const sorted = useMemo(() => {
    if (!sortKey) return data;
    const col = columns.find((c) => c.key === sortKey);
    if (!col?.sortValue) return data;
    const copy = [...data];
    copy.sort((a, b) => {
      const av = col.sortValue!(a);
      const bv = col.sortValue!(b);
      if (av < bv) return sortDir === "asc" ? -1 : 1;
      if (av > bv) return sortDir === "asc" ? 1 : -1;
      return 0;
    });
    return copy;
  }, [data, sortKey, sortDir, columns]);

  function toggleSort(col: DataTableColumn<T>) {
    if (!col.sortable) return;
    if (sortKey === col.key) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(col.key);
      setSortDir("asc");
    }
  }

  return (
    <div className={clsx("overflow-x-auto rounded-lg border", isLight ? "border-slate-200" : "border-white/10", className)}>
      <table className={clsx("min-w-full divide-y text-sm", isLight ? "divide-slate-200" : "divide-white/10")}>
        <thead className={isLight ? "bg-slate-50" : "bg-white/5"}>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => toggleSort(col)}
                className={clsx(
                  "whitespace-nowrap px-4 py-2.5 text-xs font-semibold uppercase tracking-wide",
                  isLight ? "text-slate-500" : "text-white/50",
                  col.align === "right" && "text-right",
                  col.align === "center" && "text-center",
                  (!col.align || col.align === "left") && "text-left",
                  col.sortable && (isLight ? "cursor-pointer select-none hover:text-slate-700" : "cursor-pointer select-none hover:text-white")
                )}
              >
                {col.header}
                {col.sortable && sortKey === col.key && (sortDir === "asc" ? " ↑" : " ↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={clsx("divide-y", isLight ? "divide-slate-100 bg-white" : "divide-white/5 bg-transparent")}>
          {sorted.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className={clsx("px-4 py-8 text-center", isLight ? "text-slate-400" : "text-white/40")}>
                {emptyMessage ?? "No records to display."}
              </td>
            </tr>
          ) : (
            sorted.map((row) => (
              <tr key={rowKey(row)} className={isLight ? "hover:bg-slate-50" : "hover:bg-white/5"}>
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={clsx(
                      "whitespace-nowrap px-4 py-2.5",
                      isLight ? "text-slate-700" : "text-white/80",
                      col.align === "right" && "text-right",
                      col.align === "center" && "text-center"
                    )}
                  >
                    {col.render(row)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
