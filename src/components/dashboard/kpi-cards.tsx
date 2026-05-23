import { Bird, Droplets, MapPin, Sparkles, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSummary } from "@/types/dashboard";

const items = [
  {
    key: "birdSiteCount",
    label: "철새 도래지",
    icon: MapPin,
    suffix: "곳",
    iconClass: "text-pink-500",
    bgClass: "bg-pink-100/80",
    cardClass: "hover:border-pink-200",
  },
  {
    key: "wetlandCount",
    label: "습지·수변 명소",
    icon: Droplets,
    suffix: "곳",
    iconClass: "text-teal-500",
    bgClass: "bg-teal-100/80",
    cardClass: "hover:border-teal-200",
  },
  {
    key: "recommendationScore",
    label: "관측 추천지수",
    icon: Sparkles,
    suffix: "점",
    iconClass: "text-violet-500",
    bgClass: "bg-violet-100/80",
    cardClass: "hover:border-violet-200",
  },
  {
    key: "speciesCount",
    label: "관측 가능 종수",
    icon: Bird,
    suffix: "종",
    iconClass: "text-rose-500",
    bgClass: "bg-rose-100/80",
    cardClass: "hover:border-rose-200",
  },
] as const;

export function KpiCards({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const value = summary[item.key];

        return (
          <Card
            key={item.key}
            className={`transition hover:shadow-lg hover:shadow-pink-100/50 ${item.cardClass}`}
          >
            <CardContent className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-violet-500/80">{item.label}</p>
                <p className="font-display mt-2 text-3xl font-bold text-rose-800">
                  {value}
                  <span className="ml-1 text-base font-medium text-pink-300">
                    {item.suffix}
                  </span>
                </p>
              </div>
              <div className={`rounded-2xl p-3 ${item.bgClass}`}>
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
    <Card className="transition hover:border-sky-200 hover:shadow-md hover:shadow-sky-100/40">
      <CardContent className="flex items-center gap-3">
        <div className="rounded-2xl bg-sky-100/80 p-2.5">
          <Thermometer className="h-4 w-4 text-sky-500" />
        </div>
        <div>
          <p className="font-medium text-rose-900">{city}</p>
          <p className="text-xs text-violet-500/80">
            {tempMin}° ~ {tempMax}° · {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
