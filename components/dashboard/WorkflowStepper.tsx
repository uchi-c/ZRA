"use client";

import Link from "next/link";
import clsx from "clsx";
import { Banknote, Landmark, ShieldCheck, User, UserCog, Users } from "lucide-react";
import type { Role } from "@/lib/types";

const STAGES = [
  { key: "taxpayer", label: "Taxpayer", icon: User, href: "/dashboard/taxpayer" },
  { key: "tax_practitioner", label: "Tax Practitioner", icon: Users, href: "/dashboard/practitioner" },
  { key: "zra_consultant", label: "ZRA Consultant", icon: UserCog, href: "/dashboard/consultant" },
  { key: "revenue_system", label: "ZRA Revenue System", icon: ShieldCheck, href: "/budget" },
  { key: "treasury", label: "Treasury Single Account", icon: Landmark, href: "/budget" },
  { key: "budget", label: "Govt Budget & Service Delivery", icon: Banknote, href: "/budget" },
] as const;

export function WorkflowStepper({ role }: { role: Role }) {
  const activeIndex = STAGES.findIndex((s) => s.key === role);

  return (
    <div className="card overflow-x-auto py-3">
      <ol className="flex min-w-[640px] items-center">
        {STAGES.map((stage, i) => {
          const Icon = stage.icon;
          const isActive = i === activeIndex;
          const isPast = activeIndex >= 0 && i < activeIndex;
          return (
            <li key={stage.key} className="flex flex-1 items-center">
              <Link href={stage.href} className="flex flex-1 flex-col items-center gap-1.5 text-center">
                <span
                  className={clsx(
                    "flex h-9 w-9 items-center justify-center rounded-full border-2 transition",
                    isActive && "border-zra-navy bg-zra-navy text-white dark:border-zra-gold dark:bg-zra-gold dark:text-zra-navy-dark",
                    isPast && !isActive && "border-zra-navy/30 bg-zra-navy/5 text-zra-navy dark:border-zra-gold/40 dark:bg-zra-gold/10 dark:text-zra-gold",
                    !isActive && !isPast && "border-slate-200 bg-white text-slate-400 dark:bg-white/5"
                  )}
                >
                  <Icon className="h-4 w-4" />
                </span>
                <span
                  className={clsx(
                    "max-w-[6.5rem] text-[11px] font-medium leading-tight",
                    isActive ? "text-zra-navy dark:text-zra-gold" : "text-slate-500"
                  )}
                >
                  {stage.label}
                </span>
              </Link>
              {i < STAGES.length - 1 && (
                <div className={clsx("mb-5 h-0.5 flex-1", isPast ? "bg-zra-navy/40 dark:bg-zra-gold/40" : "bg-slate-200")} />
              )}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
