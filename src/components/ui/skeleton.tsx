import { cn } from "@/lib/utils/format";

export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-2xl bg-gradient-to-r from-pink-100 to-violet-100",
        className,
      )}
    />
  );
}
