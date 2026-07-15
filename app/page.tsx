import Link from "next/link";
import { Landmark, LogIn, UserPlus } from "lucide-react";

const LINKS = [
  {
    href: "/signup",
    title: "Create Account",
    description: "Register as a Taxpayer or Tax Practitioner in minutes.",
    icon: UserPlus,
  },
  {
    href: "/login",
    title: "Log In",
    description: "Access your Taxpayer, Tax Practitioner or ZRA Consultant portal.",
    icon: LogIn,
  },
  {
    href: "/budget",
    title: "National Budget",
    description: "See how tax revenue collected flows into national budget allocation.",
    icon: Landmark,
  },
];

const COMMITMENTS = ["Secure & Compliant", "AI Powered Insights", "Faster Services", "Higher Revenue", "Transparent Tax System"];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="flex h-1.5">
        <div className="flex-1 bg-zra-green" />
        <div className="flex-1 bg-black" />
        <div className="flex-1 bg-zra-red" />
        <div className="flex-1 bg-zra-gold" />
      </div>

      <div className="bg-gradient-to-br from-zra-green-dark via-zra-green to-zra-green-light px-4 py-20 text-white">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-2xl">
            🇿🇲
          </div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-100">
            Zambia Revenue Authority
          </p>
          <h1 className="mt-3 text-3xl font-bold sm:text-5xl">Integrated Digital Tax Return System</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm text-emerald-100 sm:text-base">
            My Tax. Your Tax. Our Destiny. A connected, digital-first tax administration platform linking
            Taxpayers, Tax Practitioners, and ZRA Tax Consultants.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-14">
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-3">
          {LINKS.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="card group transition hover:-translate-y-1 hover:border-zra-green hover:shadow-lg"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-zra-green transition group-hover:bg-zra-green group-hover:text-white">
                  <Icon className="h-5 w-5" />
                </span>
                <h2 className="mt-4 text-base font-semibold text-slate-900">{link.title}</h2>
                <p className="mt-1 text-sm text-slate-500">{link.description}</p>
                <span className="mt-3 inline-block text-sm font-semibold text-zra-green">Continue →</span>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 border-t border-slate-200 pt-8 text-xs font-medium text-slate-500">
          {COMMITMENTS.map((c) => (
            <span key={c} className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-zra-green" />
              {c}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
