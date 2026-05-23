"use client";

import { useId, useState } from "react";import {
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

function MapLandmasses() {
  return (
    <g aria-hidden>
      {/* 바다 그리드 */}
      {[20, 40, 60, 80].map((value) => (
        <g key={value} opacity={0.35}>
          <line
            x1={value}
            y1={0}
            x2={value}
            y2={100}
            stroke="#93c5fd"
            strokeWidth={0.12}
            strokeDasharray="0.8 0.8"
          />
          <line
            x1={0}
            y1={value}
            x2={100}
            y2={value}
            stroke="#93c5fd"
            strokeWidth={0.12}
            strokeDasharray="0.8 0.8"
          />
        </g>
      ))}

      {/* 단순화된 육지 윤곽 (아시아·유럽·북미 서부) */}
      <path
        d="M 48 8 C 56 6, 62 10, 66 16 C 70 22, 74 28, 78 34 C 84 38, 92 36, 97 40 C 99 46, 96 54, 88 58 C 80 62, 72 58, 68 52 C 64 46, 58 42, 52 38 C 48 32, 44 24, 48 8 Z"
        fill="#dcfce7"
        stroke="#86efac"
        strokeWidth={0.25}
        opacity={0.95}
      />
      <path
        d="M 40 10 C 46 8, 52 12, 54 18 C 56 24, 52 30, 46 32 C 42 28, 38 22, 40 10 Z"
        fill="#e0e7ff"
        stroke="#a5b4fc"
        strokeWidth={0.25}
        opacity={0.95}
      />
      <path
        d="M 6 18 C 14 14, 24 16, 28 24 C 30 32, 26 42, 18 48 C 10 46, 4 36, 6 18 Z"
        fill="#e0f2fe"
        stroke="#7dd3fc"
        strokeWidth={0.25}
        opacity={0.95}
      />
    </g>
  );
}

function MigrationMapSvg() {
  const mapId = useId().replace(/:/g, "");
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
      <div className="relative h-[280px] w-full overflow-visible rounded-2xl bg-gradient-to-br from-sky-100 via-sky-50 to-violet-50 ring-2 ring-sky-200/80 sm:h-[340px] md:h-[400px]">
        <p className="absolute right-2 top-2 z-10 max-w-[9rem] rounded-full bg-white/90 px-2 py-1 text-[10px] leading-snug text-text-tertiary shadow-sm backdrop-blur-sm sm:right-3 sm:top-3 sm:max-w-none">
          <span className="sm:hidden">점을 탭해 보세요 ✨</span>
          <span className="hidden sm:inline">점에 마우스를 올리면 정보가 나와요 ✨</span>
        </p>

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="absolute inset-0 h-full w-full touch-manipulation"
          aria-label="서식지 및 이동경로 지도"
        >
          <rect x={0} y={0} width={100} height={100} fill="#eff6ff" rx={1} />

          <MapLandmasses />

          <defs>
            <marker
              id={`${mapId}-arrow-regular`}
              markerWidth={5}
              markerHeight={5}
              refX={4}
              refY={2.5}
              orient="auto"
            >
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#e11d48" />
            </marker>
            <marker
              id={`${mapId}-arrow-rare`}
              markerWidth={5}
              markerHeight={5}
              refX={4}
              refY={2.5}
              orient="auto"
            >
              <path d="M0,0 L5,2.5 L0,5 Z" fill="#64748b" />
            </marker>
          </defs>

          <text x={72} y={44} fontSize={3.2} fill="#0369a1" fontWeight={600}>
            아시아
          </text>
          <text x={44} y={22} fontSize={2.8} fill="#4338ca" fontWeight={600}>
            유럽
          </text>
          <text x={10} y={36} fontSize={2.8} fill="#0284c7" fontWeight={600}>
            북미
          </text>

          {routes.map((route) => {
            const { x1, y1, x2, y2 } = projectRoute(route);
            const isRegular = route.routeType === "정기이동";
            const mx = (x1 + x2) / 2;
            const my = Math.min(y1, y2) - 10;

            return (
              <g key={route.id}>
                <path
                  d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
                  fill="none"
                  stroke={isRegular ? "#f43f5e" : "#94a3b8"}
                  strokeWidth={isRegular ? 0.55 : 0.35}
                  strokeDasharray={isRegular ? undefined : "1.2 0.8"}
                  markerEnd={`url(#${mapId}-arrow-${isRegular ? "regular" : "rare"})`}
                  opacity={isRegular ? 0.9 : 0.65}
                />
              </g>
            );
          })}

          {points.map((point) => {
            const radius =
              point.role === "주요서식지"
                ? Math.max(2.2, Math.min(5.5, Math.sqrt(point.count) / 22))
                : 1.8;
            const hitRadius = Math.max(radius * 2.2, 4.5);
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
                {isActive && (
                  <circle
                    cx={point.x}
                    cy={point.y}
                    r={radius + 1.2}
                    fill="none"
                    stroke="#831843"
                    strokeWidth={0.35}
                    opacity={0.5}
                    pointerEvents="none"
                  />
                )}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? radius * 1.2 : radius}
                  fill={CONTINENT_COLORS[point.continent]}
                  opacity={point.role === "주요서식지" ? 0.95 : 0.75}
                  stroke="#fff"
                  strokeWidth={0.45}
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
              transform: "translate(-50%, calc(-100% - 12px))",
            }}
            role="tooltip"
          >
            <MapPointInfo point={active} />
          </div>
        )}

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 flex flex-wrap gap-1 sm:bottom-3 sm:left-3 sm:right-auto">
          {continentLabels.map((c) => (
            <span
              key={c}
              className="rounded-md px-2 py-0.5 text-[10px] font-medium text-white shadow-sm"
              style={{ backgroundColor: CONTINENT_COLORS[c] }}
            >
              {c}
            </span>
          ))}
          <span className="rounded-full bg-rose-500 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
            정기 이동
          </span>
          <span className="rounded-full bg-slate-400 px-2 py-0.5 text-[10px] font-medium text-white shadow-sm">
            드문 기록
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
    <div className="space-y-4 overflow-visible sm:space-y-5">      <div>
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
