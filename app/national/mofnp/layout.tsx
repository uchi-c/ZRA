import Image from "next/image";
import { NationalSidebar } from "@/components/national/NationalSidebar";
import { NationalHeader } from "@/components/national/NationalHeader";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";

export default function MofnpLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <NationalSidebar
        theme="dark"
        brandIcon={
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 p-1">
            <Image src="/branding/zambia-coat-of-arms.png" alt="Republic of Zambia" width={28} height={28} className="h-full w-full object-contain" />
          </div>
        }
        brandLabel="Ministry of Finance"
        brandSubLabel="& National Planning"
        dept="mofnp"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <NationalHeader
          theme="dark"
          brandIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 p-1.5">
              <Image src="/branding/zambia-coat-of-arms.png" alt="Republic of Zambia" width={32} height={32} className="h-full w-full object-contain" />
            </div>
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
      <AIAssistantWidget
        title="MoFNP Fiscal Assistant"
        greeting="Hello! I'm your MoFNP Fiscal Assistant. Ask me about budget execution, expenditure control, or economic indicators."
        quickPrompts={["Budget execution rate", "Expenditure by sector", "Debt sustainability", "PIP project status"]}
        cannedReply="This is a demo MoFNP assistant. In production this would query IFMIS and the national economic intelligence platform for real-time fiscal data."
        placeholder="Ask about budget or economic data..."
      />
    </div>
  );
}
