import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  InlineSiteLinks,
  SiteHoverPanel,
  SiteListItem,
} from "@/components/dashboard/site-hover-card";
import { stripHtml, truncate } from "@/lib/utils/format";
import { enrichBirdSite, enrichWetlandSpot } from "@/lib/utils/site-links";
import type { BirdSite, WetlandSpot } from "@/types/dashboard";

export function BirdSiteList({ sites }: { sites: BirdSite[] }) {
  const enriched = sites.map(enrichBirdSite);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>철새 도래지 목록</CardTitle>
        <p className="text-xs text-text-tertiary">
          마우스를 올리면 요약과 링크를 확인할 수 있습니다
        </p>
      </CardHeader>
      <CardContent className="overflow-visible">
        {enriched.length === 0 ? (
          <EmptyState message="선택한 지역에 등록된 철새 도래지가 없습니다" />
        ) : (
          <ul className="space-y-2">
            {enriched.map((site) => (
              <SiteListItem
                key={site.id}
                hoverPanel={
                  <SiteHoverPanel
                    summary={site.summary ?? site.title}
                    highlights={site.highlights}
                    homepageUrl={site.homepageUrl}
                    mapUrl={site.mapUrl}
                    tel={site.tel}
                    homepageLabel={
                      site.source === "tour"
                        ? "대한민국 구석구석"
                        : "상세·공식 정보"
                    }
                  />
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text">{site.title}</p>
                    <p className="mt-0.5 text-xs text-text-tertiary">{site.address}</p>
                  </div>
                  <Badge variant={site.source === "mock" ? "warning" : "success"}>
                    {site.source === "mock" ? "샘플" : "Live"}
                  </Badge>
                </div>
                {site.overview && (
                  <p className="mt-2 text-sm text-text-secondary">
                    {truncate(stripHtml(site.overview), 80)}
                  </p>
                )}
                <InlineSiteLinks
                  homepageUrl={site.homepageUrl}
                  mapUrl={site.mapUrl}
                />
              </SiteListItem>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

export function WetlandList({ spots }: { spots: WetlandSpot[] }) {
  const enriched = spots.map(enrichWetlandSpot);

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>습지·수변 명소</CardTitle>
        <p className="text-xs text-text-tertiary">
          마우스를 올리면 요약과 링크를 확인할 수 있습니다
        </p>
      </CardHeader>
      <CardContent className="overflow-visible">
        {enriched.length === 0 ? (
          <EmptyState message="습지·수변 명소 데이터가 없습니다" />
        ) : (
          <ul className="space-y-2">
            {enriched.map((spot) => (
              <SiteListItem
                key={spot.id}
                hoverPanel={
                  <SiteHoverPanel
                    summary={spot.summary ?? spot.title}
                    highlights={spot.highlights}
                    homepageUrl={spot.homepageUrl}
                    mapUrl={spot.mapUrl}
                    homepageLabel="관련 정보·홈페이지"
                  />
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-text">{spot.title}</p>
                    <p className="mt-0.5 text-xs text-text-tertiary">{spot.address}</p>
                  </div>
                  <Badge variant={spot.source === "mock" ? "warning" : "info"}>
                    {spot.source === "mock" ? "샘플" : "Live"}
                  </Badge>
                </div>
                {spot.description && (
                  <p className="mt-2 text-sm text-text-secondary">
                    {truncate(spot.description, 80)}
                  </p>
                )}
                <InlineSiteLinks
                  homepageUrl={spot.homepageUrl}
                  mapUrl={spot.mapUrl}
                />
              </SiteListItem>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-bg px-4 py-10 text-center">
      <p className="text-sm text-text-secondary">{message}</p>
    </div>
  );
}
