"use client";

import { useState } from "react";
import clsx from "clsx";

export interface TabItem {
  id: string;
  label: string;
  content: React.ReactNode;
  badge?: React.ReactNode;
}

export function Tabs({ tabs, defaultTabId }: { tabs: TabItem[]; defaultTabId?: string }) {
  const [active, setActive] = useState(defaultTabId ?? tabs[0]?.id);

  return (
    <div>
      <div className="flex flex-wrap gap-1 overflow-x-auto rounded-lg border border-slate-200 bg-slate-100 p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActive(tab.id)}
            className={clsx(
              "flex items-center gap-2 whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition",
              active === tab.id
                ? "bg-white text-zra-navy shadow-sm"
                : "text-slate-600 hover:text-slate-900"
            )}
          >
            {tab.label}
            {tab.badge}
          </button>
        ))}
      </div>
      <div className="mt-4">{tabs.find((t) => t.id === active)?.content}</div>
    </div>
  );
}
