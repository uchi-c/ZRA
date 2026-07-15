import Link from "next/link";
import type { Role } from "@/lib/types";

interface ConfirmationScreenProps {
  role: Role;
  registrationNumber: string;
  userId: string;
}

export function ConfirmationScreen({ role, registrationNumber, userId }: ConfirmationScreenProps) {
  return (
    <div className="card mx-auto max-w-lg text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-600">
        ✓
      </div>
      <h2 className="mt-4 text-lg font-semibold text-slate-900">Registration Successful</h2>
      <p className="mt-1 text-sm text-slate-500">
        {role === "tax_practitioner"
          ? "Your practitioner accreditation has been approved and a digital practising licence issued."
          : "Your digital tax account has been created."}
      </p>

      <dl className="mt-6 grid grid-cols-1 gap-3 rounded-lg bg-slate-50 p-4 text-left text-sm sm:grid-cols-2">
        <div>
          <dt className="text-slate-500">Registration Number</dt>
          <dd className="font-semibold text-slate-900">{registrationNumber}</dd>
        </div>
        <div>
          <dt className="text-slate-500">User ID</dt>
          <dd className="font-semibold text-slate-900">{userId}</dd>
        </div>
      </dl>

      <div className="mt-6 flex flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
          <span>✓</span> SMS Notification Sent
        </div>
        <div className="flex items-center gap-2 rounded-md bg-emerald-50 px-3 py-2 text-emerald-800">
          <span>✓</span> Email Confirmation Sent
        </div>
      </div>

      <Link href="/login" className="btn-primary mt-6 w-full">
        Proceed to Login
      </Link>
    </div>
  );
}
