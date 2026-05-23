"use client";

import { Suspense } from "react";
import { Bird, RefreshCw } from "lucide-react";
import { RegionScoreChart, SpeciesPieChart, WeatherTrendChart } from "@/components/charts/dashboard-charts";
import { BirdSiteList, WetlandList } from "@/components/dashboard/site-lists";
import { KpiCards, WeatherMiniCard } from "@/components/dashboard/kpi-cards";
import { RegionFilter } from "@/components/dashboard/region-filter";
import { RegionalInsightsSection } from "@/components/dashboard/regional-insights-section";
import { SpoonbillSpotlight } from "@/components/dashboard/spoonbill-spotlight";
import { TopRegions } from "@/components/dashboard/top-regions";
import { UlsanTaehwaSection } from "@/components/dashboard/ulsan-taehwa-section";
import { Badge } from "@/components/ui/badge";
import { SectionTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDateTime } from "@/lib/utils/format";
import type { DashboardData } from "@/types/dashboard";

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <div className="min-h-screen bg-bg">
      <header className="sticky top-0 z-50 border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand text-white">
              <Bird className="h-6 w-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight text-text sm:text-2xl">
                철새 맵
              </h1>
              <p className="text-sm text-text-secondary">
                철새 도래 현황 · 습지 · 날씨
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <Suspense fallback={<Skeleton className="h-11 w-32" />}>
              <RegionFilter currentCode={data.region.code} />
            </Suspense>
            <Badge variant={data.isMock ? "warning" : "success"}>
              {data.isMock ? "샘플 데이터" : "Live API"}
            </Badge>
            <div className="flex items-center gap-1.5 text-xs text-text-tertiary">
              <RefreshCw className="h-3.5 w-3.5" />
              {formatDateTime(new Date(data.updatedAt))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-6 px-4 py-6 sm:px-6 lg:px-8">
        <section>
          <SpoonbillSpotlight
            ulsanMaster={data.extended.ulsan.spoonbillMaster}
          />
        </section>

        <UlsanTaehwaSection data={data.extended.ulsan} />

        <RegionalInsightsSection data={data.extended.regional} />

        <section>
          <SectionTitle>오늘의 철새 한눈에 보기</SectionTitle>
          <KpiCards summary={data.summary} />
        </section>

        <section>
          <SectionTitle>이번 주 추천 지역 TOP3</SectionTitle>
          <TopRegions regions={data.summary.topRegions} />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <RegionScoreChart data={data.summary.regionScores} />
          <WeatherTrendChart data={data.weatherTrend} />
        </section>

        <section className="grid gap-4 xl:grid-cols-2">
          <SpeciesPieChart data={data.summary.speciesCategories} />
          <div>
            <SectionTitle>5일 날씨 요약</SectionTitle>
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
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-2">
          <BirdSiteList sites={data.birdSites} />
          <WetlandList spots={data.wetlandSpots} />
        </section>
      </main>

      <footer className="border-t border-border bg-surface py-8 text-center">
        <p className="text-sm text-text-tertiary">
          철새 맵 · 공공데이터 기반 교육용 대시보드
        </p>
      </footer>

      <aside
        aria-label="가족에게 보내는 메시지"
        className="pointer-events-none fixed bottom-4 right-4 z-20 max-w-[10.5rem] rounded-xl border border-border bg-surface/95 px-3 py-2.5 text-right text-[11px] leading-relaxed text-text-secondary shadow-sm backdrop-blur-sm sm:max-w-xs sm:text-xs"
      >
        내 아내 정은이 그리고 우리 예지, 상윤아{" "}
        <span className="font-bold text-accent">사랑해~!!</span>
      </aside>
    </div>
  );
}
