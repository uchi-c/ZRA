interface LegendDatum {
  name: string;
  value: number;
  color: string;
  suffix?: string;
}

export function DonutLegend({ data, theme = "light" }: { data: LegendDatum[]; theme?: "light" | "dark" }) {
  const isLight = theme === "light";
  return (
    <ul className="flex flex-col gap-1.5 text-xs">
      {data.map((d) => (
        <li key={d.name} className="flex items-center justify-between gap-3">
          <span className={`flex items-center gap-1.5 ${isLight ? "text-slate-600" : "text-white/70"}`}>
            <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: d.color }} />
            {d.name}
          </span>
          <span className={`font-semibold ${isLight ? "text-slate-800" : "text-white"}`}>
            {d.value}
            {d.suffix ?? "%"}
          </span>
        </li>
      ))}
    </ul>
  );
}
