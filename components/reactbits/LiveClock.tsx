"use client";

import { useEffect, useState } from "react";
import clsx from "clsx";

export function LiveClock({ className, dateClassName, timeClassName }: { className?: string; dateClassName?: string; timeClassName?: string }) {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  const date = now ?? new Date();
  const dateLabel = date.toLocaleDateString("en-GB", { day: "2-digit", month: "long", year: "numeric" });
  const timeLabel = date.toLocaleTimeString("en-GB", { hour12: false });

  return (
    <div className={clsx("flex flex-col items-end leading-tight", className)}>
      <span className={clsx("text-xs font-medium", dateClassName)}>{dateLabel}</span>
      <span className={clsx("font-mono text-sm font-semibold tabular-nums", timeClassName)}>{timeLabel}</span>
    </div>
  );
}
