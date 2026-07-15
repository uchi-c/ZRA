"use client";

import { useState } from "react";
import { FormSection } from "@/components/ui/FormSection";
import { FileUpload } from "@/components/ui/FileUpload";
import { TextField, SelectField, RadioGroup, CheckboxField } from "@/components/ui/Field";
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

interface TaxpayerFormProps {
  onSubmit: (profile: TaxpayerProfile, password: string) => void;
  submitting: boolean;
  error: string | null;
}

export function TaxpayerForm({ onSubmit, submitting, error }: TaxpayerFormProps) {
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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setFormError(null);
    if (!taxpayerType) {
      setFormError("Please select a taxpayer type.");
      return;
    }
    if (password !== confirmPassword) {
      setFormError("Passwords do not match.");
      return;
    }
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
        taxpayerType,
        businessName: isBusiness ? businessName : undefined,
        businessRegistrationNumber: isBusiness ? businessRegistrationNumber : undefined,
        projectedAnnualTurnover,
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
          <SelectField label="Gender" value={gender} onChange={setGender} options={["Male", "Female"]} required />
          <TextField label="Mobile Number" type="tel" value={mobileNumber} onChange={setMobileNumber} required placeholder="0977000000" />
          <TextField label="Email Address" type="email" value={email} onChange={setEmail} required />
          <TextField label="Physical Address" value={physicalAddress} onChange={setPhysicalAddress} required className="sm:col-span-2" />
          <SelectField label="Province" value={province} onChange={setProvince} options={PROVINCES} required />
          <TextField label="District" value={district} onChange={setDistrict} required />
        </div>
      </FormSection>

      <FormSection title="Tax Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="TPIN Number" value={tpin} onChange={setTpin} required placeholder="12345678" />
          <TextField
            label="Projected/Estimated Annual Turnover (ZMW)"
            type="number"
            value={projectedAnnualTurnover}
            onChange={setProjectedAnnualTurnover}
            required
          />
          <RadioGroup
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
      </FormSection>

      <FormSection title="Login Credentials">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <TextField label="Username" value={username} onChange={setUsername} required />
          <TextField label="Password" type="password" value={password} onChange={setPassword} required />
          <TextField label="Confirm Password" type="password" value={confirmPassword} onChange={setConfirmPassword} required />
        </div>
      </FormSection>

      <FormSection title="Supporting Documents">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <FileUpload label="Upload NRC" required />
          <FileUpload label="Upload TPIN Certificate" required />
          {isBusiness && <FileUpload label="Upload PACRA Certificate" hint="Required for non-individual taxpayer types." />}
          <FileUpload label="Upload Proof of Address" required />
        </div>
      </FormSection>

      <div className="card">
        <CheckboxField
          label="I certify that the information provided is true and correct."
          checked={declaration}
          onChange={setDeclaration}
          required
        />
      </div>

      {(formError || error) && (
        <p className="rounded-md bg-red-50 px-4 py-2 text-sm text-red-700">{formError ?? error}</p>
      )}

      <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto">
        {submitting ? "Registering..." : "Register Taxpayer"}
      </button>
    </form>
  );
}
