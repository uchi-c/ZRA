"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import type { ReactNode } from "react";
import { TSA_NAV, BOZ_NAV, MOFNP_NAV } from "@/lib/nationalNavConfig";

interface NationalSidebarProps {
  brandIcon: ReactNode;
  brandLabel: string;
  brandSubLabel: string;
  dept: "tsa" | "boz" | "mofnp";
  theme: "light" | "dark";
  footer?: ReactNode;
}

const NAV_BY_DEPT = { tsa: TSA_NAV, boz: BOZ_NAV, mofnp: MOFNP_NAV };

export function NationalSidebar({ brandIcon, brandLabel, brandSubLabel, dept, theme, footer }: NationalSidebarProps) {
  const pathname = usePathname();
  const isDark = theme === "dark";
  const navItems = NAV_BY_DEPT[dept];

  return (
    <aside
      className={clsx(
        "hidden w-64 shrink-0 flex-col text-white lg:flex",
        isDark ? "bg-slate-950 border-r border-white/5" : "bg-zra-navy-dark"
      )}
    >
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        {brandIcon}
        <div>
          <p className="text-sm font-bold leading-tight">{brandLabel}</p>
          <p className="text-[11px] text-white/60">{brandSubLabel}</p>
        </div>
      </div>
      <p className="px-5 pt-4 text-[10px] font-semibold uppercase tracking-widest text-white/30">Main Menu</p>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {navItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm font-medium transition",
                active
                  ? "border-zra-gold bg-white/10 text-white"
                  : "border-transparent text-white/60 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      {footer && <div className="border-t border-white/10 px-5 py-4">{footer}</div>}
    </aside>
  );
}
