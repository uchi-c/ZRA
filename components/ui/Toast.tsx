"use client";

import { useEffect } from "react";

export function Toast({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  useEffect(() => {
    const timeout = setTimeout(onDismiss, 3200);
    return () => clearTimeout(timeout);
  }, [onDismiss, message]);

  return (
    <div className="fixed inset-x-0 bottom-6 z-50 flex justify-center px-4">
      <div className="flex items-center gap-2 rounded-lg bg-slate-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
        <span className="text-emerald-400">✓</span>
        {message}
      </div>
    </div>
  );
}
