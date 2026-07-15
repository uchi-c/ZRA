"use client";

import { useState } from "react";
import { FormSection } from "@/components/ui/FormSection";
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

interface PractitionerFormProps {
  onSubmit: (profile: PractitionerProfile, password: string) => void;
  submitting: boolean;
  error: string | null;
}

export function PractitionerForm({ onSubmit, submitting, error }: PractitionerFormProps) {
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!category || !professionalBody || !criminalRecordClearance) {
      setFormError("Please complete all professional information fields.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
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
        category,
        membershipNumber,
        professionalBody,
        highestQualification,
        yearsOfExperience,
        currentEmployer,
        tpin,
        criminalRecordClearance,
        educationLevel,
      },
      password
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <FormSection title="Personal Information">
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
      </FormSection>

      <FormSection title="Professional Information">
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
      </FormSection>

      <FormSection title="Tax Compliance Check">
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
      </FormSection>

      <FormSection title="Login Credentials">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label="Username" value={username} onChange={setUsername} required />
          <TextField label="Password" type="password" value={password} onChange={setPassword} required />
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
        </div>
      </FormSection>

      <div className="card flex flex-col gap-3">
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

      {(formError || error) && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError ?? error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        {submitting ? "Registering..." : "Register Tax Practitioner"}
      </button>
    </form>
  );
}
