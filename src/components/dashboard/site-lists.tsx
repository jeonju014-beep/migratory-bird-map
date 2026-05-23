import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { stripHtml, truncate } from "@/lib/utils/format";
import type { BirdSite, WetlandSpot } from "@/types/dashboard";

export function BirdSiteList({ sites }: { sites: BirdSite[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>🗺️ 철새 도래지 목록</CardTitle>
      </CardHeader>
      <CardContent>
        {sites.length === 0 ? (
          <EmptyState message="선택한 지역에 등록된 철새 도래지가 없어요" />
        ) : (
          <ul className="space-y-3">
            {sites.map((site) => (
              <li
                key={site.id}
                className="rounded-2xl border border-pink-50 bg-white/50 p-4 transition hover:border-pink-200 hover:bg-pink-50/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-rose-900">{site.title}</p>
                    <p className="mt-1 text-xs text-violet-400">{site.address}</p>
                  </div>
                  <Badge variant={site.source === "mock" ? "warning" : "success"}>
                    {site.source === "mock" ? "샘플" : "Live"}
                  </Badge>
                </div>
                {site.overview && (
                  <p className="mt-2 text-sm leading-relaxed text-rose-800/70">
                    {truncate(stripHtml(site.overview))}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function WetlandList({ spots }: { spots: WetlandSpot[] }) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>💧 습지·수변 명소</CardTitle>
      </CardHeader>
      <CardContent>
        {spots.length === 0 ? (
          <EmptyState message="습지·수변 명소 데이터가 없어요" />
        ) : (
          <ul className="space-y-3">
            {spots.map((spot) => (
              <li
                key={spot.id}
                className="rounded-2xl border border-teal-50 bg-white/50 p-4 transition hover:border-teal-200 hover:bg-teal-50/40"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-medium text-rose-900">{spot.title}</p>
                    <p className="mt-1 text-xs text-violet-400">{spot.address}</p>
                  </div>
                  <Badge variant={spot.source === "mock" ? "warning" : "info"}>
                    {spot.source === "mock" ? "샘플" : "Live"}
                  </Badge>
                </div>
                {spot.description && (
                  <p className="mt-2 text-sm leading-relaxed text-rose-800/70">
                    {truncate(spot.description)}
                  </p>
                )}
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-dashed border-pink-200 bg-pink-50/30 px-4 py-10 text-center">
      <p className="text-sm text-violet-500">{message} 🌸</p>
    </div>
  );
}
