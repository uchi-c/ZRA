"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { dashboardPathForRole, useAuth } from "@/lib/auth";
import { nationalHomePathForRole } from "@/lib/nationalNavConfig";

const NATIONAL_ROLES = ["tsa_admin", "boz_executive", "mofnp_admin"] as const;

export default function NationalLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      router.replace("/login");
      return;
    }
    if (!NATIONAL_ROLES.includes(user.profile.role as (typeof NATIONAL_ROLES)[number])) {
      router.replace(dashboardPathForRole(user.profile.role));
      return;
    }
    const homePath = nationalHomePathForRole(user.profile.role);
    if (!pathname.startsWith(homePath)) {
      router.replace(homePath);
    }
  }, [loading, user, pathname, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950 text-sm text-white/50">
        Loading...
      </div>
    );
  }

  return <>{children}</>;
}
