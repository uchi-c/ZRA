"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { LandPlot } from "lucide-react";
import { navItemsForRole } from "@/lib/navConfig";
import type { Role } from "@/lib/types";

const PORTAL_LABEL: Record<Role, string> = {
  taxpayer: "Taxpayer Portal",
  tax_practitioner: "Practitioner Portal",
  zra_consultant: "Consultant Portal",
  tsa_admin: "TSA Dashboard",
  boz_executive: "BOZ Dashboard",
  mofnp_admin: "MoFNP Dashboard",
};

export function Sidebar({ role }: { role: Role }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
  const items = navItemsForRole(role);

  return (
    <aside className="hidden w-64 shrink-0 flex-col bg-zra-navy-dark text-white lg:flex">
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-5">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10">
          <LandPlot className="h-5 w-5" />
        </div>
        <div>
          <p className="text-sm font-bold leading-tight">ZRA</p>
          <p className="text-[11px] text-white/70">{PORTAL_LABEL[role]}</p>
        </div>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        {items.map((item) => {
          const active = currentFullPath === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 rounded-lg border-l-2 px-3 py-2 text-sm font-medium transition",
                active
                  ? "border-zra-gold bg-white/10 text-white"
                  : "border-transparent text-white/70 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 px-5 py-4">
        <Link href="/budget" className="text-xs font-medium text-white/70 hover:text-white">
          View National Budget →
        </Link>
      </div>
    </aside>
  );
}
