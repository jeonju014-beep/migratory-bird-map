"use client";

import Image from "next/image";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { BirdNameHover } from "@/components/ui/bird-name-hover";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";import { SectionTitle } from "@/components/ui/card";
import {
  chartGridStroke,
  chartTooltipStyle,
  colors,
} from "@/lib/design/tokens";
import type { UlsanBirdData } from "@/types/regional";

export function UlsanTaehwaSection({ data }: { data: UlsanBirdData }) {  return (
    <section>
      <SectionTitle>울산 태화강 철새 출현</SectionTitle>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>태화강하구 월별 관측</CardTitle>
              <Badge variant={data.isMock ? "warning" : "success"}>
                {data.isMock ? "샘플" : "울산철새 API"}
              </Badge>
            </div>
            <p className="text-sm text-text-secondary">
              최근 관측월{" "}
              <span className="font-semibold text-brand">
                {data.taehwaLatestMonth || "-"}
              </span>
              · 추정{" "}
              <span className="text-xl font-bold text-text">
                {data.taehwaTotalCount.toLocaleString()}마리
              </span>
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: colors.textSecondary }} />
                <YAxis tick={{ fontSize: 11, fill: colors.textSecondary }} />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="관측 개체수"
                  stroke={colors.brand}
                  strokeWidth={2}
                  dot={{ r: 3, fill: colors.brandSoft }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>태화강 상위 종 ({data.taehwaLatestMonth})</CardTitle>
            <p className="text-xs text-text-tertiary">
              종 이름에 마우스를 올리면 사진·설명을 볼 수 있어요
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.taehwaTopSpecies} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tick={{ fontSize: 10, fill: colors.textSecondary }}
                />
                <Tooltip contentStyle={chartTooltipStyle} />
                <Bar dataKey="count" fill={colors.brand} radius={[0, 6, 6, 0]} />
              </BarChart>
            </ResponsiveContainer>
            <ul className="mt-3 space-y-1 border-t border-border pt-3">
              {data.taehwaTopSpecies.map((species) => (
                <li
                  key={species.name}
                  className="flex items-center justify-between gap-2 text-xs"
                >
                  <BirdNameHover name={species.name} variant="list" />
                  <span className="shrink-0 font-semibold text-brand">
                    {species.count.toLocaleString()}마리
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      {data.spoonbillMaster && (
        <Card className="mt-4 overflow-hidden">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            {data.spoonbillMaster.picture1 && (
              <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-xl sm:w-48">
                <Image
                  src={data.spoonbillMaster.picture1}
                  alt={data.spoonbillMaster.species_name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}
            <div>
              <Badge variant="accent" className="mb-2">
                울산 관측 종 마스터
              </Badge>
              <h4 className="text-lg font-bold text-text">
                <BirdNameHover name={data.spoonbillMaster.species_name} variant="list" />{" "}
                <span className="text-sm font-normal text-text-secondary">
                  ({data.spoonbillMaster.science_name})
                </span>
              </h4>
              <p className="mt-1 text-xs text-text-tertiary">
                {data.spoonbillMaster.species_name_eng}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                서식지: {data.spoonbillMaster.habitat} · 번식지:{" "}
                {data.spoonbillMaster.breedingplace}
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </section>
  );
}
