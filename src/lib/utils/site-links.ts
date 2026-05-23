import type { BirdSite, WetlandSpot } from "@/types/dashboard";
import { stripHtml, truncate } from "@/lib/utils/format";
/** 한국관광공사 TourAPI 상세 페이지 */
export function getTourDetailUrl(contentId: string) {
  return `https://korean.visitkorea.or.kr/detail/ms_detail.do?contentId=${contentId}`;
}

/** 주소·좌표 기반 지도 검색 링크 */
export function getMapSearchUrl(label: string, address: string) {
  const query = encodeURIComponent(`${label} ${address}`.trim());
  return `https://www.google.com/maps/search/?api=1&query=${query}`;
}

export function enrichBirdSite(site: BirdSite): BirdSite {
  const overview = stripHtml(site.overview);
  const highlights = extractHighlights(overview, site.title);

  return {
    ...site,
    homepageUrl:
      site.homepageUrl ??
      (site.source === "tour" ? getTourDetailUrl(site.id) : undefined),
    mapUrl: site.mapUrl ?? getMapSearchUrl(site.title, site.address),
    summary:
      site.summary ??
      truncate(overview || `${site.title} 철새 도래·관측 지역`, 100),
    highlights: site.highlights ?? highlights,
  };
}

export function enrichWetlandSpot(spot: WetlandSpot): WetlandSpot {
  return {
    ...spot,
    homepageUrl: spot.homepageUrl,
    mapUrl: spot.mapUrl ?? getMapSearchUrl(spot.title, spot.address),
    summary:
      spot.summary ??
      truncate(spot.description || `${spot.title} 습지·수변 명소`, 100),
    highlights:
      spot.highlights ??
      [
        spot.regionName ? `권역: ${spot.regionName}` : "",
        spot.description ? truncate(spot.description, 50) : "",
        "철새·물새 서식 가능 습지/수변 지역",
      ].filter(Boolean),
  };
}

function extractHighlights(overview: string, title: string): string[] {
  const items: string[] = [];
  if (overview.includes("300종") || overview.includes("종"))
    items.push("다양한 철새 종 기록");
  if (/습지|갯벌|하구|호수|저수지/.test(overview))
    items.push("습지·갯벌·수변 서식지");
  if (/겨울|봄|가을|철새/.test(overview))
    items.push("계절별 철새 도래");
  if (/흑두루미|고니|물새|멸종/.test(overview))
    items.push("희귀·보호종 관측 가능");

  if (items.length === 0) {
    items.push(`${title} 대표 도래·관측지`);
    items.push("대한민국 철새 이동 경로(Flyway) 연계");
  }

  return items.slice(0, 4);
}
