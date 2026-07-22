"use client";

import { useState } from "react";
import { Bell } from "lucide-react";
import clsx from "clsx";
import { NOTIFICATIONS } from "@/lib/mockData";

const TONE_DOT: Record<string, string> = {
  info: "bg-blue-500",
  warning: "bg-amber-500",
  success: "bg-emerald-500",
};

export function NotificationsBell({ theme = "light" }: { theme?: "light" | "dark" }) {
  const [open, setOpen] = useState(false);
  const unreadCount = NOTIFICATIONS.filter((n) => n.unread).length;
  const isLight = theme === "light";

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={clsx(
          "relative flex h-9 w-9 items-center justify-center rounded-full",
          isLight ? "text-slate-500 hover:bg-slate-100" : "text-white/70 hover:bg-white/10"
        )}
        aria-label="Notifications"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-status-red text-[10px] font-bold text-white">
            {unreadCount}
          </span>
        )}
      </button>
      {open && (
        <>
          <button
            type="button"
            aria-label="Close notifications"
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            className={clsx(
              "absolute right-0 z-50 mt-2 w-80 rounded-xl border p-2 shadow-lg",
              isLight ? "border-slate-200 bg-white" : "border-white/10 bg-slate-900"
            )}
          >
            <div className="flex items-center justify-between px-2 py-1.5">
              <p className={clsx("text-sm font-semibold", isLight ? "text-slate-900" : "text-white")}>Notifications</p>
              <span className={clsx("text-xs", isLight ? "text-slate-400" : "text-white/40")}>{unreadCount} unread</span>
            </div>
            <div className="flex flex-col gap-1">
              {NOTIFICATIONS.map((n) => (
                <div
                  key={n.id}
                  className={clsx(
                    "flex items-start gap-2.5 rounded-lg px-2 py-2 text-left",
                    n.unread ? (isLight ? "bg-slate-50" : "bg-white/5") : ""
                  )}
                >
                  <span className={clsx("mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full", TONE_DOT[n.tone])} />
                  <div className="min-w-0">
                    <p className={clsx("text-sm font-medium", isLight ? "text-slate-800" : "text-white/90")}>{n.title}</p>
                    <p className={clsx("truncate text-xs", isLight ? "text-slate-500" : "text-white/50")}>{n.description}</p>
                    <p className={clsx("mt-0.5 text-[11px]", isLight ? "text-slate-400" : "text-white/30")}>{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
