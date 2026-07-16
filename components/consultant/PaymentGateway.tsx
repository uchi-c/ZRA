import { Banknote, Building2, CreditCard, Landmark, Smartphone, Wallet } from "lucide-react";
import { PAYMENT_GATEWAY_CHANNELS } from "@/lib/mockData";
import type { LucideIcon } from "lucide-react";

const ICONS: Record<string, LucideIcon> = {
  "Commercial Banks": Building2,
  "Mobile Money": Smartphone,
  "Internet Banking": Landmark,
  "Debit Cards": CreditCard,
  "Credit Cards": CreditCard,
  "Treasury Single Account": Wallet,
};

export function PaymentGateway() {
  return (
    <div className="card">
      <div className="mb-4 flex items-center gap-2">
        <Banknote className="h-4 w-4 text-zra-navy" />
        <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">Digital Payment Gateway</h2>
      </div>
      <p className="mb-3 text-xs text-slate-400">Integrated With</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PAYMENT_GATEWAY_CHANNELS.map((channel) => {
          const Icon = ICONS[channel] ?? Building2;
          return (
            <div key={channel} className="flex items-center gap-2 rounded-lg bg-slate-50 px-3 py-2">
              <Icon className="h-4 w-4 shrink-0 text-slate-500" />
              <span className="text-xs font-medium text-slate-600">{channel}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
