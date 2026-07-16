"use client";

import { useState } from "react";
import { StepIndicator } from "@/components/signup/StepIndicator";
import { FileUpload } from "@/components/ui/FileUpload";
import { PasswordStrengthMeter } from "@/components/ui/PasswordStrengthMeter";
import { TextField, SelectField, SegmentedGroup, CheckboxField } from "@/components/ui/Field";
import { PROVINCES } from "@/lib/mockData";
import type { TaxpayerProfile } from "@/lib/types";

const TAXPAYER_TYPES: TaxpayerProfile["taxpayerType"][] = [
  "Individual",
  "Sole Trader",
  "SME",
  "Partnership",
  "Company",
  "NGO",
];

const STEPS = ["Personal Info", "Tax Info", "Credentials", "Documents", "Declaration"];

interface TaxpayerFormProps {
  onSubmit: (profile: TaxpayerProfile, password: string) => void;
  submitting: boolean;
  error: string | null;
}

export function TaxpayerForm({ onSubmit, submitting, error }: TaxpayerFormProps) {
  const [step, setStep] = useState(0);

  const [nrcNumber, setNrcNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const [tpin, setTpin] = useState("");
  const [taxpayerType, setTaxpayerType] = useState<TaxpayerProfile["taxpayerType"] | "">("");
  const [businessName, setBusinessName] = useState("");
  const [businessRegistrationNumber, setBusinessRegistrationNumber] = useState("");
  const [projectedAnnualTurnover, setProjectedAnnualTurnover] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [declaration, setDeclaration] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const isBusiness = taxpayerType && taxpayerType !== "Individual";

  function validateStep(): string | null {
    if (step === 0) {
      if (!nrcNumber || !firstName || !surname || !dateOfBirth || !gender || !mobileNumber || !email || !physicalAddress || !province || !district) {
        return "Please complete all required personal information fields.";
      }
    }
    if (step === 1) {
      if (!tpin || !taxpayerType || !projectedAnnualTurnover) {
        return "Please complete all required tax information fields.";
      }
      if (isBusiness && (!businessName || !businessRegistrationNumber)) {
        return "Please provide your business name and registration number.";
      }
    }
    if (step === 2) {
      if (!username || !password || !confirmPassword) {
        return "Please complete all login credential fields.";
      }
      if (password !== confirmPassword) {
        return "Passwords do not match.";
      }
    }
    return null;
  }

  function goNext() {
    const stepError = validateStep();
    if (stepError) {
      setFormError(stepError);
      return;
    }
    setFormError(null);
    setStep((s) => Math.min(STEPS.length - 1, s + 1));
  }

  function goBack() {
    setFormError(null);
    setStep((s) => Math.max(0, s - 1));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!declaration) {
      setFormError("You must certify that the information provided is true and correct.");
      return;
    }
    onSubmit(
      {
        role: "taxpayer",
        nrcNumber,
        firstName,
        middleName,
        surname,
        dateOfBirth,
        gender,
        mobileNumber,
        email,
        physicalAddress,
        province,
        district,
        username,
        tpin,
        taxpayerType: taxpayerType as TaxpayerProfile["taxpayerType"],
        businessName: isBusiness ? businessName : undefined,
        businessRegistrationNumber: isBusiness ? businessRegistrationNumber : undefined,
        projectedAnnualTurnover,
      },
      password
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <StepIndicator steps={STEPS} current={step} />

      {step === 0 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Personal Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="NRC Number" value={nrcNumber} onChange={setNrcNumber} required placeholder="123456/10/1" />
            <TextField label="First Name" value={firstName} onChange={setFirstName} required />
            <TextField label="Middle Name" value={middleName} onChange={setMiddleName} />
            <TextField label="Surname" value={surname} onChange={setSurname} required />
            <TextField label="Date of Birth" type="date" value={dateOfBirth} onChange={setDateOfBirth} required />
            <SegmentedGroup
              label="Gender"
              value={gender}
              onChange={setGender}
              options={[
                { value: "Male", label: "Male" },
                { value: "Female", label: "Female" },
              ]}
              required
            />
            <TextField label="Mobile Number" type="tel" value={mobileNumber} onChange={setMobileNumber} required placeholder="0977000000" />
            <TextField label="Email Address" type="email" value={email} onChange={setEmail} required />
            <TextField label="Physical Address" value={physicalAddress} onChange={setPhysicalAddress} required className="sm:col-span-2" />
            <SelectField label="Province" value={province} onChange={setProvince} options={PROVINCES} required />
            <TextField label="District" value={district} onChange={setDistrict} required />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Tax Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="TPIN Number" value={tpin} onChange={setTpin} required placeholder="12345678" />
            <TextField
              label="Projected/Estimated Annual Turnover (ZMW)"
              type="number"
              value={projectedAnnualTurnover}
              onChange={setProjectedAnnualTurnover}
              required
            />
            <SegmentedGroup
              label="Taxpayer Type"
              value={taxpayerType}
              onChange={(v) => setTaxpayerType(v as TaxpayerProfile["taxpayerType"])}
              options={TAXPAYER_TYPES.map((t) => ({ value: t, label: t }))}
              required
              className="sm:col-span-2"
            />
            {isBusiness && (
              <>
                <TextField label="Business Name" value={businessName} onChange={setBusinessName} required />
                <TextField
                  label="Business Registration Number"
                  value={businessRegistrationNumber}
                  onChange={setBusinessRegistrationNumber}
                  required
                />
              </>
            )}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Login Credentials</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField label="Username" value={username} onChange={setUsername} required />
            <div>
              <TextField label="Password" type="password" value={password} onChange={setPassword} required />
              <PasswordStrengthMeter password={password} />
            </div>
            <div>
              <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
              {confirmPassword && (
                <p className={`mt-1.5 text-xs ${confirmPassword === password ? "text-status-green" : "text-status-red"}`}>
                  {confirmPassword === password ? "Passwords match" : "Passwords do not match"}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Supporting Documents</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FileUpload label="Upload NRC" required />
            <FileUpload label="Upload TPIN Certificate" required />
            {isBusiness && <FileUpload label="Upload PACRA Certificate" hint="Required for non-individual taxpayer types." />}
            <FileUpload label="Upload Proof of Address" required />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Review & Declaration</h3>
          <dl className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="font-medium text-slate-800">{firstName} {surname}</dd>
            </div>
            <div>
              <dt className="text-slate-500">TPIN</dt>
              <dd className="font-medium text-slate-800">{tpin || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Taxpayer Type</dt>
              <dd className="font-medium text-slate-800">{taxpayerType || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Username</dt>
              <dd className="font-medium text-slate-800">{username || "—"}</dd>
            </div>
          </dl>
          <div className="mt-4">
            <CheckboxField
              label="I certify that the information provided is true and correct."
              checked={declaration}
              onChange={setDeclaration}
              required
            />
          </div>
        </div>
      )}

      {(formError || error) && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError ?? error}</p>
      )}

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={goBack}
          disabled={step === 0}
          className="btn-secondary disabled:invisible"
        >
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={goNext} className="btn-primary">
            Next
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Registering..." : "Register Taxpayer"}
          </button>
        )}
      </div>
    </form>
  );
}
