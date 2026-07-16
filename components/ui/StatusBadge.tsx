import clsx from "clsx";

type Status =
  | "Compliant"
  | "Pending"
  | "Pending Review"
  | "Outstanding"
  | "Outstanding Taxes"
  | "Verified"
  | "Rejected";

const STYLES: Record<Status, string> = {
  Compliant: "bg-status-green/15 text-status-green",
  "Pending Review": "bg-status-amber/15 text-status-amber",
  Pending: "bg-status-amber/15 text-status-amber",
  Outstanding: "bg-status-red/15 text-status-red",
  "Outstanding Taxes": "bg-status-red/15 text-status-red",
  Verified: "bg-status-green/15 text-status-green",
  Rejected: "bg-status-red/15 text-status-red",
};

const DOT: Record<Status, string> = {
  Compliant: "bg-status-green",
  "Pending Review": "bg-status-amber",
  Pending: "bg-status-amber",
  Outstanding: "bg-status-red",
  "Outstanding Taxes": "bg-status-red",
  Verified: "bg-status-green",
  Rejected: "bg-status-red",
};

export function StatusBadge({ status, className }: { status: Status; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        STYLES[status],
        className
      )}
    >
      <span className={clsx("h-1.5 w-1.5 rounded-full", DOT[status])} />
      {status}
    </span>
  );
}
