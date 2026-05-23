import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/format";

const variants = {
  default: "bg-accent-soft text-accent",
  success: "bg-success-soft text-teal-700",
  warning: "bg-warning-soft text-amber-800",
  info: "bg-sky-100 text-sky-700",
  soft: "bg-brand-soft text-text-secondary",
  accent: "bg-gradient-to-r from-pink-200 to-violet-200 text-rose-800 font-semibold",
  love: "bg-gradient-to-r from-pink-300 to-violet-300 text-white font-semibold shadow-sm",
};

export function Badge({
  className,
  variant = "default",
  children,
  style,
}: {
  className?: string;
  variant?: keyof typeof variants;
  children: React.ReactNode;
  style?: CSSProperties;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
