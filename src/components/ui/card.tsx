import { cn } from "@/lib/utils/format";

export function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "relative rounded-2xl border border-rose-100/80 bg-white/75 shadow-md shadow-rose-100/40 backdrop-blur-sm",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-5 pb-2", className)}>{children}</div>;
}

export function CardTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h3
      className={cn(
        "font-display text-base font-bold text-rose-900",
        className,
      )}
    >
      {children}
    </h3>
  );
}

export function CardDescription({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p className={cn("text-sm text-violet-500/80", className)}>{children}</p>
  );
}

export function CardContent({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("p-5 pt-3", className)}>{children}</div>;
}

export function SectionTitle({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <h2
      className={cn(
        "font-display mb-4 flex items-center gap-2 text-lg font-bold text-rose-800",
        className,
      )}
    >
      {children}
    </h2>
  );
}
