"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { dashboardPathForRole, useAuth } from "@/lib/auth";

const PORTAL_LABEL: Record<string, string> = {
  taxpayer: "Taxpayer Portal",
  tax_practitioner: "Tax Practitioner Portal",
  zra_consultant: "ZRA Consultant Portal",
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    const homePath = dashboardPathForRole(user.profile.role);
    if (!pathname.startsWith(homePath)) {
      router.replace(homePath);
    }
  }, [loading, user, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 text-sm text-slate-400">
        Loading...
      </div>
    );
  }

  const fullName = `${user.profile.firstName} ${user.profile.surname}`;

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-zra-green-dark text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-lg font-bold">
              🇿🇲
            </div>
            <div>
              <p className="text-sm font-semibold leading-tight">Zambia Revenue Authority</p>
              <p className="text-xs text-emerald-100">{PORTAL_LABEL[user.profile.role]}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/budget" className="hidden text-xs font-medium text-emerald-100 hover:text-white sm:block">
              National Budget
            </Link>
            <div className="text-right">
              <p className="text-sm font-semibold leading-tight">{fullName}</p>
              <p className="text-xs text-emerald-100">
                {"tpin" in user.profile
                  ? `TPIN ${user.profile.tpin}`
                  : "consultantNumber" in user.profile
                    ? user.profile.consultantNumber
                    : ""}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                logout();
                router.push("/login");
              }}
              className="rounded-md bg-white/10 px-3 py-1.5 text-xs font-semibold hover:bg-white/20"
            >
              Log Out
            </button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6">{children}</main>
    </div>
  );
}
