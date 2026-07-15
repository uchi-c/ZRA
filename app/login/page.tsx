"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth, dashboardPathForRole } from "@/lib/auth";
import { TextField } from "@/components/ui/Field";

const DEMO_ACCOUNTS = [
  { role: "Taxpayer", username: "taxpayer" },
  { role: "Tax Practitioner", username: "practitioner" },
  { role: "ZRA Consultant", username: "consultant" },
];

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = login(username, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    const stored = JSON.parse(window.localStorage.getItem("zra_users_v1") ?? "[]") as {
      profile: { username: string; role: "taxpayer" | "tax_practitioner" | "zra_consultant" };
    }[];
    const match = stored.find((u) => u.profile.username.toLowerCase() === username.trim().toLowerCase());
    router.push(dashboardPathForRole(match?.profile.role ?? "taxpayer"));
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zra-green">
            Zambia Revenue Authority
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900">Log In</h1>
          <p className="mt-2 text-sm text-slate-500">Access your Taxpayer, Tax Practitioner or ZRA Consultant portal.</p>
        </div>

        <form onSubmit={handleSubmit} className="card flex flex-col gap-4">
          <TextField label="Username or Email" value={username} onChange={setUsername} required />
          <TextField label="Password" type="password" value={password} onChange={setPassword} required />

          {error && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{error}</p>}

          <button type="submit" className="btn-primary w-full">
            Log In
          </button>

          <button
            type="button"
            onClick={() => setForgotOpen((v) => !v)}
            className="text-center text-sm font-medium text-zra-green hover:underline"
          >
            Forgot password?
          </button>
          {forgotOpen && (
            <p className="rounded-md bg-slate-50 px-4 py-2 text-center text-xs text-slate-500">
              Password reset instructions have been sent to the email address on file for this account.
            </p>
          )}
        </form>

        <div className="mt-4 rounded-lg border border-dashed border-slate-300 bg-white p-4 text-xs text-slate-500">
          <p className="mb-2 font-semibold text-slate-600">Demo accounts (password: demo123)</p>
          <ul className="flex flex-col gap-1">
            {DEMO_ACCOUNTS.map((acc) => (
              <li key={acc.username} className="flex justify-between">
                <span>{acc.role}</span>
                <code className="font-semibold text-slate-700">{acc.username}</code>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-6 text-center text-sm text-slate-500">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="font-semibold text-zra-green hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
