import { Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegionScore } from "@/types/dashboard";

const rankColors = ["bg-amber-100 text-amber-800", "bg-slate-100 text-slate-700", "bg-orange-100 text-orange-800"];

export function TopRegions({ regions }: { regions: RegionScore[] }) {
  if (regions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>추천 지역 TOP3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-slate-500">표시할 추천 지역이 없습니다.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {regions.slice(0, 3).map((region, index) => (
        <Card key={region.regionCode} className="relative overflow-hidden">
          <div className="absolute right-0 top-0 h-24 w-24 translate-x-8 -translate-y-8 rounded-full bg-sky-50" />
          <CardHeader>
            <div className="flex items-center justify-between">
              <Badge className={rankColors[index]}>TOP {index + 1}</Badge>
              <Trophy className="h-4 w-4 text-slate-400" />
            </div>
            <CardTitle className="mt-3">{region.regionName}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold text-slate-900">{region.score}점</p>
            <div className="mt-3 space-y-1 text-xs text-slate-500">
              <p>도래지 {region.siteCount}곳 · 습지 {region.wetlandCount}곳</p>
              <p>관측 종 {region.speciesCount}종 · 날씨 {region.weatherScore}/30</p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
