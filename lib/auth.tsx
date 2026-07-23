"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { AuthUser, Role, UserProfile } from "@/lib/types";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (
    username: string,
    password: string
  ) => Promise<{ ok: true; role: Role } | { ok: false; error: string }>;
  signup: (
    profile: UserProfile,
    password: string
  ) => Promise<
    | { ok: true; registrationNumber: string; userId: string }
    | { ok: false; error: string }
  >;
  logout: () => Promise<void>;
  dashboardPathFor: (role: Role) => string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function dashboardPathForRole(role: Role) {
  if (role === "taxpayer") return "/dashboard/taxpayer";
  if (role === "tax_practitioner") return "/dashboard/practitioner";
  if (role === "zra_consultant") return "/dashboard/consultant";
  if (role === "tsa_admin") return "/national/tsa";
  if (role === "boz_executive") return "/national/boz";
  return "/national/mofnp";
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        setUser(data.user ?? null);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        return { ok: false as const, error: data.error ?? "Invalid username or password." };
      }
      setUser(data.user);
      return { ok: true as const, role: (data.user as AuthUser).profile.role };
    } catch {
      return { ok: false as const, error: "Unable to reach the server. Please try again." };
    }
  }, []);

  const signup = useCallback(async (profile: UserProfile, password: string) => {
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ profile, password }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) {
        return { ok: false as const, error: data.error ?? "Signup failed. Please try again." };
      }
      setUser(data.user);
      return {
        ok: true as const,
        registrationNumber: data.user.registrationNumber as string,
        userId: data.user.userCode as string,
      };
    } catch {
      return { ok: false as const, error: "Unable to reach the server. Please try again." };
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, signup, logout, dashboardPathFor: dashboardPathForRole }),
    [user, loading, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
