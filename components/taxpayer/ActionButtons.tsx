"use client";

interface ActionButtonsProps {
  onAction: (action: string) => void;
}

const ACTIONS = [
  "Calculate Tax",
  "Submit Return",
  "Upload Supporting Documents",
  "Generate Assessment",
  "Request Refund",
  "Make Payment",
  "Generate Tax Clearance",
  "Generate Compliance Report",
  "AI Compliance Check",
];

export function ActionButtons({ onAction }: ActionButtonsProps) {
  return (
    <div className="card">
      <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">Actions</h3>
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((action) => (
          <button
            key={action}
            type="button"
            onClick={() => onAction(action)}
            className={action === "Submit Return" ? "btn-primary" : "btn-secondary"}
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
