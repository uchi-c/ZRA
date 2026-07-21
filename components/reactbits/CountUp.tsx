"use client";

// Adapted from react-bits (https://reactbits.dev) TextAnimations/CountUp for the
// national command-center dashboards, where KPI figures should animate in on load
// rather than jump straight to their final values.
import { useInView, useMotionValue, useSpring } from "motion/react";
import { useCallback, useEffect, useRef } from "react";

interface CountUpProps {
  to: number;
  from?: number;
  direction?: "up" | "down";
  delay?: number;
  duration?: number;
  className?: string;
  separator?: string;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}

export function CountUp({
  to,
  from = 0,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className = "",
  separator = ",",
  prefix = "",
  suffix = "",
  decimals,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(direction === "down" ? to : from);

  const damping = 20 + 40 * (1 / duration);
  const stiffness = 100 * (1 / duration);
  const springValue = useSpring(motionValue, { damping, stiffness });
  const isInView = useInView(ref, { once: true, margin: "0px" });

  const formatValue = useCallback(
    (latest: number) => {
      const options: Intl.NumberFormatOptions = {
        useGrouping: !!separator,
        minimumFractionDigits: decimals ?? 0,
        maximumFractionDigits: decimals ?? 0,
      };
      const formatted = new Intl.NumberFormat("en-US", options).format(latest);
      return `${prefix}${separator ? formatted.replace(/,/g, separator) : formatted}${suffix}`;
    },
    [separator, prefix, suffix, decimals]
  );

  useEffect(() => {
    if (ref.current) {
      ref.current.textContent = formatValue(direction === "down" ? to : from);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const timeoutId = setTimeout(() => {
      motionValue.set(direction === "down" ? from : to);
    }, delay * 1000);
    return () => clearTimeout(timeoutId);
  }, [isInView, motionValue, direction, from, to, delay]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) ref.current.textContent = formatValue(latest);
    });
    return () => unsubscribe();
  }, [springValue, formatValue]);

  return <span className={className} ref={ref} />;
}
