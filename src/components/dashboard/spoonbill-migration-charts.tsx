"use client";

import { useState } from "react";
import {
  CONTINENT_COLORS,
  getProjectedHabitats,
  projectRoute,
  SPOONBILL_INFO,
} from "@/lib/mock/spoonbill";
import type { ProjectedPoint, SpoonbillContinent } from "@/types/spoonbill";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ChartFrame } from "@/components/ui/chart-frame";
import {
  chartGridStroke,
  chartTooltipStyle,
  colors,
} from "@/lib/design/tokens";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Scatter,
  ScatterChart,
  Tooltip,
  XAxis,
  YAxis,
  ZAxis,
} from "recharts";

const continentLabels: SpoonbillContinent[] = ["아시아", "유럽", "북미"];

function formatPointCount(point: ProjectedPoint) {
  if (point.role === "드문관찰") {
    return `관찰 ${point.count}건`;
  }
  return `약 ${point.count.toLocaleString()}마리`;
}

function MapPointInfo({ point }: { point: ProjectedPoint }) {
  return (
    <>
      <p className="flex items-center gap-1.5 text-sm font-bold text-text">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: CONTINENT_COLORS[point.continent] }}
        />
        {point.name}
      </p>
      {point.habitatName && (
        <p className="mt-0.5 text-xs text-text-secondary">{point.habitatName}</p>
      )}
      <p className="mt-1 font-display text-base font-bold text-brand">
        {formatPointCount(point)}
      </p>
      <p className="mt-0.5 text-[10px] text-text-tertiary">
        {point.continent} · {point.season}
        {point.role === "드문관찰" ? " · 드문 관찰" : ""}
      </p>
    </>
  );
}

function MigrationMapSvg() {
  const points = getProjectedHabitats();
  const routes = SPOONBILL_INFO.migrationRoutes;
  const [hovered, setHovered] = useState<ProjectedPoint | null>(null);
  const [selected, setSelected] = useState<ProjectedPoint | null>(null);

  const active = hovered ?? selected;

  const handlePointSelect = (point: ProjectedPoint) => {
    setSelected((prev) => (prev?.id === point.id ? null : point));
  };

  return (
    <div>
      <div className="relative aspect-[4/3] w-full min-h-[220px] overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-violet-50/50 to-rose-50 ring-1 ring-pink-100 sm:aspect-[2/1] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[380px]">
        <p className="absolute right-2 top-2 z-10 max-w-[9rem] rounded-full bg-white/85 px-2 py-1 text-[10px] leading-snug text-text-tertiary shadow-sm backdrop-blur-sm sm:right-3 sm:top-3 sm:max-w-none">
          <span className="sm:hidden">점을 탭해 보세요 ✨</span>
          <span className="hidden sm:inline">점에 마우스를 올려보세요 ✨</span>
        </p>

        <svg
          viewBox="0 0 100 100"
          className="h-full w-full touch-manipulation"
          aria-label="서식지 및 이동경로 지도"
        >
          <defs>
            <marker
              id="arrow-regular"
              markerWidth="4"
              markerHeight="4"
              refX="3"
              refY="2"
              orient="auto"
            >
              <path d="M0,0 L4,2 L0,4 Z" fill="#f472b6" opacity="0.8" />
            </marker>
            <marker
              id="arrow-rare"
              markerWidth="4"
              markerHeight="4"
              refX="3"
              refY="2"
              orient="auto"
            >
              <path d="M0,0 L4,2 L0,4 Z" fill="#94a3b8" opacity="0.7" />
            </marker>
          </defs>

          <text x="62" y="42" fontSize="3" fill={colors.textTertiary}>
            아시아
          </text>
          <text x="48" y="28" fontSize="2.5" fill={colors.textTertiary}>
            유럽
          </text>
          <text x="12" y="38" fontSize="2.5" fill={colors.textTertiary}>
            북미
          </text>

          {routes.map((route) => {
            const { x1, y1, x2, y2 } = projectRoute(route);
            const isRegular = route.routeType === "정기이동";
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - 8;

            return (
              <g key={route.id}>
                <path
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke={isRegular ? "#f472b6" : "#cbd5e1"}
                  strokeWidth={isRegular ? 0.35 : 0.25}
                  strokeDasharray={isRegular ? "none" : "1 0.8"}
                  markerEnd={`url(#arrow-${isRegular ? "regular" : "rare"})`}
                  opacity={isRegular ? 0.75 : 0.55}
                />
              </g>
            );
          })}

          {points.map((point) => {
            const radius =
              point.role === "주요서식지"
                ? Math.max(1.4, Math.min(4, Math.sqrt(point.count) / 30))
                : 1.2;
            const hitRadius = Math.max(radius * 2.5, 3.5);
            const isActive = active?.id === point.id;

            return (
              <g key={point.id}>
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={hitRadius}
                  fill="transparent"
                  className="cursor-pointer"
                  onMouseEnter={() => setHovered(point)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handlePointSelect(point)}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? radius * 1.35 : radius}
                  fill={CONTINENT_COLORS[point.continent]}
                  opacity={point.role === "주요서식지" ? 0.9 : 0.65}
                  stroke={isActive ? "#831843" : "#fff"}
                  strokeWidth={isActive ? 0.6 : 0.35}
                  pointerEvents="none"
                />
                <title>
                  {point.name} · {formatPointCount(point)}
                </title>
              </g>
            );
          })}
        </svg>

        {active && (
          <div
            className="pointer-events-none absolute z-20 hidden max-w-[11rem] rounded-xl border border-pink-200 bg-white/95 px-3 py-2 shadow-lg shadow-pink-100/60 backdrop-blur-sm sm:max-w-xs md:block"
            style={{
              left: `${active.x}%`,
              top: `${active.y}%`,
              transform: "translate(-50%, calc(-100% - 10px))",
            }}
            role="tooltip"
          >
            <MapPointInfo point={active} />
          </div>
        )}

        <div className="absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 sm:bottom-3 sm:left-3 sm:right-auto">
          {continentLabels.map((c) => (
            <span
              key={c}
              className="rounded-md px-2 py-0.5 text-[10px] font-medium text-white"
              style={{ backgroundColor: CONTINENT_COLORS[c] }}
            >
              {c}
            </span>
          ))}
          <span className="rounded-full bg-pink-300/80 px-2 py-0.5 text-[10px] text-rose-900">
            정기 이동
          </span>
        </div>
      </div>

      {selected && (
        <div className="mt-2 rounded-xl border border-pink-200 bg-white/90 p-3 shadow-sm md:hidden">
          <MapPointInfo point={selected} />
        </div>
      )}
    </div>
  );
}

export function SpoonbillMigrationCharts() {
  const scatterData = getProjectedHabitats().map((p) => ({
    ...p,
    z: p.role === "주요서식지" ? p.count : p.count * 80,
  }));

  const byContinent = continentLabels.map((continent) => {
    const items = SPOONBILL_INFO.habitats.filter((h) => h.continent === continent);
    const primary = items.filter((h) => h.role === "주요서식지");
    const vagrant = items.filter((h) => h.role === "드문관찰");
    return {
      continent,
      primary: primary.reduce((s, h) => s + h.estimatedCount, 0),
      vagrant: vagrant.reduce((s, h) => s + h.estimatedCount, 0),
    };
  });

  const routeList = SPOONBILL_INFO.migrationRoutes;

  return (
    <div className="space-y-4 sm:space-y-5">
      <div>
        <h4 className="mb-2 font-display text-sm font-semibold text-text sm:text-base">
          🗺️ 현재 서식지 & 이동경로 (전 세계)
        </h4>
        <MigrationMapSvg />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="border-violet-100 bg-white/60">
          <CardHeader className="px-4 pb-2 pt-4 sm:p-5 sm:pb-2">
            <CardTitle className="text-sm">대륙별 개체수</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4 sm:px-5 sm:pb-5">
            <ChartFrame mobileHeight={180} desktopHeight={200}>
              {(height) => (
                <ResponsiveContainer width="100%" height={height}>
                  <BarChart data={byContinent}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis dataKey="continent" tick={{ fontSize: 10 }} />
                    <YAxis tick={{ fontSize: 10 }} width={32} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Legend wrapperStyle={{ fontSize: 11 }} />
                    <Bar dataKey="primary" name="주요 서식" stackId="a" fill="#f472b6" />
                    <Bar
                      dataKey="vagrant"
                      name="드문 관찰"
                      stackId="a"
                      fill="#c4b5fd"
                      radius={[8, 8, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </ChartFrame>
          </CardContent>
        </Card>

        <Card className="border-sky-100 bg-white/60">
          <CardHeader className="px-4 pb-2 pt-4 sm:p-5 sm:pb-2">
            <CardTitle className="text-sm">서식지 분포</CardTitle>
          </CardHeader>
          <CardContent className="px-2 pb-4 sm:px-5 sm:pb-5">
            <ChartFrame mobileHeight={180} desktopHeight={200}>
              {(height) => (
                <ResponsiveContainer width="100%" height={height}>
                  <ScatterChart margin={{ top: 8, right: 4, bottom: 8, left: -8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                    <XAxis type="number" dataKey="x" domain={[0, 100]} tick={{ fontSize: 8 }} />
                    <YAxis type="number" dataKey="y" domain={[0, 100]} tick={{ fontSize: 8 }} width={24} />
                    <ZAxis type="number" dataKey="z" range={[40, 400]} />
                    <Tooltip contentStyle={chartTooltipStyle} />
                    <Scatter data={scatterData} fill={colors.brand}>
                      {scatterData.map((entry) => (
                        <Cell key={entry.id} fill={CONTINENT_COLORS[entry.continent]} />
                      ))}
                    </Scatter>
                  </ScatterChart>
                </ResponsiveContainer>
              )}
            </ChartFrame>
          </CardContent>
        </Card>
      </div>

      <Card className="border-rose-100 bg-white/50">
        <CardHeader className="px-4 pb-2 pt-4 sm:p-5 sm:pb-2">
          <CardTitle className="text-sm">주요 이동경로 목록</CardTitle>
        </CardHeader>
        <CardContent className="px-3 pb-4 sm:px-5 sm:pb-5">
          <ul className="grid gap-2 sm:grid-cols-2">
            {routeList.map((route) => (
              <li
                key={route.id}
                className="rounded-xl border border-pink-50 bg-pink-50/30 px-3 py-2 text-sm"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant={route.routeType === "정기이동" ? "love" : "default"}>
                    {route.routeType === "정기이동" ? "정기" : "드묾"}
                  </Badge>
                  <span className="font-medium text-text">{route.label}</span>
                </div>
                <p className="mt-1 text-xs text-text-tertiary">
                  {route.from.name} → {route.to.name} · {route.seasonLabel}
                </p>
                {route.description && (
                  <p className="mt-0.5 text-[11px] text-text-secondary">
                    {route.description}
                  </p>
                )}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
