import { Bird, Droplets, MapPin, Sparkles, Thermometer } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { DashboardSummary } from "@/types/dashboard";

const items = [
  {
    key: "birdSiteCount",
    label: "철새 도래지",
    icon: MapPin,
    suffix: "곳",
    iconClass: "text-brand",
    bgClass: "bg-brand-soft",
  },
  {
    key: "wetlandCount",
    label: "습지·수변 명소",
    icon: Droplets,
    suffix: "곳",
    iconClass: "text-[#06B6D4]",
    bgClass: "bg-[#E0F7FA]",
  },
  {
    key: "recommendationScore",
    label: "관측 추천지수",
    icon: Sparkles,
    suffix: "점",
    iconClass: "text-accent",
    bgClass: "bg-accent-soft",
  },
  {
    key: "speciesCount",
    label: "관측 가능 종수",
    icon: Bird,
    suffix: "종",
    iconClass: "text-success",
    bgClass: "bg-success-soft",
  },
] as const;

export function KpiCards({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {items.map((item) => {
        const Icon = item.icon;
        const value = summary[item.key];

        return (
          <Card key={item.key} className="transition hover:border-brand/30">
            <CardContent className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-text-secondary">{item.label}</p>
                <p className="mt-1 text-2xl font-bold tracking-tight text-text">
                  {value}
                  <span className="ml-1 text-base font-medium text-text-tertiary">
                    {item.suffix}
                  </span>
                </p>
              </div>
              <div className={`rounded-xl p-2.5 ${item.bgClass}`}>
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
    <Card className="transition hover:border-brand/30">
      <CardContent className="flex items-center gap-3">
        <div className="rounded-xl bg-brand-soft p-2.5">
          <Thermometer className="h-4 w-4 text-brand" />
        </div>
        <div>
          <p className="font-semibold text-text">{city}</p>
          <p className="text-xs text-text-secondary">
            {tempMin}° ~ {tempMax}° · {description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
