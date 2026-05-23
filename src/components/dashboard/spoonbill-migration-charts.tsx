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
import { getWorldMigrationMapUrls } from "@/lib/utils/map-url";
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
const WORLD_MAP_URLS = getWorldMigrationMapUrls();
/** 서식지 점 표시 크기 (기본 대비 30% 축소) */
const HABITAT_DOT_SCALE = 0.7;

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

function MapLandmassesFallback() {
  return (
    <g aria-hidden>
      <rect x={0} y={0} width={100} height={100} fill="#dbeafe" />
      <path
        d="M 4 22 C 12 14, 22 16, 28 26 C 32 38, 26 48, 16 52 C 8 50, 2 38, 4 22 Z"
        fill="#bae6fd"
        stroke="#38bdf8"
        strokeWidth={0.4}
      />
      <path
        d="M 38 18 C 48 14, 56 18, 58 28 C 56 38, 48 42, 40 36 C 36 28, 36 22, 38 18 Z"
        fill="#c7d2fe"
        stroke="#818cf8"
        strokeWidth={0.4}
      />
      <path
        d="M 52 16 C 68 12, 88 18, 96 32 C 98 48, 88 58, 72 56 C 58 52, 50 42, 52 28 Z"
        fill="#bbf7d0"
        stroke="#4ade80"
        strokeWidth={0.4}
      />
    </g>
  );
}

function habitatDotRadius(point: ProjectedPoint) {
  const base =
    point.role === "주요서식지"
      ? Math.max(2.2, Math.min(5.5, Math.sqrt(point.count) / 22))
      : 1.8;
  return base * HABITAT_DOT_SCALE;
}

function MigrationMapSvg() {
  const points = getProjectedHabitats();
  const routes = SPOONBILL_INFO.migrationRoutes;
  const [hovered, setHovered] = useState<ProjectedPoint | null>(null);
  const [selected, setSelected] = useState<ProjectedPoint | null>(null);
  const [mapUrlIndex, setMapUrlIndex] = useState(0);
  const [mapBgReady, setMapBgReady] = useState(false);

  const active = hovered ?? selected;
  const mapBgUrl = WORLD_MAP_URLS[mapUrlIndex];
  const mapBgExhausted = mapUrlIndex >= WORLD_MAP_URLS.length;

  const handleMapBgError = () => {
    setMapBgReady(false);
    setMapUrlIndex((i) => i + 1);
  };

  const handlePointSelect = (point: ProjectedPoint) => {
    setSelected((prev) => (prev?.id === point.id ? null : point));
  };

  return (
    <div>
      <div className="relative h-[280px] w-full shrink-0 overflow-hidden rounded-2xl border-2 border-sky-300/90 bg-sky-100 shadow-inner sm:h-[340px] md:h-[400px]">
        <p className="absolute right-2 top-2 z-20 max-w-[9rem] rounded-full bg-white/95 px-2 py-1 text-[10px] leading-snug text-text-tertiary shadow-sm backdrop-blur-sm sm:right-3 sm:top-3 sm:max-w-none">
          <span className="sm:hidden">점을 탭해 보세요 ✨</span>
          <span className="hidden sm:inline">점에 마우스를 올리면 정보가 나와요 ✨</span>
        </p>

        {!mapBgReady && (
          <svg
            viewBox="0 0 100 100"
            preserveAspectRatio="xMidYMid meet"
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
            aria-hidden
          >
            <MapLandmassesFallback />
          </svg>
        )}

        {!mapBgExhausted && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={mapBgUrl}
            src={mapBgUrl}
            alt="세계 지형 지도"
            aria-hidden
            className="pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover object-center"
            loading="eager"
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setMapBgReady(true)}
            onError={handleMapBgError}
          />
        )}

        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid meet"
          className="relative z-10 block h-full w-full touch-manipulation"
          role="img"
          aria-label="서식지 및 이동경로 지도"
        >
          <defs>
            <marker
              id="lapwing-arrow-regular"
              markerWidth={6}
              markerHeight={6}
              refX={5}
              refY={3}
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#e11d48" />
            </marker>
            <marker
              id="lapwing-arrow-rare"
              markerWidth={6}
              markerHeight={6}
              refX={5}
              refY={3}
              orient="auto"
            >
              <path d="M0,0 L6,3 L0,6 Z" fill="#64748b" />
            </marker>
          </defs>

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
                  stroke={isRegular ? "#e11d48" : "#64748b"}
                  strokeWidth={isRegular ? 1.1 : 0.7}
                  strokeDasharray={isRegular ? undefined : "2 1.2"}
                  markerEnd={`url(#lapwing-arrow-${isRegular ? "regular" : "rare"})`}
                  opacity={isRegular ? 0.95 : 0.75}
                />
              </g>
            );
          })}

          {points.map((point) => {
            const radius = habitatDotRadius(point);
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
                    r={radius + 0.84}
                    fill="none"
                    stroke="#831843"
                    strokeWidth={0.35}
                    opacity={0.6}
                    pointerEvents="none"
                  />
                )}
                <circle
                  cx={point.x}
                  cy={point.y}
                  r={isActive ? radius * 1.2 : radius}
                  fill={CONTINENT_COLORS[point.continent]}
                  opacity={point.role === "주요서식지" ? 0.95 : 0.8}
                  stroke="#fff"
                  strokeWidth={0.5}
                  pointerEvents="none"
                />
                <title>{`${point.name} · ${formatPointCount(point)}`}</title>
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

        <div className="pointer-events-none absolute bottom-2 left-2 right-2 z-20 flex flex-wrap gap-1 sm:bottom-3 sm:left-3 sm:right-auto">
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
    <div className="space-y-4 overflow-visible sm:space-y-5">
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
