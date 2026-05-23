"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/card";
import { truncate } from "@/lib/utils/format";
import type { RegionalData } from "@/types/regional";

export function RegionalInsightsSection({ data }: { data: RegionalData }) {
  const gumiChart = data.gumiWetlandTrend.map((row) => ({
    period: (row.관측시기 ?? "").replace("월~", "~").slice(0, 14),
    total: Number(row.합계 ?? 0),
  }));

  return (
    <section className="space-y-6">
      <SectionTitle>📚 공공데이터 · CSV 기반 지역 인사이트</SectionTitle>
      <div className="flex flex-wrap gap-2">
        <Badge variant={data.isMock ? "warning" : "info"}>
          {data.isMock ? "샘플 데이터" : "Live odcloud API"}
        </Badge>
        <Badge variant="soft">제주 도래지 · 구미 습지 · 전북 습지 · 국내 조류분포</Badge>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>🏝️ 제주 철새 도래지</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {data.jejuSites.map((site, index) => (
              <div
                key={`${site.도래지명}-${index}`}
                className="rounded-2xl border border-teal-50 bg-white/60 p-4"
              >
                <p className="font-medium text-rose-900">
                  {site.도래지명}{" "}
                  <span className="text-xs text-violet-400">
                    {site.시군구명}
                  </span>
                </p>
                <p className="mt-1 text-xs text-violet-500">{site.장소}</p>
                <p className="mt-2 text-sm text-rose-800/70">
                  🐦 {site.도래철새?.replace(/\./g, " · ")}
                </p>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>🌿 구미 습지 철새 합계 추이</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={240}>
              <BarChart data={gumiChart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                <XAxis
                  dataKey="period"
                  tick={{ fontSize: 9, fill: "#065f46" }}
                  interval={0}
                  angle={-20}
                  textAnchor="end"
                  height={60}
                />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="total" name="합계(마리)" fill="#5eead4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>💧 습지·철새 보호 지역 (전북·전국)</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="max-h-64 space-y-2 overflow-y-auto">
              {data.jeonbukWetlands.slice(0, 10).map((wetland, index) => (
                <li
                  key={`${wetland.지역명}-${index}`}
                  className="rounded-xl border border-violet-50 bg-violet-50/30 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-rose-900">
                    {wetland.지역명}
                  </span>
                  <span className="ml-2 text-xs text-violet-500">
                    {wetland.면적} km² · {wetland["지정일자(람사르등록)"]}
                  </span>
                  <p className="text-xs text-rose-700/70">
                    {truncate(wetland["특 징"] ?? "", 60)}
                  </p>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>📖 국내 조류분포 하이라이트</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {data.birdDistributionHighlights.slice(0, 8).map((bird, index) => (
                <li
                  key={`${bird["국명(원병오2000)"]}-${index}`}
                  className="flex items-center justify-between rounded-xl border border-pink-50 px-3 py-2"
                >
                  <div>
                    <p className="text-sm font-medium text-rose-900">
                      {bird["국명(원병오2000)"]}
                      {bird["보호종 여부"] === "Y" && (
                        <Badge variant="soft" className="ml-2">
                          보호종
                        </Badge>
                      )}
                    </p>
                    <p className="text-xs text-violet-400">
                      {bird.조사지역} · {bird.행정구역}
                    </p>
                  </div>
                  <span className="font-display text-lg font-bold text-pink-500">
                    {bird.관찰개체수}마리
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
