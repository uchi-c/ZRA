export function LiveBadge({ label = "LIVE" }: { label?: string }) {
  return (
    <span className="flex items-center gap-1.5 text-xs font-semibold text-status-green">
      <span className="live-dot h-2 w-2 rounded-full bg-status-green" />
      {label}
    </span>
  );
}
