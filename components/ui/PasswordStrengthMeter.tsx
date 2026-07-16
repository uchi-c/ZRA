import clsx from "clsx";

function scorePassword(password: string) {
  let score = 0;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score += 1;
  if (/\d/.test(password)) score += 1;
  if (/[^A-Za-z0-9]/.test(password)) score += 1;
  return score;
}

const LEVELS = [
  { label: "Very weak", color: "bg-status-red" },
  { label: "Weak", color: "bg-status-red" },
  { label: "Fair", color: "bg-status-amber" },
  { label: "Good", color: "bg-zra-gold" },
  { label: "Strong", color: "bg-status-green" },
  { label: "Very strong", color: "bg-status-green" },
];

export function PasswordStrengthMeter({ password }: { password: string }) {
  if (!password) return null;
  const score = scorePassword(password);
  const level = LEVELS[score];

  return (
    <div className="mt-1.5">
      <div className="flex gap-1">
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={clsx("h-1 flex-1 rounded-full", i < score ? level.color : "bg-slate-200")}
          />
        ))}
      </div>
      <p className="mt-1 text-xs text-slate-500">{level.label}</p>
    </div>
  );
}
