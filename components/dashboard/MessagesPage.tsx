"use client";

import { useState } from "react";
import clsx from "clsx";
import { Send } from "lucide-react";
import { MESSAGE_THREADS, type MessageThread } from "@/lib/mockData";

export function MessagesPage() {
  const [selectedId, setSelectedId] = useState(MESSAGE_THREADS[0]?.id);
  const [reply, setReply] = useState("");
  const selected: MessageThread | undefined = MESSAGE_THREADS.find((m) => m.id === selectedId);

  return (
    <div className="flex flex-col gap-6">
      <div className="card">
        <h1 className="text-lg font-bold text-slate-900">Messages</h1>
        <p className="text-sm text-slate-500">Secure correspondence with the Zambia Revenue Authority.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="card lg:col-span-1">
          <div className="flex flex-col divide-y divide-slate-100">
            {MESSAGE_THREADS.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedId(m.id)}
                className={clsx(
                  "flex flex-col items-start gap-0.5 px-2 py-3 text-left transition",
                  selectedId === m.id ? "bg-zra-navy/5" : "hover:bg-slate-50"
                )}
              >
                <div className="flex w-full items-center justify-between">
                  <span className="text-sm font-semibold text-slate-800">{m.from}</span>
                  {m.unread && <span className="h-2 w-2 rounded-full bg-zra-navy" />}
                </div>
                <span className="text-xs font-medium text-slate-600">{m.subject}</span>
                <span className="truncate text-xs text-slate-400">{m.preview}</span>
                <span className="mt-1 text-[11px] text-slate-400">{m.time}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="card flex flex-col gap-4 lg:col-span-2">
          {selected ? (
            <>
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">From</p>
                <h2 className="text-base font-semibold text-slate-900">{selected.from}</h2>
                <p className="text-sm font-medium text-slate-700">{selected.subject}</p>
              </div>
              <p className="rounded-lg bg-slate-50 p-4 text-sm text-slate-600">{selected.preview}</p>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReply("");
                }}
                className="mt-auto flex items-center gap-2 border-t border-slate-100 pt-4"
              >
                <input
                  value={reply}
                  onChange={(e) => setReply(e.target.value)}
                  placeholder="Type your reply..."
                  className="field-input"
                />
                <button type="submit" className="btn-primary shrink-0">
                  <Send className="h-4 w-4" />
                </button>
              </form>
            </>
          ) : (
            <p className="text-sm text-slate-400">Select a message to view it.</p>
          )}
        </div>
      </div>
    </div>
  );
}
