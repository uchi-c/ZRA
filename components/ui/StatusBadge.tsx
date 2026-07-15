import clsx from "clsx";

type Status = "Compliant" | "Pending" | "Pending Review" | "Outstanding" | "Outstanding Taxes";

const STYLES: Record<Status, string> = {
  Compliant: "bg-emerald-100 text-emerald-800 border-emerald-200",
  "Pending Review": "bg-amber-100 text-amber-800 border-amber-200",
  Pending: "bg-amber-100 text-amber-800 border-amber-200",
  Outstanding: "bg-red-100 text-red-800 border-red-200",
  "Outstanding Taxes": "bg-red-100 text-red-800 border-red-200",
};

const DOT: Record<Status, string> = {
  Compliant: "bg-emerald-500",
  "Pending Review": "bg-amber-500",
  Pending: "bg-amber-500",
  Outstanding: "bg-red-500",
  "Outstanding Taxes": "bg-red-500",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium",
        STYLES[status],
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", DOT[status])} />
      {status}
    </span>
  );
}
