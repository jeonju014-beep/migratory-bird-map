import type { Metadata } from "next";
import { Suspense } from "react";
import { DashboardView } from "@/components/dashboard/dashboard-view";
import { Skeleton } from "@/components/ui/skeleton";
import { getDashboardData } from "@/lib/api/dashboard";

export const metadata: Metadata = {
  title: "철새 맵 | 대한민국 실시간 철새 도래 현황",
  description: "철새 도래지, 습지, 날씨, 관측 추천지수를 한눈에 확인하는 대시보드",
};

async function DashboardContent({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  const params = await searchParams;
  const areaCode = params.region ?? "0";
  const data = await getDashboardData(areaCode);

  return <DashboardView data={data} />;
}

export default function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ region?: string }>;
}) {
  return (
    <Suspense fallback={<DashboardSkeleton />}>
      <DashboardContent searchParams={searchParams} />
    </Suspense>
  );
}

function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <Skeleton className="mb-6 h-16 w-full max-w-xl" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28" />
        ))}
      </div>
    </div>
  );
}
