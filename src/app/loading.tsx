import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-violet-50 p-8">
      <Skeleton className="mb-6 h-16 w-full max-w-xl" />
      <Skeleton className="mb-6 h-48 w-full" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
      <Skeleton className="mt-6 h-64" />
    </div>
  );
}
