import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegionScore } from "@/types/dashboard";

const rankStyles = [
  { badge: "bg-accent-soft text-accent", accent: "text-accent" },
  { badge: "bg-brand-soft text-brand", accent: "text-brand" },
  { badge: "bg-success-soft text-success", accent: "text-success" },
];

export function TopRegions({ regions }: { regions: RegionScore[] }) {
  if (regions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>추천 지역 TOP3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-text-secondary">표시할 추천 지역이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-3 md:grid-cols-3">
      {regions.slice(0, 3).map((region, index) => {
        const style = rankStyles[index];

        return (
          <Card
            key={region.regionCode}
            className="transition hover:border-brand/30 hover:shadow-md"
          >
            <CardHeader>
              <Badge className={style.badge}>TOP {index + 1}</Badge>
              <CardTitle className="mt-2 text-lg">{region.regionName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold tracking-tight ${style.accent}`}>
                {region.score}
                <span className="ml-1 text-base font-medium text-text-tertiary">점</span>
              </p>
              <div className="mt-3 space-y-1 text-xs text-text-secondary">
                <p>도래지 {region.siteCount}곳 · 습지 {region.wetlandCount}곳</p>
                <p>관측 종 {region.speciesCount}종 · 날씨 {region.weatherScore}/30</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
