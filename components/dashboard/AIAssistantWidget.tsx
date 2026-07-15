"use client";

import { useState } from "react";
import { Bot, Send, X } from "lucide-react";

interface ChatMessage {
  from: "bot" | "user";
  text: string;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  { from: "bot", text: "Hello! I'm your AI Tax Assistant. How can I help you today?" },
];

const QUICK_PROMPTS = ["Tax compliance guidance", "Tax computation help", "Penalty estimation", "Filing assistance"];

const CANNED_REPLY =
  "This is a demo AI Tax Assistant. In production this would connect to the AI Compliance Engine to answer questions about your filings, payments, and compliance status in real time.";

export function AIAssistantWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  function send(text: string) {
    if (!text.trim()) return;
    setMessages((prev) => [...prev, { from: "user", text }, { from: "bot", text: CANNED_REPLY }]);
    setDraft("");
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="mb-3 flex h-96 w-80 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
          <div className="flex items-center justify-between bg-zra-green-dark px-4 py-3 text-white">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4" />
              <span className="text-sm font-semibold">AI Tax Assistant</span>
            </div>
            <button type="button" onClick={() => setOpen(false)} aria-label="Close assistant">
              <X className="h-4 w-4" />
            </button>
          </div>
          <div className="flex-1 space-y-2 overflow-y-auto px-3 py-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.from === "bot"
                    ? "max-w-[85%] rounded-lg rounded-tl-none bg-slate-100 px-3 py-2 text-xs text-slate-700"
                    : "ml-auto max-w-[85%] rounded-lg rounded-tr-none bg-zra-green px-3 py-2 text-xs text-white"
                }
              >
                {m.text}
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 border-t border-slate-100 px-3 py-2">
            {QUICK_PROMPTS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => send(p)}
                className="rounded-full border border-slate-200 px-2 py-1 text-[11px] text-slate-500 hover:bg-slate-50"
              >
                {p}
              </button>
            ))}
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
            className="flex items-center gap-2 border-t border-slate-100 p-2"
          >
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Ask me anything about taxes..."
              className="flex-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs focus:border-zra-green focus:outline-none"
            />
            <button
              type="submit"
              className="flex h-8 w-8 items-center justify-center rounded-full bg-zra-green text-white hover:bg-zra-green-dark"
              aria-label="Send"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-zra-green text-white shadow-lg transition hover:bg-zra-green-dark"
        aria-label="Open AI Tax Assistant"
      >
        <Bot className="h-6 w-6" />
      </button>
    </div>
  );
}
