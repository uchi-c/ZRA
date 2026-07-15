"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { REVENUE_PERFORMANCE, zmwCompact } from "@/lib/mockData";

export function RevenueTrendChart() {
  return (
    <div className="h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={REVENUE_PERFORMANCE} margin={{ left: 8, right: 16, top: 8, bottom: 0 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0a5c36" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#0a5c36" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis dataKey="period" tick={{ fontSize: 11, fill: "#64748b" }} />
          <YAxis tickFormatter={(v) => zmwCompact(v)} tick={{ fontSize: 11, fill: "#64748b" }} width={70} />
          <Tooltip formatter={(value) => [zmwCompact(Number(value)), "Taxes Collected"]} />
          <Area
            type="monotone"
            dataKey="taxesCollected"
            stroke="#0a5c36"
            strokeWidth={2}
            fill="url(#revenueFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
