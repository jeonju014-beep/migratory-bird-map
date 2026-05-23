"use client";

import { Suspense } from "react";
import { Bird, Heart, RefreshCw, Sparkles } from "lucide-react";
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
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 border-b border-border/80 bg-surface/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-pink-400 to-violet-400 p-3.5 text-white shadow-lg shadow-pink-200/50">
              <Bird className="h-7 w-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-text sm:text-3xl">
                  철새 맵
                </h1>
                <Sparkles className="h-5 w-5 text-pink-400" />
              </div>
              <p className="flex items-center gap-1 text-sm text-text-tertiary">
                <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
                철새와 함께하는 귀여운 탐험 보드
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Suspense fallback={<Skeleton className="h-10 w-32" />}>
              <RegionFilter currentCode={data.region.code} />
            </Suspense>
            <Badge variant={data.isMock ? "warning" : "success"}>
              {data.isMock ? "✨ 샘플" : "🌸 Live"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-text-tertiary">
              <RefreshCw className="h-3.5 w-3.5" />
              {formatDateTime(new Date(data.updatedAt))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
          <SectionTitle className="text-xl sm:text-2xl">
            🦢 내가 제일 좋아하는 댕기머리물떼새
          </SectionTitle>
          <SpoonbillSpotlight
            ulsanMaster={data.extended.ulsan.spoonbillMaster}
          />
        </section>

        <UlsanTaehwaSection data={data.extended.ulsan} />

        <RegionalInsightsSection data={data.extended.regional} />

        <section>
          <SectionTitle>🌸 오늘의 철새 한눈에 보기</SectionTitle>
          <KpiCards summary={data.summary} />
        </section>

        <section>
          <SectionTitle>✨ 이번 주 추천 지역 TOP3</SectionTitle>
          <TopRegions regions={data.summary.topRegions} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <RegionScoreChart data={data.summary.regionScores} />
          <WeatherTrendChart data={data.weatherTrend} />
        </section>

        <section className="grid gap-6 xl:grid-cols-2">
          <SpeciesPieChart data={data.summary.speciesCategories} />
          <div>
            <SectionTitle>🌤️ 5일 날씨 요약</SectionTitle>
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

        <section className="grid gap-6 lg:grid-cols-2">
          <BirdSiteList sites={data.birdSites} />
          <WetlandList spots={data.wetlandSpots} />
        </section>
      </main>

      <footer className="border-t border-border/60 bg-surface/60 py-6 text-center">
        <p className="font-display text-sm text-text-tertiary">
          🦢 댕기머리물떼새와 함께하는 철새 여행
        </p>
      </footer>

      <aside
        aria-label="가족에게 보내는 메시지"
        className="pointer-events-none fixed bottom-4 right-4 z-20 max-w-[11rem] rounded-2xl border border-border bg-surface/95 px-3 py-2.5 text-right text-[11px] leading-relaxed text-text-secondary shadow-lg shadow-pink-100/50 backdrop-blur-sm sm:max-w-xs sm:text-xs"
      >
        내 아내 정은이 그리고 우리 예지, 상윤아{" "}
        <span className="font-display font-bold text-brand">사랑해~!!</span>
      </aside>
    </div>
  );
}
