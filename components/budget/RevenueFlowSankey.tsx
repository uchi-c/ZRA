"use client";

import { ResponsiveContainer, Sankey, Tooltip, Layer, Rectangle } from "recharts";
import { BUDGET_SECTORS, NATIONAL_BUDGET } from "@/lib/mockData";

const REVENUE_SOURCE_LINKS = [
  { name: "Income Tax", value: 30 },
  { name: "VAT", value: 25 },
  { name: "PAYE", value: 20 },
  { name: "Other Taxes & Levies", value: 15 },
  { name: "Non-Tax Revenue", value: NATIONAL_BUDGET.nonTaxRevenue },
  { name: "Grants & Aid", value: NATIONAL_BUDGET.grantsAid },
];

const nodes = [
  ...REVENUE_SOURCE_LINKS.map((s) => ({ name: s.name })),
  { name: "Treasury Single Account" },
  ...BUDGET_SECTORS.map((s) => ({ name: s.sector })),
];

const treasuryIndex = REVENUE_SOURCE_LINKS.length;

const links = [
  ...REVENUE_SOURCE_LINKS.map((s, i) => ({ source: i, target: treasuryIndex, value: s.value })),
  ...BUDGET_SECTORS.map((s, i) => ({
    source: treasuryIndex,
    target: treasuryIndex + 1 + i,
    value: s.amount,
  })),
];

const data = { nodes, links };

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
  "#f97316",
  "#c0362c",
  "#94a3b8",
];

interface SankeyNodeProps {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  index?: number;
  payload?: { name: string };
}

function CustomNode({ x = 0, y = 0, width = 0, height = 0, index = 0, payload = { name: "" } }: SankeyNodeProps) {
  const isTreasury = payload.name === "Treasury Single Account";
  return (
    <Layer>
      <Rectangle
        x={x}
        y={y}
        width={width}
        height={height}
        fill={isTreasury ? "#063d24" : COLORS[index % COLORS.length]}
        fillOpacity={0.9}
      />
      <text
        textAnchor={x < 300 ? "start" : "end"}
        x={x < 300 ? x + width + 6 : x - 6}
        y={y + height / 2}
        fontSize={11}
        fill="#334155"
        dominantBaseline="middle"
      >
        {payload.name}
      </text>
    </Layer>
  );
}

export function RevenueFlowSankey() {
  return (
    <div className="h-[420px] w-full sm:h-[480px]">
      <ResponsiveContainer width="100%" height="100%">
        <Sankey
          data={data}
          node={<CustomNode />}
          nodePadding={18}
          margin={{ left: 140, right: 160, top: 10, bottom: 10 }}
          link={{ stroke: "#0a5c36", strokeOpacity: 0.15 }}
        >
          <Tooltip formatter={(value) => [`K${Number(value).toFixed(1)}B`, "Amount"]} />
        </Sankey>
      </ResponsiveContainer>
    </div>
  );
}
