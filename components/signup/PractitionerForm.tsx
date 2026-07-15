"use client";

import { useState } from "react";
import { StepIndicator } from "@/components/signup/StepIndicator";
import { FileUpload } from "@/components/ui/FileUpload";
import { TextField, SelectField, RadioGroup, CheckboxField } from "@/components/ui/Field";
import { PROVINCES } from "@/lib/mockData";
import type { PractitionerProfile } from "@/lib/types";

const CATEGORIES: { value: PractitionerProfile["category"]; label: string }[] = [
  { value: "TTP", label: "Tax Technician Practitioner (TTP)" },
  { value: "GTP", label: "General Tax Practitioner (GTP)" },
  { value: "MTP", label: "Master Tax Practitioner (MTP)" },
];

const BODIES: PractitionerProfile["professionalBody"][] = ["ZICA", "SAIT", "FPI", "Other"];

const STEPS = ["Personal Info", "Professional Info", "Compliance Check", "Credentials", "Declaration"];

interface PractitionerFormProps {
  onSubmit: (profile: PractitionerProfile, password: string) => void;
  submitting: boolean;
  error: string | null;
}

export function PractitionerForm({ onSubmit, submitting, error }: PractitionerFormProps) {
  const [step, setStep] = useState(0);

  const [nrcNumber, setNrcNumber] = useState("");
  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [surname, setSurname] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");

  const [category, setCategory] = useState<PractitionerProfile["category"] | "">("");
  const [membershipNumber, setMembershipNumber] = useState("");
  const [professionalBody, setProfessionalBody] = useState<PractitionerProfile["professionalBody"] | "">("");
  const [highestQualification, setHighestQualification] = useState("");
  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [currentEmployer, setCurrentEmployer] = useState("");

  const [tpin, setTpin] = useState("");
  const [criminalRecordClearance, setCriminalRecordClearance] = useState<"Yes" | "No" | "">("");
  const [educationLevel, setEducationLevel] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [declarationAccurate, setDeclarationAccurate] = useState(false);
  const [declarationCode, setDeclarationCode] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  function validateStep(): string | null {
    if (step === 0) {
      if (!nrcNumber || !firstName || !surname || !dateOfBirth || !mobileNumber || !email || !physicalAddress || !province || !district) {
        return "Please complete all required personal information fields.";
      }
    }
    if (step === 1) {
      if (!category || !professionalBody || !membershipNumber || !highestQualification || !yearsOfExperience || !currentEmployer) {
        return "Please complete all required professional information fields.";
      }
    }
    if (step === 2) {
      if (!tpin || !educationLevel || !criminalRecordClearance) {
        return "Please complete all required tax compliance fields.";
      }
    }
    if (step === 3) {
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
    if (!declarationAccurate || !declarationCode) {
      setFormError("Both declarations must be accepted to proceed.");
      return;
    }
    onSubmit(
      {
        role: "tax_practitioner",
        nrcNumber,
        firstName,
        middleName,
        surname,
        dateOfBirth,
        mobileNumber,
        email,
        physicalAddress,
        province,
        district,
        username,
        category: category as PractitionerProfile["category"],
        membershipNumber,
        professionalBody: professionalBody as PractitionerProfile["professionalBody"],
        highestQualification,
        yearsOfExperience,
        currentEmployer,
        tpin,
        criminalRecordClearance: criminalRecordClearance as "Yes" | "No",
        educationLevel,
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
            <TextField label="Mobile Number" type="tel" value={mobileNumber} onChange={setMobileNumber} required />
            <TextField label="Email Address" type="email" value={email} onChange={setEmail} required />
            <TextField label="Physical Address" value={physicalAddress} onChange={setPhysicalAddress} required className="sm:col-span-2" />
            <SelectField label="Province" value={province} onChange={setProvince} options={PROVINCES} required />
            <TextField label="District" value={district} onChange={setDistrict} required />
          </div>
        </div>
      )}

      {step === 1 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Professional Information</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <RadioGroup
              label="Tax Practitioner Category"
              value={category}
              onChange={(v) => setCategory(v as PractitionerProfile["category"])}
              options={CATEGORIES}
              required
              className="sm:col-span-2"
            />
            <TextField label="Professional Membership Number" value={membershipNumber} onChange={setMembershipNumber} required />
            <RadioGroup
              label="Professional Body"
              value={professionalBody}
              onChange={(v) => setProfessionalBody(v as PractitionerProfile["professionalBody"])}
              options={BODIES.map((b) => ({ value: b, label: b }))}
              required
            />
            <TextField label="Highest Qualification" value={highestQualification} onChange={setHighestQualification} required />
            <TextField label="Years of Tax Experience" type="number" value={yearsOfExperience} onChange={setYearsOfExperience} required />
            <TextField label="Current Employer/Firm" value={currentEmployer} onChange={setCurrentEmployer} required />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Tax Compliance Check</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="TPIN Number" value={tpin} onChange={setTpin} required />
            <TextField label="Education Level / Academic Qualifications" value={educationLevel} onChange={setEducationLevel} required />
            <RadioGroup
              label="Criminal Record Clearance"
              value={criminalRecordClearance}
              onChange={(v) => setCriminalRecordClearance(v as "Yes" | "No")}
              options={[
                { value: "Yes", label: "Yes" },
                { value: "No", label: "No" },
              ]}
              required
            />
            <FileUpload label="Tax Clearance Certificate" required />
            <FileUpload label="ZRA Accreditation / Professional Practising Certificate" required />
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="card">
          <h3 className="mb-4 text-base font-semibold text-slate-900">Login Credentials</h3>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <TextField label="Username" value={username} onChange={setUsername} required />
            <TextField label="Password" type="password" value={password} onChange={setPassword} required />
            <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="card flex flex-col gap-3">
          <h3 className="mb-1 text-base font-semibold text-slate-900">Review & Declaration</h3>
          <dl className="grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-slate-500">Name</dt>
              <dd className="font-medium text-slate-800">{firstName} {surname}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Category</dt>
              <dd className="font-medium text-slate-800">{category || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Professional Body</dt>
              <dd className="font-medium text-slate-800">{professionalBody || "—"}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Username</dt>
              <dd className="font-medium text-slate-800">{username || "—"}</dd>
            </div>
          </dl>
          <CheckboxField
            label="I confirm that all information submitted is accurate."
            checked={declarationAccurate}
            onChange={setDeclarationAccurate}
            required
          />
          <CheckboxField
            label="I agree to comply with the Tax Practitioners Code of Conduct."
            checked={declarationCode}
            onChange={setDeclarationCode}
            required
          />
        </div>
      )}

      {(formError || error) && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError ?? error}</p>
      )}

      <div className="flex items-center justify-between">
        <button type="button" onClick={goBack} disabled={step === 0} className="btn-secondary disabled:invisible">
          Back
        </button>
        {step < STEPS.length - 1 ? (
          <button type="button" onClick={goNext} className="btn-primary">
            Next
          </button>
        ) : (
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Registering..." : "Register Tax Practitioner"}
          </button>
        )}
      </div>
    </form>
  );
}
