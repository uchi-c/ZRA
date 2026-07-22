import { Landmark } from "lucide-react";
import { NationalSidebar } from "@/components/national/NationalSidebar";
import { NationalHeader } from "@/components/national/NationalHeader";
import { AIAssistantWidget } from "@/components/dashboard/AIAssistantWidget";

export default function BozLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">
      <NationalSidebar
        theme="dark"
        brandIcon={
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-zra-gold/15 text-zra-gold">
            <Landmark className="h-5 w-5" />
          </div>
        }
        brandLabel="Bank of Zambia"
        brandSubLabel="Central Bank Dashboard"
        dept="boz"
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <NationalHeader
          theme="dark"
          brandIcon={
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-zra-gold/15 text-zra-gold">
              <Landmark className="h-5 w-5" />
            </div>
          }
          orgName="Bank of Zambia"
          orgSubtitle="Central Bank Dashboard"
          title="EXECUTIVE COMMAND CENTER"
          subtitle="Real-Time Monetary & Financial Monitoring"
          userName="Governor"
          userTitle="BOZ Executive"
          showLive
        />
        <main className="mx-auto flex w-full max-w-[1600px] flex-1 flex-col gap-6 px-4 py-6 sm:px-6">
          {children}
        </main>
      </div>
      <AIAssistantWidget
        title="BOZ Economic Assistant"
        greeting="Hello, Governor. Ask me about monetary policy, forex reserves, banking sector health, or public debt."
        quickPrompts={["Inflation outlook", "Forex reserve position", "Banking sector risk", "Public debt sustainability"]}
        cannedReply="This is a demo BOZ assistant. In production this would query the Bank of Zambia's monetary and financial intelligence systems for real-time analysis."
        placeholder="Ask about monetary or financial data..."
      />
    </div>
  );
}
