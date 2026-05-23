import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/format";

const variants = {
  default: "bg-brand-soft text-brand",
  success: "bg-success-soft text-success",
  warning: "bg-warning-soft text-[#B45309]",
  info: "bg-brand-soft text-brand",
  soft: "bg-bg text-text-secondary",
  accent: "bg-accent-soft text-accent font-semibold",
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
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
        variants[variant],
        className,
      )}
      style={style}
    >
      {children}
    </span>
  );
}
