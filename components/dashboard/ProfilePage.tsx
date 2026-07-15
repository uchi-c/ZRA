"use client";

import { useAuth } from "@/lib/auth";
import { Pill } from "@/components/ui/Pill";
import type { ConsultantProfile, PractitionerProfile, TaxpayerProfile } from "@/lib/types";

function Field({ label, value }: { label: string; value?: string }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <p className="text-sm font-medium text-slate-800">{value}</p>
    </div>
  );
}

export function ProfilePage() {
  const { user } = useAuth();
  const profile = user!.profile;
  const fullName = `${profile.firstName} ${profile.middleName ? profile.middleName + " " : ""}${profile.surname}`;

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex flex-col items-center gap-4 bg-gradient-to-r from-zra-green-dark to-zra-green text-center text-white sm:flex-row sm:text-left">
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white/15 text-xl font-bold">
          {profile.firstName[0]}
          {profile.surname[0]}
        </span>
        <div>
          <h1 className="text-lg font-bold">{fullName}</h1>
          <p className="text-sm text-emerald-100">{profile.email}</p>
          <div className="mt-2">
            <Pill
              label={
                profile.role === "taxpayer" ? "Taxpayer" : profile.role === "tax_practitioner" ? "Tax Practitioner" : "ZRA Consultant"
              }
              tone="slate"
              className="border-white/20 bg-white/15 text-white"
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Personal Information</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <Field label="NRC Number" value={profile.nrcNumber} />
          <Field label="Date of Birth" value={profile.dateOfBirth} />
          <Field label="Mobile Number" value={profile.mobileNumber} />
          <Field label="Email Address" value={profile.email} />
          <Field label="Physical Address" value={profile.physicalAddress} />
          <Field label="Province / District" value={`${profile.province} / ${profile.district}`} />
        </div>
      </div>

      {profile.role === "taxpayer" && (
        <div className="card">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Tax Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="TPIN" value={(profile as TaxpayerProfile).tpin} />
            <Field label="Taxpayer Type" value={(profile as TaxpayerProfile).taxpayerType} />
            <Field label="Business Name" value={(profile as TaxpayerProfile).businessName ?? "—"} />
          </div>
        </div>
      )}

      {profile.role === "tax_practitioner" && (
        <div className="card">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Professional Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Category" value={(profile as PractitionerProfile).category} />
            <Field label="Professional Body" value={(profile as PractitionerProfile).professionalBody} />
            <Field label="Membership Number" value={(profile as PractitionerProfile).membershipNumber} />
            <Field label="Current Employer" value={(profile as PractitionerProfile).currentEmployer} />
            <Field label="Years of Experience" value={(profile as PractitionerProfile).yearsOfExperience} />
            <Field label="TPIN" value={(profile as PractitionerProfile).tpin} />
          </div>
        </div>
      )}

      {profile.role === "zra_consultant" && (
        <div className="card">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-slate-500">Consultant Information</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <Field label="Consultant Number" value={(profile as ConsultantProfile).consultantNumber} />
            <Field label="Region" value={(profile as ConsultantProfile).region} />
          </div>
        </div>
      )}
    </div>
  );
}
