"use client";

import { useState } from "react";
import { ChevronDown, LifeBuoy, Mail, Phone } from "lucide-react";
import clsx from "clsx";
import { FAQ_ITEMS } from "@/lib/mockData";

export function SupportPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-6">
      <div className="card flex items-center gap-3 bg-gradient-to-r from-zra-navy-dark to-zra-navy text-white">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/15">
          <LifeBuoy className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-lg font-bold">Support Centre</h1>
          <p className="text-sm text-white/80">Get help with filing, payments, and compliance.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="card flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Phone className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Call Centre</p>
            <p className="text-sm text-slate-500">0800-555-555 (toll-free)</p>
          </div>
        </div>
        <div className="card flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-zra-navy/5 text-zra-navy">
            <Mail className="h-4 w-4" />
          </span>
          <div>
            <p className="text-sm font-semibold text-slate-800">Email Support</p>
            <p className="text-sm text-slate-500">support@zra.org.zm</p>
          </div>
        </div>
      </div>

      <div className="card">
        <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
          Frequently Asked Questions
        </h2>
        <div className="flex flex-col divide-y divide-slate-100">
          {FAQ_ITEMS.map((item, i) => (
            <div key={item.question}>
              <button
                type="button"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="flex w-full items-center justify-between gap-3 py-3 text-left"
              >
                <span className="text-sm font-medium text-slate-800">{item.question}</span>
                <ChevronDown
                  className={clsx("h-4 w-4 shrink-0 text-slate-400 transition-transform", openIndex === i && "rotate-180")}
                />
              </button>
              {openIndex === i && <p className="pb-3 text-sm text-slate-500">{item.answer}</p>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
