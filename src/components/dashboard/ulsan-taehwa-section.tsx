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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SectionTitle } from "@/components/ui/card";
import type { UlsanBirdData } from "@/types/regional";

export function UlsanTaehwaSection({ data }: { data: UlsanBirdData }) {
  return (
    <section>
      <SectionTitle>🌊 울산 태화강 철새 출현 (공공 API)</SectionTitle>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="border-sky-100 bg-gradient-to-br from-sky-50/80 to-white/80">
          <CardHeader>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <CardTitle>태화강하구 월별 관측</CardTitle>
              <Badge variant={data.isMock ? "warning" : "success"}>
                {data.isMock ? "샘플" : "울산철새 API"}
              </Badge>
            </div>
            <p className="text-sm text-violet-500/80">
              최근 관측월{" "}
              <span className="font-semibold text-sky-600">
                {data.taehwaLatestMonth || "-"}
              </span>
              · 추정{" "}
              <span className="font-display text-xl font-bold text-rose-500">
                {data.taehwaTotalCount.toLocaleString()}마리
              </span>
            </p>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={data.monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0f2fe" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#0369a1" }} />
                <YAxis tick={{ fontSize: 11, fill: "#7c3aed" }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "16px",
                    border: "1px solid #bae6fd",
                    background: "#f0f9ff",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="total"
                  name="관측 개체수"
                  stroke="#38bdf8"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: "#7dd3fc" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>태화강 상위 종 ({data.taehwaLatestMonth})</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={data.taehwaTopSpecies} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#fce7f3" />
                <XAxis type="number" tick={{ fontSize: 11 }} />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={88}
                  tick={{ fontSize: 10, fill: "#9d174d" }}
                />
                <Tooltip />
                <Bar dataKey="count" fill="#f472b6" radius={[0, 8, 8, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {data.spoonbillMaster && (
        <Card className="mt-4 overflow-hidden border-rose-200">
          <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-start">
            {data.spoonbillMaster.picture1 && (
              <div className="relative h-36 w-full shrink-0 overflow-hidden rounded-2xl sm:w-48">
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
              <Badge variant="love" className="mb-2">
                울산 관측 종 마스터
              </Badge>
              <h4 className="font-display text-lg font-bold text-rose-800">
                {data.spoonbillMaster.species_name}{" "}
                <span className="text-sm font-normal text-violet-500">
                  ({data.spoonbillMaster.science_name})
                </span>
              </h4>
              <p className="mt-1 text-xs text-violet-400">
                {data.spoonbillMaster.species_name_eng}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-rose-800/75">
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
