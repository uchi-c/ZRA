"use client";

import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { FormSection } from "@/components/ui/FormSection";
import { TextField, CheckboxField } from "@/components/ui/Field";
import { Toast } from "@/components/ui/Toast";

export function SettingsPage() {
  const { user } = useAuth();
  const profile = user!.profile;

  const [firstName, setFirstName] = useState(profile.firstName);
  const [surname, setSurname] = useState(profile.surname);
  const [email, setEmail] = useState(profile.email);
  const [mobileNumber, setMobileNumber] = useState(profile.mobileNumber);

  const [emailAlerts, setEmailAlerts] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [filingReminders, setFilingReminders] = useState(true);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Settings</h1>
        <p className="text-sm text-slate-500">Manage your profile, notifications, and security preferences.</p>
      </div>

      <FormSection title="Profile Information">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="First Name" value={firstName} onChange={setFirstName} />
          <TextField label="Surname" value={surname} onChange={setSurname} />
          <TextField label="Email Address" type="email" value={email} onChange={setEmail} />
          <TextField label="Mobile Number" value={mobileNumber} onChange={setMobileNumber} />
        </div>
        <button
          type="button"
          onClick={() => setToast("Profile updated successfully.")}
          className="btn-primary mt-4"
        >
          Save Changes
        </button>
      </FormSection>

      <FormSection title="Notification Preferences">
        <div className="flex flex-col gap-3">
          <CheckboxField label="Email notifications" checked={emailAlerts} onChange={setEmailAlerts} />
          <CheckboxField label="SMS notifications" checked={smsAlerts} onChange={setSmsAlerts} />
          <CheckboxField label="Filing deadline reminders" checked={filingReminders} onChange={setFilingReminders} />
        </div>
        <button
          type="button"
          onClick={() => setToast("Notification preferences saved.")}
          className="btn-secondary mt-4"
        >
          Save Preferences
        </button>
      </FormSection>

      <FormSection title="Change Password">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Current Password" type="password" value={currentPassword} onChange={setCurrentPassword} />
          <TextField label="New Password" type="password" value={newPassword} onChange={setNewPassword} />
        </div>
        <button
          type="button"
          onClick={() => {
            setToast("Password updated successfully.");
            setCurrentPassword("");
            setNewPassword("");
          }}
          className="btn-secondary mt-4"
        >
          Update Password
        </button>
      </FormSection>

      {toast && <Toast message={toast} onDismiss={() => setToast(null)} />}
    </div>
  );
}
