import { SignupFormShell } from "@/components/signup/SignupFormShell";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-3xl px-4">
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-zra-green">
            Zambia Revenue Authority
          </p>
          <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
            Integrated Digital Tax Return System
          </h1>
          <p className="mt-2 text-sm text-slate-500">Create your account to register as a taxpayer or tax practitioner.</p>
        </div>
        <SignupFormShell />
      </div>
    </div>
  );
}
