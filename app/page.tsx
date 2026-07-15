import Link from "next/link";

const LINKS = [
  {
    href: "/signup",
    title: "Create Account",
    description: "Register as a Taxpayer or Tax Practitioner.",
  },
  {
    href: "/login",
    title: "Log In",
    description: "Access your Taxpayer, Tax Practitioner or ZRA Consultant portal.",
  },
  {
    href: "/budget",
    title: "National Budget",
    description: "See how tax revenue collected flows into national budget allocation.",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-10 bg-slate-50 px-4 py-16">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-zra-green">
          Zambia Revenue Authority
        </p>
        <h1 className="mt-2 text-3xl font-bold text-slate-900 sm:text-4xl">
          Integrated Digital Tax Return System
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-slate-500">
          Taxpayer, Tax Practitioner and ZRA Tax Consultant portals — a connected, digital-first tax
          administration platform for Zambia.
        </p>
      </div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-4 sm:grid-cols-3">
        {LINKS.map((link) => (
          <Link key={link.href} href={link.href} className="card transition hover:border-zra-green hover:shadow-md">
            <h2 className="text-base font-semibold text-slate-900">{link.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{link.description}</p>
            <span className="mt-3 inline-block text-sm font-semibold text-zra-green">Continue →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
