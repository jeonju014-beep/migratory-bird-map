"use client";

import { useState } from "react";
import { Globe2, MapPin } from "lucide-react";
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
  번식: colors.brand,
  월동: colors.accent,
  이동: colors.success,
} as const;

const CONTINENT_TABS: Array<{ key: SpoonbillContinent | "전체"; label: string }> =
  [
    { key: "전체", label: "전체" },
    { key: "아시아", label: "아시아" },
    { key: "유럽", label: "유럽" },
    { key: "북미", label: "북미" },
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
    <Card>
      <CardHeader className="space-y-2 px-4 py-3 sm:px-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-center gap-1.5">
              <Badge variant="accent" className="text-[10px]">
                대표 종
              </Badge>
              <Badge variant="soft" className="text-[10px]">
                멸종위기종
              </Badge>
            </div>
            <CardTitle className="text-lg sm:text-xl">{displayName}</CardTitle>
            <p className="mt-0.5 text-xs text-text-secondary">
              {englishName} · {scientificName}
            </p>
            {extraNote && (
              <p className="mt-0.5 text-[10px] text-brand">{extraNote}</p>
            )}
          </div>
          <div className="shrink-0 rounded-xl border border-border bg-bg px-3 py-2 text-center">
            <p className="text-[10px] font-medium text-text-tertiary">
              아시아 주요 개체
            </p>
            <p className="text-xl font-bold text-brand sm:text-2xl">
              {info.totalPopulation.toLocaleString()}
              <span className="ml-0.5 text-xs font-medium text-text-tertiary">
                마리
              </span>
            </p>
            <p className="mt-0.5 text-[10px] text-text-tertiary">
              {info.censusYear}년 센서스
            </p>
          </div>
        </div>
        <p className="line-clamp-2 text-xs leading-relaxed text-text-secondary">
          {info.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-4 px-4 pb-4 pt-0 sm:px-5">
        <SpoonbillPhotoRotator apiPictureUrl={ulsanMaster?.picture1} />
        <SpoonbillMigrationCharts />

        <div className="grid gap-4 lg:grid-cols-2">
          <div>
            <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
              <h4 className="flex items-center gap-1.5 text-xs font-semibold text-text">
                <Globe2 className="h-3.5 w-3.5 text-brand" />
                전 세계 서식지
              </h4>
              <div className="flex flex-wrap gap-1">
                {CONTINENT_TABS.map((tab) => (
                  <button
                    key={tab.key}
                    type="button"
                    onClick={() => setContinentFilter(tab.key)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] font-medium transition ${
                      continentFilter === tab.key
                        ? "bg-brand text-white"
                        : "bg-bg text-text-secondary hover:bg-brand-soft"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="max-h-44 space-y-1.5 overflow-y-auto pr-1">
              {filteredHabitats.map((habitat) => (
                <div
                  key={habitat.id}
                  className="rounded-xl border border-border bg-bg p-2.5 transition hover:border-brand/30"
                >
                  <div className="flex flex-wrap items-start justify-between gap-1.5">
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-text">
                        {habitat.region}{" "}
                        <span
                          className="ml-1 rounded-md px-1 py-0.5 text-[9px] text-white"
                          style={{
                            backgroundColor: CONTINENT_COLORS[habitat.continent],
                          }}
                        >
                          {habitat.continent}
                        </span>
                      </p>
                      <p className="mt-0.5 flex items-start gap-1 text-[10px] text-text-secondary">
                        <MapPin className="mt-0.5 h-2.5 w-2.5 shrink-0 text-brand" />
                        <span className="line-clamp-1">{habitat.habitatName}</span>
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-brand">
                        {habitat.role === "드문관찰"
                          ? `관찰 ${habitat.estimatedCount}건`
                          : `${habitat.estimatedCount.toLocaleString()}마리`}
                      </p>
                      <div className="mt-1 flex flex-wrap justify-end gap-1">
                        <Badge
                          variant="soft"
                          style={{
                            backgroundColor: `${SEASON_COLORS[habitat.season]}20`,
                            color: SEASON_COLORS[habitat.season],
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
                    <p className="mt-1 line-clamp-1 text-[10px] text-text-tertiary">
                      {habitat.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-xs font-semibold text-text">
              아시아 주요 서식지 개체수
            </h4>
            <ResponsiveContainer width="100%" height={180}>
              <BarChart data={chartData} layout="vertical" margin={{ left: 4 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis type="number" tick={{ fontSize: 9, fill: colors.textSecondary }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={64}
                  tick={{ fontSize: 9, fill: colors.textSecondary }}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" name="개체수" radius={[0, 6, 6, 0]}>
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

        <div className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-bg px-3 py-2">
          <p className="text-[10px] text-text-secondary">{info.conservationStatus}</p>
          <p className="line-clamp-1 text-[10px] text-text-tertiary">
            {info.censusNote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
