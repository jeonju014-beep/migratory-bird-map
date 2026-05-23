"use client";

import { Suspense } from "react";
import { Bird, RefreshCw } from "lucide-react";
import { RegionScoreChart, SpeciesPieChart, WeatherTrendChart } from "@/components/charts/dashboard-charts";
import { BirdSiteList, WetlandList } from "@/components/dashboard/site-lists";
import { KpiCards, WeatherMiniCard } from "@/components/dashboard/kpi-cards";
import { RegionFilter } from "@/components/dashboard/region-filter";
import { TopRegions } from "@/components/dashboard/top-regions";
import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils/format";
import type { DashboardData } from "@/types/dashboard";

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-sky-600 p-3 text-white">
              <Bird className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-slate-900">
                철새 맵
              </h1>
              <p className="text-sm text-slate-500">
                대한민국 실시간 철새 도래 현황 대시보드
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Suspense fallback={<div className="h-10 w-32 animate-pulse rounded-lg bg-slate-200" />}>
              <RegionFilter currentCode={data.region.code} />
            </Suspense>
            <Badge variant={data.isMock ? "warning" : "success"}>
              {data.isMock ? "Mock 데이터" : "Live API"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-slate-400">
              <RefreshCw className="h-3.5 w-3.5" />
              {formatDateTime(new Date(data.updatedAt))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
        <KpiCards summary={data.summary} />

        <section>
          <h2 className="mb-4 text-lg font-semibold text-slate-900">
            이번 주 추천 지역 TOP3
          </h2>
          <TopRegions regions={data.summary.topRegions} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <RegionScoreChart data={data.summary.regionScores} />
          <WeatherTrendChart data={data.weatherTrend} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <SpeciesPieChart data={data.summary.speciesCategories} />
          <div className="grid gap-3 sm:grid-cols-2">
            {data.weather.map((item) => (
              <WeatherMiniCard
                key={item.city}
                city={item.city}
                tempMin={item.tempMin}
                tempMax={item.tempMax}
                description={item.description}
              />
            ))}
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-2">
          <BirdSiteList sites={data.birdSites} />
          <WetlandList spots={data.wetlandSpots} />
        </section>
      </main>
    </div>
  );
}
