"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Briefcase, User } from "lucide-react";
import { useAuth } from "@/lib/auth";
import { TaxpayerForm } from "@/components/signup/TaxpayerForm";
import { PractitionerForm } from "@/components/signup/PractitionerForm";
import { VerificationChecklist } from "@/components/signup/VerificationChecklist";
import { ConfirmationScreen } from "@/components/signup/ConfirmationScreen";
import type { PractitionerProfile, Role, TaxpayerProfile } from "@/lib/types";

type SignupRole = Extract<Role, "taxpayer" | "tax_practitioner">;

type Stage =
  | { name: "form" }
  | { name: "verifying" }
  | { name: "done"; registrationNumber: string; userId: string };

const TAXPAYER_STEPS = [
  "NRC check",
  "TPIN check",
  "PACRA check",
  "Proof of Address check",
];

const PRACTITIONER_STEPS = [
  "NRC check",
  "TPIN check",
  "Professional Membership check",
  "Tax Compliance check",
  "Tax Clearance check",
  "Criminal Record check",
];

export function SignupFormShell() {
  const { signup } = useAuth();
  const [role, setRole] = useState<SignupRole>("taxpayer");
  const [stage, setStage] = useState<Stage>({ name: "form" });
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState<{ registrationNumber: string; userId: string } | null>(null);

  function handleSubmit(profile: TaxpayerProfile | PractitionerProfile, password: string) {
    setError(null);
    const result = signup(profile, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setPending({ registrationNumber: result.registrationNumber, userId: result.userId });
    setStage({ name: "verifying" });
  }

  if (stage.name === "verifying" && pending) {
    return (
      <VerificationChecklist
        steps={role === "taxpayer" ? TAXPAYER_STEPS : PRACTITIONER_STEPS}
        onComplete={() =>
          setStage({ name: "done", registrationNumber: pending.registrationNumber, userId: pending.userId })
        }
      />
    );
  }

  if (stage.name === "done") {
    return <ConfirmationScreen role={role} registrationNumber={stage.registrationNumber} userId={stage.userId} />;
  }

  return (
    <div className="mx-auto max-w-3xl">
      <div className="card mb-6">
        <span className="field-label">Signing up as</span>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { role: "taxpayer" as const, label: "Taxpayer", description: "Register to file and manage your own tax returns.", icon: User },
              {
                role: "tax_practitioner" as const,
                label: "Tax Practitioner",
                description: "Register to file and manage returns on behalf of clients.",
                icon: Briefcase,
              },
            ]
          ).map((option) => {
            const selected = role === option.role;
            const Icon = option.icon;
            return (
              <button
                key={option.role}
                type="button"
                onClick={() => setRole(option.role)}
                className={`relative flex flex-col items-start gap-2 rounded-xl border-2 p-4 text-left transition ${
                  selected
                    ? "border-zra-gold bg-zra-gold-light/20"
                    : "border-slate-200 hover:border-zra-navy/40"
                }`}
              >
                {selected && (
                  <CheckCircle2 className="absolute right-3 top-3 h-5 w-5 text-zra-gold" fill="currentColor" stroke="white" />
                )}
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                    selected ? "bg-zra-gold text-white" : "bg-zra-navy/10 text-zra-navy"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-semibold text-zra-navy-dark">{option.label}</span>
                <span className="text-xs text-slate-500">{option.description}</span>
              </button>
            );
          })}
        </div>
      </div>

      {role === "taxpayer" ? (
        <TaxpayerForm onSubmit={handleSubmit} submitting={false} error={error} />
      ) : (
        <PractitionerForm onSubmit={handleSubmit} submitting={false} error={error} />
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-zra-navy hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
