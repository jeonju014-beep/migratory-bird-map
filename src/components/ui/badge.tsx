import type { CSSProperties } from "react";
import { cn } from "@/lib/utils/format";

const variants = {
  default: "bg-violet-100/80 text-violet-700",
  success: "bg-emerald-100/80 text-emerald-700",
  warning: "bg-amber-100/80 text-amber-700",
  info: "bg-sky-100/80 text-sky-700",
  soft: "bg-pink-100/80 text-pink-700",
  love: "bg-gradient-to-r from-pink-200 to-violet-200 text-rose-800 font-semibold",
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
