"use client";

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
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SPOONBILL_INFO } from "@/lib/mock/spoonbill";
import type { UlsanMigrantSpecies } from "@/types/regional";

const SEASON_COLORS = {
  번식: "#f9a8d4",
  월동: "#c4b5fd",
  이동: "#99f6e4",
} as const;

const CHART_COLORS = [
  "#f472b6",
  "#e879f9",
  "#c084fc",
  "#a78bfa",
  "#818cf8",
  "#67e8f9",
  "#5eead4",
  "#fcd34d",
];

export function SpoonbillSpotlight({
  ulsanMaster,
}: {
  ulsanMaster?: UlsanMigrantSpecies;
}) {
  const info = SPOONBILL_INFO;
  const displayName = ulsanMaster?.species_name ?? info.koreanName;
  const scientificName = ulsanMaster?.science_name ?? info.scientificName;
  const englishName = ulsanMaster?.species_name_eng ?? info.englishName;
  const extraNote = ulsanMaster?.habitat
    ? `울산 API: ${ulsanMaster.habitat}`
    : null;
  const chartData = info.habitats.map((h) => ({
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
            <p className="text-xs font-medium text-rose-400">세계 총 개체수</p>
            <p className="font-display text-4xl font-bold text-rose-500">
              {info.totalPopulation.toLocaleString()}
              <span className="ml-1 text-lg text-rose-300">마리</span>
            </p>
            <p className="mt-1 text-[11px] text-violet-400">
              {info.censusYear}년 국제 센서스 추정
            </p>
          </div>
        </div>
        <p className="mt-4 max-w-3xl text-sm leading-relaxed text-rose-800/80">
          {info.description}
        </p>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-violet-700">
              <Globe2 className="h-4 w-4 text-pink-400" />
              전 세계 서식지 현황
            </h4>
            <div className="max-h-72 space-y-2 overflow-y-auto pr-1">
              {info.habitats.map((habitat) => (
                <div
                  key={habitat.id}
                  className="rounded-2xl border border-white/80 bg-white/60 p-3.5 backdrop-blur-sm transition hover:border-rose-200 hover:bg-white/90"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="font-medium text-rose-900">
                        {habitat.region}{" "}
                        <span className="text-xs font-normal text-violet-400">
                          {habitat.country}
                        </span>
                      </p>
                      <p className="mt-0.5 flex items-start gap-1 text-xs text-rose-700/70">
                        <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-pink-300" />
                        {habitat.habitatName}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-display text-lg font-bold text-rose-500">
                        {habitat.estimatedCount.toLocaleString()}마리
                      </p>
                      <Badge
                        variant="soft"
                        className="mt-1"
                        style={{
                          backgroundColor: `${SEASON_COLORS[habitat.season]}40`,
                          color: "#9d174d",
                        }}
                      >
                        {habitat.season}
                      </Badge>
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
              지역별 개체수
            </h4>
            <ResponsiveContainer width="100%" height={280}>
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
                      fill={CHART_COLORS[index % CHART_COLORS.length]}
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
