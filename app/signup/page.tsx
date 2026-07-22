import Image from "next/image";
import { SignupFormShell } from "@/components/signup/SignupFormShell";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="relative bg-gradient-to-br from-zra-navy-dark via-zra-navy to-zra-navy-light px-4 py-14 text-white">
        <ThemeToggle className="absolute right-4 top-4 !text-white/70 hover:!bg-white/10" />
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 p-1.5">
            <Image src="/branding/zambia-coat-of-arms.png" alt="Republic of Zambia" width={36} height={36} className="h-full w-full object-contain" />
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/80">
            Zambia Revenue Authority
          </p>
          <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Integrated Digital Tax Return System</h1>
          <p className="mt-2 text-sm text-white/80">
            Create your account to register as a taxpayer or tax practitioner.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10">
        <SignupFormShell />
      </div>
    </div>
  );
}
