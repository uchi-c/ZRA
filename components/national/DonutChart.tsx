"use client";

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DonutDatum {
  name: string;
  value: number;
  color: string;
}

export function DonutChart({
  data,
  centerLabel,
  centerSub,
  theme = "light",
  height = 220,
}: {
  data: DonutDatum[];
  centerLabel: string;
  centerSub?: string;
  theme?: "light" | "dark";
  height?: number;
}) {
  const isLight = theme === "light";
  return (
    <div className="relative" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} dataKey="value" nameKey="name" innerRadius="62%" outerRadius="95%" paddingAngle={1.5} stroke="none">
            {data.map((d) => (
              <Cell key={d.name} fill={d.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value}%`, name]}
            contentStyle={
              isLight
                ? undefined
                : { background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }
            }
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
        <span className={`text-lg font-bold ${isLight ? "text-slate-900" : "text-white"}`}>{centerLabel}</span>
        {centerSub && <span className={`text-xs ${isLight ? "text-slate-400" : "text-white/40"}`}>{centerSub}</span>}
      </div>
    </div>
  );
}
