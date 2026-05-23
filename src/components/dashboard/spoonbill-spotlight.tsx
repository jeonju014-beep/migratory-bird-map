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
  CONTINENT_COLORS,
  SPOONBILL_INFO,
} from "@/lib/mock/spoonbill";
import type { SpoonbillContinent } from "@/types/spoonbill";
import type { UlsanMigrantSpecies } from "@/types/regional";

const SEASON_COLORS = {
  번식: "#f9a8d4",
  월동: "#c4b5fd",
  이동: "#99f6e4",
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
    <Card className="relative overflow-hidden border-rose-200/80 bg-gradient-to-br from-white via-rose-50/80 to-violet-50/60 shadow-lg shadow-rose-100/50">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-pink-300 via-rose-300 to-violet-300" />

      <CardHeader className="relative pb-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="love">🦢 MY FAVORITE</Badge>
              <Badge variant="soft">멸종위기종</Badge>
              <Badge variant="info">아시아·유럽·북미</Badge>
            </div>
            <CardTitle className="font-display text-2xl text-rose-900 sm:text-3xl">
              {displayName}
            </CardTitle>
            <p className="mt-1 text-sm italic text-violet-600/80">
              {englishName} · {scientificName}
            </p>
            {extraNote && (
              <p className="mt-1 text-xs text-sky-600/80">✦ {extraNote}</p>
            )}
          </div>
          <div className="rounded-2xl bg-white/70 px-5 py-4 text-center shadow-sm ring-1 ring-rose-100">
            <p className="text-xs font-medium text-rose-400">아시아 주요 서식 개체</p>
            <p className="font-display text-4xl font-bold text-rose-500">
              {info.totalPopulation.toLocaleString()}
              <span className="ml-1 text-lg text-rose-300">마리</span>
            </p>
            <p className="mt-1 text-[11px] text-violet-400">
              {info.censusYear}년 국제 센서스 · 유럽·북미는 드문 관찰
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-rose-800/80">
          {info.description} {info.globalNote}
        </p>
      </CardHeader>

      <CardContent className="space-y-8">
        <SpoonbillPhotoRotator apiPictureUrl={ulsanMaster?.picture1} />

        <SpoonbillMigrationCharts />

        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-violet-700">
                <Globe2 className="h-4 w-4 text-pink-400" />
                전 세계 서식지 현황
              </h4>
              <div className="flex flex-wrap gap-1">
                {CONTINENT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setContinentFilter(tab.key)}
                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition ${
                      continentFilter === tab.key
                        ? "bg-pink-400 text-white shadow-sm"
                        : "bg-white/70 text-violet-500 hover:bg-pink-50"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-80 space-y-2 overflow-y-auto pr-1">
              {filteredHabitats.map((habitat) => (
                <div
                  key={habitat.id}
                  className="rounded-2xl border border-white/80 bg-white/60 p-3.5 backdrop-blur-sm transition hover:border-rose-200 hover:bg-white/90"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-rose-900">
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
                      <p className="mt-0.5 flex items-start gap-1 text-xs text-rose-700/70">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-pink-300" />
                        {habitat.habitatName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-rose-500">
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
                    <p className="mt-2 text-[11px] text-violet-500/80">
                      ✦ {habitat.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-700">
              <Sparkles className="h-4 w-4 text-pink-400" />
              아시아 주요 서식지 개체수
            </h4>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" tick={{ fontSize: 11, fill: "#9d174d" }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={72}
                  tick={{ fontSize: 11, fill: "#7c3aed" }}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #fbcfe8",
                    background: "#fff1f2",
                  }}
                />
                <Bar dataKey="count" name="개체수" radius={[0, 8, 8, 0]}>
                  {chartData.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#f472b6", "#e879f9", "#c084fc", "#818cf8", "#5eead4"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white/50 px-4 py-3 ring-1 ring-rose-100">
          <p className="flex items-center gap-1.5 text-xs text-violet-600/80">
            <Heart className="h-3.5 w-3.5 fill-pink-300 text-pink-400" />
            {info.conservationStatus}
          </p>
          <p className="text-[11px] text-rose-400/90">{info.censusNote}</p>
        </div>
      </CardContent>
    </Card>
  );
}
