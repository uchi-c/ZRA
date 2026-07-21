import { CountUp } from "@/components/reactbits/CountUp";

const NUMBER_PATTERN = /^([^0-9]*)([0-9][0-9,]*(?:\.[0-9]+)?)(.*)$/;

// Wraps a formatted string like "K 1,250,000,000" or "12.50%" and animates the
// numeric portion in with CountUp while keeping any prefix/suffix text static.
export function AnimatedStatValue({ value, className }: { value: string; className?: string }) {
  const match = value.match(NUMBER_PATTERN);
  if (!match) return <span className={className}>{value}</span>;

  const [, prefix, numStr, suffix] = match;
  const decimals = numStr.includes(".") ? numStr.split(".")[1].length : 0;
  const num = parseFloat(numStr.replace(/,/g, ""));

  return (
    <span className={className}>
      {prefix}
      <CountUp to={num} decimals={decimals} separator="," duration={1.2} />
      {suffix}
    </span>
  );
}
