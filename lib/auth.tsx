"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Role, StoredUser, UserProfile } from "@/lib/types";

const USERS_KEY = "zra_users_v1";
const SESSION_KEY = "zra_session_v1";

function readUsers(): StoredUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(USERS_KEY);
    return raw ? (JSON.parse(raw) as StoredUser[]) : [];
  } catch {
    return [];
  }
}

function writeUsers(users: StoredUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

const ROLE_PREFIX: Record<Role, string> = {
  taxpayer: "TP",
  tax_practitioner: "PR",
  zra_consultant: "CN",
  tsa_admin: "TSA",
  boz_executive: "BOZ",
  mofnp_admin: "MOF",
};

function generateRegistrationNumber(role: Role) {
  return `ZRA-${ROLE_PREFIX[role]}-${Math.floor(100000 + Math.random() * 900000)}`;
}

function generateUserId() {
  return `UID-${Math.floor(10000000 + Math.random() * 90000000)}`;
}

const DEMO_USERS: StoredUser[] = [
  {
    password: "demo123",
    registrationNumber: "ZRA-TP-100001",
    userId: "UID-10000001",
    profile: {
      role: "taxpayer",
      nrcNumber: "123456/10/1",
      firstName: "John",
      surname: "Taxpayer",
      dateOfBirth: "1988-04-12",
      gender: "Male",
      mobileNumber: "0977000001",
      email: "john.taxpayer@example.com",
      physicalAddress: "Plot 14, Kabulonga",
      province: "Lusaka",
      district: "Lusaka",
      username: "taxpayer",
      tpin: "12345678",
      taxpayerType: "Company",
      businessName: "JT Enterprises Limited",
      businessRegistrationNumber: "PACRA-2019-4521",
      projectedAnnualTurnover: "1500000",
    },
  },
  {
    password: "demo123",
    registrationNumber: "ZRA-PR-200001",
    userId: "UID-20000001",
    profile: {
      role: "tax_practitioner",
      nrcNumber: "234567/11/1",
      firstName: "Sarah",
      surname: "Williams",
      dateOfBirth: "1985-09-03",
      mobileNumber: "0977000002",
      email: "sarah.williams@example.com",
      physicalAddress: "15 Cairo Road",
      province: "Lusaka",
      district: "Lusaka",
      username: "practitioner",
      category: "GTP",
      membershipNumber: "ZICA-88213",
      professionalBody: "ZICA",
      highestQualification: "ACCA",
      yearsOfExperience: "9",
      currentEmployer: "Mwansa & Associates",
      tpin: "23456789",
      criminalRecordClearance: "Yes",
      educationLevel: "Bachelor's Degree",
    },
  },
  {
    password: "demo123",
    registrationNumber: "ZRA-CN-300001",
    userId: "UID-30000001",
    profile: {
      role: "zra_consultant",
      nrcNumber: "345678/12/1",
      firstName: "Grace",
      surname: "Mulenga",
      dateOfBirth: "1980-01-20",
      mobileNumber: "0977000003",
      email: "grace.mulenga@zra.org.zm",
      physicalAddress: "ZRA Headquarters, Kabwe Road",
      province: "Lusaka",
      district: "Lusaka",
      username: "consultant",
      consultantNumber: "TC-10045",
      region: "Lusaka",
    },
  },
  {
    password: "demo123",
    registrationNumber: "ZRA-TSA-400001",
    userId: "UID-40000001",
    profile: {
      role: "tsa_admin",
      firstName: "TSA",
      surname: "Admin",
      email: "tsa.admin@mofnp.gov.zm",
      username: "tsaadmin",
      title: "Administrator",
      institution: "Ministry of Finance and National Planning",
    },
  },
  {
    password: "demo123",
    registrationNumber: "ZRA-BOZ-500001",
    userId: "UID-50000001",
    profile: {
      role: "boz_executive",
      firstName: "BOZ",
      surname: "Executive",
      email: "governor.office@boz.zm",
      username: "bozexec",
      title: "Governor",
      institution: "Bank of Zambia",
    },
  },
  {
    password: "demo123",
    registrationNumber: "ZRA-MOF-600001",
    userId: "UID-60000001",
    profile: {
      role: "mofnp_admin",
      firstName: "MoFNP",
      surname: "Admin",
      email: "admin@mofnp.gov.zm",
      username: "mofnpadmin",
      title: "Administrator",
      institution: "Ministry of Finance and National Planning",
    },
  },
];

function seedDemoUsers() {
  const existing = readUsers();
  const merged = [...existing];
  for (const demo of DEMO_USERS) {
    if (!merged.some((u) => u.profile.username === demo.profile.username)) {
      merged.push(demo);
    }
  }
  writeUsers(merged);
}

interface AuthContextValue {
  user: StoredUser | null;
  loading: boolean;
  login: (username: string, password: string) => { ok: true } | { ok: false; error: string };
  signup: (
    profile: UserProfile,
    password: string
  ) => { ok: true; registrationNumber: string; userId: string } | { ok: false; error: string };
  logout: () => void;
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
  const [user, setUser] = useState<StoredUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    seedDemoUsers();
    try {
      const raw = window.localStorage.getItem(SESSION_KEY);
      if (raw) {
        const username = JSON.parse(raw) as string;
        const found = readUsers().find((u) => u.profile.username === username);
        if (found) setUser(found);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  const login = useCallback((username: string, password: string) => {
    const found = readUsers().find(
      (u) => u.profile.username.toLowerCase() === username.trim().toLowerCase()
    );
    if (!found || found.password !== password) {
      return { ok: false as const, error: "Invalid username or password." };
    }
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(found.profile.username));
    setUser(found);
    return { ok: true as const };
  }, []);

  const signup = useCallback((profile: UserProfile, password: string) => {
    const users = readUsers();
    if (users.some((u) => u.profile.username.toLowerCase() === profile.username.toLowerCase())) {
      return { ok: false as const, error: "Username already taken." };
    }
    const registrationNumber = generateRegistrationNumber(profile.role);
    const userId = generateUserId();
    const stored: StoredUser = { profile, password, registrationNumber, userId };
    writeUsers([...users, stored]);
    return { ok: true as const, registrationNumber, userId };
  }, []);

  const logout = useCallback(() => {
    window.localStorage.removeItem(SESSION_KEY);
    setUser(null);
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
