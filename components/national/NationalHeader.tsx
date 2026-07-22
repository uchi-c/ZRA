"use client";

import clsx from "clsx";
import type { ReactNode } from "react";
import { LiveClock } from "@/components/reactbits/LiveClock";
import { LiveBadge } from "@/components/reactbits/LiveBadge";
import { ShinyText } from "@/components/reactbits/ShinyText";
import { NotificationsBell } from "@/components/dashboard/NotificationsBell";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface NationalHeaderProps {
  theme: "light" | "dark";
  brandIcon: ReactNode;
  orgName: string;
  orgSubtitle: string;
  title: string;
  subtitle: string;
  userName: string;
  userTitle: string;
  showLive?: boolean;
}

export function NationalHeader({
  theme,
  brandIcon,
  orgName,
  orgSubtitle,
  title,
  subtitle,
  userName,
  userTitle,
  showLive = false,
}: NationalHeaderProps) {
  const isLight = theme === "light";
  return (
    <header
      className={clsx(
        "flex flex-wrap items-center justify-between gap-4 border-b px-4 py-3 sm:px-6",
        isLight ? "border-slate-200 bg-white" : "border-white/10 bg-black/20"
      )}
    >
      <div className="flex items-center gap-3">
        {brandIcon}
        <div className="leading-tight">
          <p className={clsx("text-sm font-bold", isLight ? "text-slate-900" : "text-white")}>{orgName}</p>
          <p className={clsx("text-xs", isLight ? "text-slate-500" : "text-white/50")}>{orgSubtitle}</p>
        </div>
      </div>

      <div className="hidden flex-1 flex-col items-center text-center lg:flex">
        {isLight ? (
          <h1 className="text-lg font-bold tracking-tight text-slate-900 xl:text-xl">{title}</h1>
        ) : (
          <h1 className="text-lg font-bold tracking-tight xl:text-xl">
            <ShinyText text={title} />
          </h1>
        )}
        <p className={clsx("text-xs", isLight ? "text-slate-500" : "text-white/50")}>{subtitle}</p>
      </div>

      <div className="flex items-center gap-4">
        {showLive && <LiveBadge />}
        <ThemeToggle />
        <NotificationsBell theme={theme} />
        <LiveClock
          className={isLight ? "text-slate-600" : "text-white/70"}
          dateClassName={isLight ? "text-slate-500" : "text-white/50"}
          timeClassName={isLight ? "text-slate-800" : "text-white"}
        />
        <div className="flex items-center gap-2">
          <div
            className={clsx(
              "flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold",
              isLight ? "bg-zra-navy/10 text-zra-navy" : "bg-zra-gold/20 text-zra-gold"
            )}
          >
            {userName
              .split(" ")
              .map((p) => p[0])
              .slice(0, 2)
              .join("")}
          </div>
          <div className="hidden leading-tight sm:block">
            <p className={clsx("text-xs font-semibold", isLight ? "text-slate-800" : "text-white")}>{userName}</p>
            <p className={clsx("text-[11px]", isLight ? "text-slate-400" : "text-white/40")}>{userTitle}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
