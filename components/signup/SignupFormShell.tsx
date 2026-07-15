"use client";

import { useState } from "react";
import Link from "next/link";
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
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setRole("taxpayer")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              role === "taxpayer"
                ? "border-zra-green bg-emerald-50 text-zra-green"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            1. Taxpayer
          </button>
          <button
            type="button"
            onClick={() => setRole("tax_practitioner")}
            className={`rounded-md border px-4 py-2 text-sm font-semibold transition ${
              role === "tax_practitioner"
                ? "border-zra-green bg-emerald-50 text-zra-green"
                : "border-slate-300 text-slate-600 hover:bg-slate-50"
            }`}
          >
            2. Tax Practitioner
          </button>
        </div>
      </div>

      {role === "taxpayer" ? (
        <TaxpayerForm onSubmit={handleSubmit} submitting={false} error={error} />
      ) : (
        <PractitionerForm onSubmit={handleSubmit} submitting={false} error={error} />
      )}

      <p className="mt-6 text-center text-sm text-slate-500">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-zra-green hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
