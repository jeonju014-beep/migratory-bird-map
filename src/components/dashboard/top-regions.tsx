import { Crown, Star, Trophy } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { RegionScore } from "@/types/dashboard";

const rankStyles = [
  {
    badge: "bg-gradient-to-r from-amber-200 to-yellow-200 text-amber-800",
    glow: "from-amber-100/80 to-yellow-50/80",
    icon: Crown,
  },
  {
    badge: "bg-gradient-to-r from-pink-200 to-rose-200 text-rose-800",
    glow: "from-pink-100/80 to-rose-50/80",
    icon: Trophy,
  },
  {
    badge: "bg-gradient-to-r from-violet-200 to-purple-200 text-violet-800",
    glow: "from-violet-100/80 to-purple-50/80",
    icon: Star,
  },
];

export function TopRegions({ regions }: { regions: RegionScore[] }) {
  if (regions.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>추천 지역 TOP3</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-violet-500">표시할 추천 지역이 없어요 🥺</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-3">
      {regions.slice(0, 3).map((region, index) => {
        const style = rankStyles[index];
        const Icon = style.icon;

        return (
          <Card
            key={region.regionCode}
            className={`relative overflow-hidden bg-gradient-to-br ${style.glow} transition hover:scale-[1.02] hover:shadow-lg hover:shadow-pink-100/50`}
          >
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-white/40" />
            <CardHeader>
              <div className="flex items-center justify-between">
                <Badge className={style.badge}>TOP {index + 1}</Badge>
                <Icon className="h-5 w-5 text-pink-400" />
              </div>
              <CardTitle className="mt-3 text-xl">{region.regionName}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="font-display text-3xl font-bold text-rose-600">
                {region.score}
                <span className="text-lg text-pink-400">점</span>
              </p>
              <div className="mt-3 space-y-1 text-xs text-violet-600/70">
                <p>🌿 도래지 {region.siteCount}곳 · 습지 {region.wetlandCount}곳</p>
                <p>🐦 관측 종 {region.speciesCount}종 · 날씨 {region.weatherScore}/30</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
