import clsx from "clsx";

const STEPS = ["Submitted", "Under Review", "Approved", "Paid"];

export function RefundStepper({ currentStep }: { currentStep: number }) {
  return (
    <ol className="flex items-center gap-2">
      {STEPS.map((step, i) => (
        <li key={step} className="flex flex-1 items-center gap-2">
          <div className="flex flex-1 flex-col items-center gap-1 text-center">
            <span
              className={clsx(
                "flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold",
                i <= currentStep ? "bg-zra-navy text-white" : "bg-slate-200 text-slate-400"
              )}
            >
              {i < currentStep ? "✓" : i + 1}
            </span>
            <span className={clsx("text-xs", i <= currentStep ? "font-semibold text-slate-700" : "text-slate-400")}>
              {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div className={clsx("mb-4 h-0.5 flex-1", i < currentStep ? "bg-zra-navy" : "bg-slate-200")} />
          )}
        </li>
      ))}
    </ol>
  );
}
