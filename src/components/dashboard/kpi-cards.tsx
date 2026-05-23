import { Bird, Droplets, MapPin, Sparkles, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSummary } from "@/types/dashboard";

const items = [
  {
    key: "birdSiteCount",
    label: "철새 도래지",
    icon: MapPin,
    suffix: "곳",
    iconClass: "text-sky-600",
    bgClass: "bg-sky-50",
  },
  {
    key: "wetlandCount",
    label: "습지·수변 명소",
    icon: Droplets,
    suffix: "곳",
    iconClass: "text-emerald-600",
    bgClass: "bg-emerald-50",
  },
  {
    key: "recommendationScore",
    label: "관측 추천지수",
    icon: Sparkles,
    suffix: "점",
    iconClass: "text-violet-600",
    bgClass: "bg-violet-50",
  },
  {
    key: "speciesCount",
    label: "관측 가능 종수",
    icon: Bird,
    suffix: "종",
    iconClass: "text-amber-600",
    bgClass: "bg-amber-50",
  },
] as const;

export function KpiCards({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const value = summary[item.key];

        return (
          <Card key={item.key}>
            <CardContent className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500">{item.label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {value}
                  <span className="ml-1 text-base font-medium text-slate-400">
                    {item.suffix}
                  </span>
                </p>
              </div>
              <div className={`rounded-xl p-3 ${item.bgClass}`}>
                <Icon className={`h-5 w-5 ${item.iconClass}`} />
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export function WeatherMiniCard({
  city,
  tempMin,
  tempMax,
  description,
}: {
  city: string;
  tempMin: number;
  tempMax: number;
  description: string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3">
        <div className="rounded-xl bg-orange-50 p-2">
          <Thermometer className="h-4 w-4 text-orange-600" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-900">{city}</p>
          <p className="text-xs text-slate-500">
            {tempMin}° ~ {tempMax}° · {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
