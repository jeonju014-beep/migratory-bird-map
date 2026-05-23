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
import { formatDateTime } from "@/lib/utils/format";
import type { DashboardData } from "@/types/dashboard";

export function DashboardView({ data }: { data: DashboardData }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-rose-100/80 bg-white/60 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-gradient-to-br from-pink-400 to-violet-400 p-3.5 text-white shadow-lg shadow-pink-200/50">
              <Bird className="h-7 w-7" />
            </div>
            <div>
              <div className="mb-1 flex items-center gap-2">
                <h1 className="font-display text-2xl font-bold text-rose-800 sm:text-3xl">
                  철새 맵
                </h1>
                <Sparkles className="h-5 w-5 text-pink-400" />
              </div>
              <p className="flex items-center gap-1 text-sm text-violet-500">
                <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
                철새를 사랑하는 우리를 위한 도래 현황 보드
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Suspense
              fallback={
                <div className="h-10 w-32 animate-pulse rounded-2xl bg-pink-100" />
              }
            >
              <RegionFilter currentCode={data.region.code} />
            </Suspense>
            <Badge variant={data.isMock ? "warning" : "success"}>
              {data.isMock ? "✨ 샘플 데이터" : "🌸 Live API"}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-violet-400">
              <RefreshCw className="h-3.5 w-3.5" />
              {formatDateTime(new Date(data.updatedAt))}
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section>
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

      <footer className="border-t border-rose-100/60 bg-white/40 py-6 text-center">
        <p className="font-display text-sm text-violet-400">
          🦢 댕기머리물떼새와 함께하는 철새 여행 · Made with love
        </p>
      </footer>
    </div>
  );
}
