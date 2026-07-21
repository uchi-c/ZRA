"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

export function SimpleBarChart({
  data,
  color = "#0F2A5C",
  theme = "light",
  height = 220,
  unit = "",
}: {
  data: { name: string; value: number }[];
  color?: string;
  theme?: "light" | "dark";
  height?: number;
  unit?: string;
}) {
  const isLight = theme === "light";
  const gridColor = isLight ? "#e2e8f0" : "rgba(255,255,255,0.08)";
  const tickColor = isLight ? "#64748b" : "rgba(255,255,255,0.5)";
  return (
    <div style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
          <XAxis dataKey="name" tick={{ fontSize: 10, fill: tickColor }} interval={0} />
          <YAxis tick={{ fontSize: 10, fill: tickColor }} width={40} />
          <Tooltip
            formatter={(value) => [`${value}${unit}`, ""]}
            contentStyle={
              isLight
                ? undefined
                : { background: "#0f172a", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, color: "#fff" }
            }
          />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
