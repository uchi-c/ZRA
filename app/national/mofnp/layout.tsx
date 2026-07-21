import { NationalSidebar } from "@/components/national/NationalSidebar";
import { NationalHeader } from "@/components/national/NationalHeader";

export default function MofnpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <NationalSidebar
        theme="dark"
        brandIcon={
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 text-lg">🇿🇲</div>
        }
        brandLabel="Ministry of Finance"
        brandSubLabel="& National Planning"
        dept="mofnp"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <NationalHeader
          theme="dark"
          brandIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-xl">🇿🇲</div>
          }
          orgName="Republic of Zambia"
          orgSubtitle="Ministry of Finance & National Planning"
          title="DIGITAL BUDGET & ECONOMIC AFFAIRS COMMAND DASHBOARD"
          subtitle="Real-Time Fiscal Monitoring • Economic Intelligence • Evidence-Based Decision Making"
          userName="MoFNP Admin"
          userTitle="Administrator"
        />
        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
    </div>
  );
}
