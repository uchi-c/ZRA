"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import clsx from "clsx";
import { navItemsForRole } from "@/lib/navConfig";
import type { Role } from "@/lib/types";

export function MobileNav({ role }: { role: Role }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentFullPath = searchParams.toString() ? `${pathname}?${searchParams.toString()}` : pathname;
  const items = navItemsForRole(role);

  return (
    <nav className="flex gap-1 overflow-x-auto border-b border-slate-200 bg-white px-4 py-2 lg:hidden">
      {items.map((item) => {
        const active = currentFullPath === item.href;
        const Icon = item.icon;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={clsx(
              "flex shrink-0 items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition",
              active ? "bg-emerald-50 text-zra-green" : "text-slate-500 hover:bg-slate-50"
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
