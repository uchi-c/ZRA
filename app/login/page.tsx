"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useAuth, dashboardPathForRole } from "@/lib/auth";
import { TextField } from "@/components/ui/Field";
import type { Role } from "@/lib/types";

const DEMO_ACCOUNTS = [
  { role: "Taxpayer", username: "taxpayer" },
  { role: "Tax Practitioner", username: "practitioner" },
  { role: "ZRA Consultant", username: "consultant" },
];

const DEMO_OTP = "123456";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [forgotOpen, setForgotOpen] = useState(false);

  const [stage, setStage] = useState<"credentials" | "otp">("credentials");
  const [pendingRole, setPendingRole] = useState<Role | null>(null);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState<string | null>(null);

  function handleCredentialsSubmit(e: React.FormEvent) {
    e.preventDefault();
    const result = login(username, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError(null);
    const stored = JSON.parse(window.localStorage.getItem("zra_users_v1") ?? "[]") as {
      profile: { username: string; role: Role };
    }[];
    const match = stored.find((u) => u.profile.username.toLowerCase() === username.trim().toLowerCase());
    setPendingRole(match?.profile.role ?? "taxpayer");
    setStage("otp");
  }

  function handleOtpSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (otp !== DEMO_OTP) {
      setOtpError("Incorrect verification code. Please try again.");
      return;
    }
    router.push(dashboardPathForRole(pendingRole ?? "taxpayer"));
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-gradient-to-br from-zra-green-dark via-zra-green to-zra-green-light p-10 text-white lg:flex">
        <div className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg">🇿🇲</div>
          <span className="text-sm font-bold">Zambia Revenue Authority</span>
        </div>
        <div>
          <ShieldCheck className="h-10 w-10 text-emerald-100" />
          <h2 className="mt-4 max-w-sm text-2xl font-bold leading-snug">
            My Tax. Your Tax. Our Destiny.
          </h2>
          <p className="mt-3 max-w-sm text-sm text-emerald-100">
            One connected platform for Taxpayers, Tax Practitioners, and ZRA Tax Consultants — secure,
            transparent, and built for a modern Zambia.
          </p>
        </div>
        <div className="flex gap-1.5">
          <div className="h-1.5 flex-1 rounded-full bg-white/90" />
          <div className="h-1.5 flex-1 rounded-full bg-black" />
          <div className="h-1.5 flex-1 rounded-full bg-zra-red" />
          <div className="h-1.5 flex-1 rounded-full bg-zra-gold" />
        </div>
      </div>

      <div className="flex w-full flex-1 items-center justify-center px-4 py-10 lg:w-1/2">
        <div className="w-full max-w-md">
          <div className="mb-8 text-center lg:text-left">
            <p className="text-xs font-semibold uppercase tracking-widest text-zra-green lg:hidden">
              Zambia Revenue Authority
            </p>
            <h1 className="mt-1 text-2xl font-bold text-slate-900">
              {stage === "credentials" ? "Log In" : "Two-Factor Verification"}
            </h1>
            <p className="mt-2 text-sm text-slate-500">
              {stage === "credentials"
                ? "Access your Taxpayer, Tax Practitioner or ZRA Consultant portal."
                : "Enter the one-time code sent to your registered mobile number."}
            </p>
          </div>

          {stage === "credentials" ? (
            <>
              <form onSubmit={handleCredentialsSubmit} className="card flex flex-col gap-4">
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
            </>
          ) : (
            <form onSubmit={handleOtpSubmit} className="card flex flex-col gap-4">
              <TextField
                label="One-Time Password"
                value={otp}
                onChange={(v) => {
                  setOtp(v);
                  setOtpError(null);
                }}
                placeholder="123456"
                required
              />
              {otpError && <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{otpError}</p>}
              <p className="rounded-md bg-slate-50 px-4 py-2 text-xs text-slate-500">
                Demo mode — use code <code className="font-semibold text-slate-700">{DEMO_OTP}</code> to continue.
              </p>
              <button type="submit" className="btn-primary w-full">
                Verify & Continue
              </button>
              <button
                type="button"
                onClick={() => {
                  setStage("credentials");
                  setOtp("");
                  setOtpError(null);
                }}
                className="text-center text-sm font-medium text-zra-green hover:underline"
              >
                Back to login
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
