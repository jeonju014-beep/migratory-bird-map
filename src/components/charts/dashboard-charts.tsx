"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SpeciesBalloon, SpeciesLegendItem } from "@/components/charts/species-balloon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  chartGridStroke,
  chartPalette,
  chartTooltipStyle,
  colors,
} from "@/lib/design/tokens";
import { enrichSpeciesCategory } from "@/lib/mock/species-descriptions";
import type { BirdSpeciesCategory, RegionScore } from "@/types/dashboard";
import type { WeatherTrendPoint } from "@/types/weather";

const tickStyle = { fontSize: 11, fill: colors.textSecondary };

export function RegionScoreChart({ data }: { data: RegionScore[] }) {
  const chartData = data.map((item) => ({
    name: item.regionName,
    score: item.score,
  }));

  return (
    <ChartCard title="📊 지역별 철새 관측 추천지수">
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
          <XAxis dataKey="name" tick={tickStyle} />
          <YAxis domain={[0, 100]} tick={tickStyle} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Bar dataKey="score" fill="#f472b6" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function WeatherTrendChart({ data }: { data: WeatherTrendPoint[] }) {
  return (
    <ChartCard title="🌈 5일 기온·강수 추이">
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke={chartGridStroke} />
          <XAxis dataKey="date" tick={tickStyle} />
          <YAxis yAxisId="left" tick={tickStyle} />
          <YAxis yAxisId="right" orientation="right" tick={tickStyle} />
          <Tooltip contentStyle={chartTooltipStyle} />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temp"
            name="평균기온(°C)"
            stroke="#f472b6"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#fbcfe8" }}
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="pop"
            name="강수확률(%)"
            stroke="#c084fc"
            strokeWidth={2.5}
            dot={{ r: 4, fill: "#e9d5ff" }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

export function SpeciesPieChart({ data }: { data: BirdSpeciesCategory[] }) {
  const enriched = data.map(enrichSpeciesCategory);
  const total = enriched.reduce((sum, item) => sum + item.count, 0);

  return (
    <ChartCard title="🐦 철새 종 분포">
      <p className="-mt-2 mb-3 text-xs text-text-tertiary">
        파이 조각이나 아래 종류에 마우스를 올리면 설명 말풍선이 나타나요 ✨
      </p>
      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={enriched}
            dataKey="count"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={85}
            label={({ name, percent }) =>
              `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {enriched.map((entry, index) => (
              <Cell
                key={entry.name}
                fill={entry.color ?? chartPalette[index % chartPalette.length]}
                stroke="#fff"
                strokeWidth={2}
              />
            ))}
          </Pie>
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.[0]?.payload) return null;
              const category = payload[0].payload as BirdSpeciesCategory;
              const percent =
                total > 0 ? Math.round((category.count / total) * 100) : 0;
              return (
                <SpeciesBalloon
                  category={category}
                  countLabel={`${category.count}종 · ${percent}%`}
                  tail="top"
                />
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>

      <ul className="mt-2 space-y-0.5 overflow-visible border-t border-border pt-3">
        {enriched.map((category) => (
          <SpeciesLegendItem
            key={category.name}
            category={category}
            total={total}
          />
        ))}
      </ul>
    </ChartCard>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Card className="h-full overflow-visible">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent className="overflow-visible">{children}</CardContent>
    </Card>
  );
}
