"use client";

import { useState } from "react";
import { Globe2, Heart, MapPin, Sparkles } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpoonbillMigrationCharts } from "@/components/dashboard/spoonbill-migration-charts";
import { SpoonbillPhotoRotator } from "@/components/dashboard/spoonbill-photo-rotator";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  chartPalette,
  chartTooltipStyle,
  colors,
  chartGridStroke,
} from "@/lib/design/tokens";
import { CONTINENT_COLORS, SPOONBILL_INFO } from "@/lib/mock/spoonbill";
import type { SpoonbillContinent } from "@/types/spoonbill";
import type { UlsanMigrantSpecies } from "@/types/regional";

const SEASON_COLORS = {
  번식: "#f9a8d4",
  월동: "#c4b5fd",
  이동: "#5eead4",
} as const;

const CONTINENT_TABS: Array<{ key: SpoonbillContinent | "전체"; label: string }> =
  [
    { key: "전체", label: "🌏 전체" },
    { key: "아시아", label: "🌸 아시아" },
    { key: "유럽", label: "💜 유럽" },
    { key: "북미", label: "💙 북미" },
  ];

export function SpoonbillSpotlight({
  ulsanMaster,
}: {
  ulsanMaster?: UlsanMigrantSpecies;
}) {
  const [continentFilter, setContinentFilter] = useState<
    SpoonbillContinent | "전체"
  >("전체");

  const info = SPOONBILL_INFO;
  const displayName = ulsanMaster?.species_name ?? info.koreanName;
  const scientificName = ulsanMaster?.science_name ?? info.scientificName;
  const englishName = ulsanMaster?.species_name_eng ?? info.englishName;
  const extraNote = ulsanMaster?.habitat
    ? `울산 API: ${ulsanMaster.habitat}`
    : null;

  const filteredHabitats =
    continentFilter === "전체"
      ? info.habitats
      : info.habitats.filter((h) => h.continent === continentFilter);

  const chartData = info.habitats
    .filter((h) => h.role === "주요서식지")
    .map((h) => ({
      name: h.region,
      count: h.estimatedCount,
    }));

  return (
    <Card className="overflow-hidden border-rose-200/80 bg-gradient-to-br from-white via-rose-50/80 to-violet-50/60 shadow-lg shadow-rose-100/50">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-rose-300 to-violet-300" />

      <CardHeader className="relative space-y-3 px-5 py-5 sm:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <Badge variant="love">🦢 MY FAVORITE</Badge>
              <Badge variant="soft">멸종위기종</Badge>
              <Badge variant="info">아시아·유럽·북미</Badge>
            </div>
            <CardTitle className="text-2xl sm:text-3xl">{displayName}</CardTitle>
            <p className="mt-1 text-sm italic text-text-tertiary">
              {englishName} · {scientificName}
            </p>
            {extraNote && (
              <p className="mt-1 text-xs text-sky-600">✦ {extraNote}</p>
            )}
          </div>
          <div className="shrink-0 rounded-2xl bg-white/80 px-5 py-4 text-center shadow-sm ring-1 ring-rose-100">
            <p className="text-xs font-medium text-pink-400">아시아 주요 서식 개체</p>
            <p className="font-display text-4xl font-bold text-brand">
              {info.totalPopulation.toLocaleString()}
              <span className="ml-1 text-lg text-pink-300">마리</span>
            </p>
            <p className="mt-1 text-[11px] text-text-tertiary">
              {info.censusYear}년 국제 센서스
            </p>
          </div>
        </div>
        <p className="max-w-3xl text-sm leading-relaxed text-text-secondary">
          {info.description}
        </p>
        <p className="max-w-3xl text-sm leading-relaxed text-text-tertiary/90">
          {info.globalNote}
        </p>
      </CardHeader>

      <CardContent className="space-y-6 px-5 pb-6 pt-0 sm:px-6">
        <SpoonbillPhotoRotator apiPictureUrl={ulsanMaster?.picture1} />
        <SpoonbillMigrationCharts />

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-text">
                <Globe2 className="h-4 w-4 text-pink-400" />
                전 세계 서식지 현황
              </h4>
              <div className="flex flex-wrap gap-1">
                {CONTINENT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setContinentFilter(tab.key)}
                    className={`rounded-full px-3 py-1 text-xs font-medium transition ${
                      continentFilter === tab.key
                        ? "bg-pink-400 text-white shadow-sm"
                        : "bg-white/70 text-text-tertiary hover:bg-pink-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {filteredHabitats.map((habitat) => (
                <div
                  key={habitat.id}
                  className="rounded-2xl border border-white/80 bg-white/60 p-3.5 backdrop-blur-sm transition hover:border-rose-200 hover:bg-white/90"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="font-medium text-text">
                        {habitat.region}{" "}
                        <span
                          className="ml-1 rounded-full px-1.5 py-0.5 text-[10px] text-white"
                          style={{
                            backgroundColor: CONTINENT_COLORS[habitat.continent],
                          }}
                        >
                          {habitat.continent}
                        </span>
                      </p>
                      <p className="mt-0.5 flex items-start gap-1 text-xs text-text-secondary">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-pink-300" />
                        {habitat.habitatName}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="font-display text-lg font-bold text-brand">
                        {habitat.role === "드문관찰"
                          ? `관찰 ${habitat.estimatedCount}건`
                          : `${habitat.estimatedCount.toLocaleString()}마리`}
                      </p>
                      <div className="mt-1 flex flex-wrap justify-end gap-1">
                        <Badge
                          variant="soft"
                          style={{
                            backgroundColor: `${SEASON_COLORS[habitat.season]}40`,
                            color: "#9d174d",
                          }}
                        >
                          {habitat.season}
                        </Badge>
                        {habitat.role === "드문관찰" && (
                          <Badge variant="default">이류·드묾</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                  {habitat.note && (
                    <p className="mt-2 text-[11px] text-text-tertiary">
                      ✦ {habitat.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-text">
              <Sparkles className="h-4 w-4 text-pink-400" />
              아시아 주요 서식지 개체수
            </h4>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis type="number" tick={{ fontSize: 11, fill: colors.textSecondary }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={72}
                  tick={{ fontSize: 11, fill: colors.textSecondary }}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" name="개체수" radius={[0, 8, 8, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={chartPalette[index % chartPalette.length]}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3 ring-1 ring-rose-100">
          <p className="flex items-center gap-1.5 text-xs text-text-secondary">
            <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
            {info.conservationStatus}
          </p>
          <p className="text-[11px] text-text-tertiary">{info.censusNote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
