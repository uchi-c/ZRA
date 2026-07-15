"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { dashboardPathForRole, useAuth } from "@/lib/auth";
import { Sidebar } from "@/components/dashboard/Sidebar";
import { MobileNav } from "@/components/dashboard/MobileNav";
import { NotificationsBell } from "@/components/dashboard/NotificationsBell";
import { UserMenu } from "@/components/dashboard/UserMenu";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
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

  return (
    <div className="flex min-h-screen bg-slate-100">
      <Sidebar role={user.profile.role} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex items-center justify-between gap-4 border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div className="relative hidden max-w-sm flex-1 sm:block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search taxpayers, TPIN, returns..."
              className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-sm focus:border-zra-green focus:outline-none focus:ring-1 focus:ring-zra-green"
            />
          </div>
          <div className="flex flex-1 items-center justify-end gap-3 sm:flex-none">
            <NotificationsBell />
            <UserMenu />
          </div>
        </header>
        <MobileNav role={user.profile.role} />
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6">{children}</main>
      </div>
      <AIAssistantWidget />
    </div>
  );
}
