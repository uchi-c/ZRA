"use client";

import { createContext, useContext, useMemo, useState } from "react";

export interface DashboardStatus {
  label: string;
  value: string;
  tone: "green" | "amber" | "red";
}

interface DashboardStatusContextValue {
  status: DashboardStatus | null;
  setStatus: (status: DashboardStatus | null) => void;
}

const DashboardStatusContext = createContext<DashboardStatusContextValue | undefined>(undefined);

export function DashboardStatusProvider({ children }: { children: React.ReactNode }) {
  const [status, setStatus] = useState<DashboardStatus | null>(null);
  const value = useMemo(() => ({ status, setStatus }), [status]);
  return <DashboardStatusContext.Provider value={value}>{children}</DashboardStatusContext.Provider>;
}

export function useDashboardStatusBar() {
  const ctx = useContext(DashboardStatusContext);
  if (!ctx) throw new Error("useDashboardStatusBar must be used within DashboardStatusProvider");
  return ctx;
}
