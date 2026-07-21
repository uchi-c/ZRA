import clsx from "clsx";

// Lightweight CSS-only take on react-bits' ShinyText: a gradient sweep across
// the text, used sparingly for command-center header titles.
export function ShinyText({ text, className }: { text: string; className?: string }) {
  return <span className={clsx("shiny-text", className)}>{text}</span>;
}
