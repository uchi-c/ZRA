"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BUDGET_SECTORS } from "@/lib/mockData";

const COLORS = [
  "#0a5c36",
  "#0e7a47",
  "#15803d",
  "#16a34a",
  "#22c55e",
  "#4ade80",
  "#86efac",
  "#eab308",
  "#f59e0b",
  "#c0362c",
  "#94a3b8",
];

export function SectorAllocationChart() {
  return (
    <div className="h-[420px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={BUDGET_SECTORS} layout="vertical" margin={{ left: 24, right: 32, top: 8, bottom: 8 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis type="number" tickFormatter={(v) => `K${v}B`} tick={{ fontSize: 12, fill: "#64748b" }} />
          <YAxis
            type="category"
            dataKey="sector"
            width={190}
            tick={{ fontSize: 12, fill: "#334155" }}
          />
          <Tooltip
            formatter={(value, _name, item) => [
              `K${Number(value).toFixed(1)}B (${(item.payload as { percent: number }).percent}%)`,
              "Allocation",
            ]}
          />
          <Bar dataKey="amount" radius={[0, 4, 4, 0]}>
            {BUDGET_SECTORS.map((entry, index) => (
              <Cell key={entry.sector} fill={COLORS[index % COLORS.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
