"use client";

import {
  CONTINENT_COLORS,
  getProjectedHabitats,
  projectRoute,
  SPOONBILL_INFO,
} from "@/lib/mock/spoonbill";
import type { SpoonbillContinent } from "@/types/spoonbill";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function MigrationMapSvg() {
  const points = getProjectedHabitats();
  const routes = SPOONBILL_INFO.migrationRoutes;

  return (
    <div className="relative aspect-[2/1] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-sky-50 via-violet-50/50 to-rose-50 ring-1 ring-pink-100">
      <svg viewBox="0 0 100 100" className="h-full w-full" aria-label="서식지 및 이동경로 지도">
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

        {/* 대륙 라벨 */}
        <text x="62" y="42" fontSize="3" fill="#9d174d" opacity="0.5">
          아시아
        </text>
        <text x="48" y="28" fontSize="2.5" fill="#4338ca" opacity="0.5">
          유럽
        </text>
        <text x="12" y="38" fontSize="2.5" fill="#0369a1" opacity="0.5">
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
              ? Math.max(1.2, Math.min(3.5, Math.sqrt(point.count) / 35))
              : 1;
          return (
            <g key={point.id}>
              <circle
                cx={point.x}
                cy={point.y}
                r={radius}
                fill={CONTINENT_COLORS[point.continent]}
                opacity={point.role === "주요서식지" ? 0.85 : 0.6}
                stroke="#fff"
                strokeWidth="0.3"
              />
              {point.count >= 200 && (
                <text
                  x={point.x}
                  y={point.y - radius - 0.8}
                  textAnchor="middle"
                  fontSize="2"
                  fill="#831843"
                >
                  {point.name}
                </text>
              )}
            </g>
          );
        })}
      </svg>

      <div className="absolute bottom-2 left-2 flex flex-wrap gap-1.5">
        {continentLabels.map((c) => (
          <span
            key={c}
            className="rounded-full px-2 py-0.5 text-[10px] font-medium text-white shadow-sm"
            style={{ backgroundColor: CONTINENT_COLORS[c] }}
          >
            {c}
          </span>
        ))}
        <span className="rounded-full bg-pink-300/80 px-2 py-0.5 text-[10px] text-rose-900">
          ─ 정기 이동
        </span>
        <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] text-slate-600">
          ┄ 드문 기록
        </span>
      </div>
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
      primaryLabel: "주요 서식",
      vagrantLabel: "드문 관찰",
    };
  });

  const routeList = SPOONBILL_INFO.migrationRoutes;

  return (
    <div className="space-y-6">
      <div>
        <h4 className="mb-3 text-sm font-semibold text-violet-700">
          🗺️ 현재 서식지 & 이동경로 (전 세계)
        </h4>
        <MigrationMapSvg />
        <p className="mt-2 text-xs leading-relaxed text-violet-500/90">
          {SPOONBILL_INFO.globalNote}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-violet-100 bg-white/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">대륙별 개체수 (주요 vs 드문 관찰)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={byContinent}>
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis dataKey="continent" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="primary"
                  name="주요 서식"
                  stackId="a"
                  fill="#f472b6"
                  radius={[0, 0, 0, 0]}
                />
                <Bar
                  dataKey="vagrant"
                  name="드문 관찰(건수)"
                  stackId="a"
                  fill="#c4b5fd"
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="border-sky-100 bg-white/60">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">서식지 좌표 분포 (Scatter)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <ScatterChart margin={{ top: 8, right: 8, bottom: 8, left: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis
                  type="number"
                  dataKey="x"
                  name="경도(투영)"
                  domain={[0, 100]}
                  tick={{ fontSize: 9 }}
                />
                <YAxis
                  type="number"
                  dataKey="y"
                  name="위도(투영)"
                  domain={[0, 100]}
                  tick={{ fontSize: 9 }}
                />
                <ZAxis type="number" dataKey="z" range={[40, 400]} />
                <Tooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  formatter={(value, name) => [value, name === "z" ? "규모" : name]}
                  labelFormatter={(_, payload) =>
                    payload?.[0]?.payload?.name ?? ""
                  }
                />
                <Scatter data={scatterData} fill="#f472b6">
                  {scatterData.map((entry) => (
                    <Cell
                      key={entry.id}
                      fill={CONTINENT_COLORS[entry.continent]}
                    />
                  ))}
                </Scatter>
              </ScatterChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="border-rose-100 bg-white/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">주요 이동경로 목록</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-2 sm:grid-cols-2">
            {routeList.map((route) => (
              <li
                key={route.id}
                className="rounded-xl border border-pink-50 bg-pink-50/30 px-3 py-2 text-sm"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    variant={route.routeType === "정기이동" ? "love" : "default"}
                  >
                    {route.routeType === "정기이동" ? "정기" : "드묾"}
                  </Badge>
                  <span className="font-medium text-rose-900">{route.label}</span>
                </div>
                <p className="mt-1 text-xs text-violet-500">
                  {route.from.name} → {route.to.name} · {route.seasonLabel}
                </p>
                {route.description && (
                  <p className="mt-0.5 text-[11px] text-rose-600/70">
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
