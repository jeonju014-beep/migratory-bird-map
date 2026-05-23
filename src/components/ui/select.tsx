"use client";

import { cn } from "@/lib/utils/format";

export function Select({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (value: string) => void;
  options: Array<{ value: string; label: string }>;
  className?: string;
}) {
  return (
    <select
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className={cn(
        "h-10 rounded-2xl border border-rose-200/80 bg-white/90 px-4 text-sm text-rose-900 shadow-sm outline-none focus:border-pink-400 focus:ring-2 focus:ring-pink-100",
        className,
      )}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
