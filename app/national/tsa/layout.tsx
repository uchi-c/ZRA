import Image from "next/image";
import { NationalSidebar } from "@/components/national/NationalSidebar";
import { NationalHeader } from "@/components/national/NationalHeader";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";

export default function TsaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-100">
      <NationalSidebar
        theme="light"
        brandIcon={
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/10 p-1">
            <Image src="/branding/zambia-coat-of-arms.png" alt="Republic of Zambia" width={28} height={28} className="h-full w-full object-contain" />
          </div>
        }
        brandLabel="Republic of Zambia"
        brandSubLabel="TSA Revenue Dashboard"
        dept="tsa"
        footer={
          <div className="rounded-lg bg-white/5 p-3">
            <p className="flex items-center gap-1.5 text-xs font-semibold text-status-green">
              <span className="live-dot h-1.5 w-1.5 rounded-full bg-status-green" /> All Systems Operational
            </p>
            <p className="mt-1 text-[11px] text-white/40">System Status</p>
          </div>
        }
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <NationalHeader
          theme="light"
          brandIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zra-navy/10 p-1.5">
              <Image src="/branding/zambia-coat-of-arms.png" alt="Republic of Zambia" width={32} height={32} className="h-full w-full object-contain" />
            </div>
          }
          orgName="Republic of Zambia"
          orgSubtitle="Ministry of Finance and National Planning"
          title="TREASURY SINGLE ACCOUNT (TSA) – NATIONAL REVENUE DASHBOARD"
          subtitle="Real-Time Revenue Collection and Budget Allocation Portal"
          userName="TSA Admin"
          userTitle="Administrator"
        />
        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
      <AIAssistantWidget
        title="TSA Revenue Assistant"
        greeting="Hello! I'm your TSA Revenue Assistant. Ask me about collections, budget allocations, or provincial performance."
        quickPrompts={["Revenue collection trends", "Budget allocation status", "Provincial performance", "Outstanding project risks"]}
        cannedReply="This is a demo TSA assistant. In production this would query the national fiscal data integration platform for real-time revenue and budget figures."
        placeholder="Ask about revenue or budget allocation..."
      />
    </div>
  );
}
