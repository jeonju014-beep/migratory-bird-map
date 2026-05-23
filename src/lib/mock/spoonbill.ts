import type {
  ProjectedPoint,
  SpoonbillInfo,
  SpoonbillMigrationRoute,
} from "@/types/spoonbill";

/** 댕기머리물떼새(Northern Lapwing · Vanellus vanellus) — IUCN·BirdLife 교육용 데이터 */
export const SPOONBILL_INFO: SpoonbillInfo = {
  koreanName: "댕기머리물떼새",
  englishName: "Northern Lapwing",
  scientificName: "Vanellus vanellus",
  conservationStatus: "IUCN 관심대상(LC) · 국내 철새·월동새",
  totalPopulation: 8_400_000,
  censusYear: "2024",
  censusNote:
    "BirdLife International 추정 기준. 유럽 번식 개체 약 420만 쌍(840만 마리 수준), 동아시아로 이동하는 동부 개체군은 한국·일본·중국 연안에서 겨울을 보냅니다.",
  description:
    "검은 목·가슴, 흰 배, 번식기 긴 깃(댕기)과 초록빛 머리가 특징인 물떼새예요. 유럽·서아시아에서 번식하고, 한국에서는 가을~봄 논·갯벌·하구에서 철새·월동새로 흔히 볼 수 있어요. ‘삐-익’ 소리를 내며 넓은 날개로 요란하게 날아요.",
  globalNote:
    "유럽·서아시아가 주요 번식지이며, 동부 개체는 시베리아를 거쳐 동아시아 연안으로 이동합니다. 한국·일본·중국 해안 습지가 겨울 철새의 중요한 휴식·먹이터예요.",
  habitats: [
    {
      id: "h1",
      region: "서유럽",
      country: "Netherlands · UK · France",
      continent: "유럽",
      role: "주요서식지",
      habitatName: "초지·농경지·습지(번식)",
      season: "번식",
      estimatedCount: 2_500_000,
      lat: 52.0,
      lon: 5.0,
      note: "유럽 서부 최대 번식지",
    },
    {
      id: "h2",
      region: "북유럽·발트",
      country: "Scandinavia · Baltic",
      continent: "유럽",
      role: "주요서식지",
      habitatName: "습지·목초지(번식·월동)",
      season: "번식",
      estimatedCount: 1_200_000,
      lat: 59.0,
      lon: 18.0,
    },
    {
      id: "h3",
      region: "러시아·서시베리아",
      country: "Russia",
      continent: "유럽",
      role: "주요서식지",
      habitatName: "타이가·초원 습지(번식)",
      season: "번식",
      estimatedCount: 1_800_000,
      lat: 56.0,
      lon: 60.0,
      note: "동아시아로 이동하는 동부 개체군",
    },
    {
      id: "h4",
      region: "대한민국",
      country: "Korea",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "서·남해안 갯벌, 하구·논",
      season: "월동",
      estimatedCount: 15_000,
      lat: 35.5,
      lon: 129.3,
      note: "가을~봄 철새·월동 · 태화강하구 등",
    },
    {
      id: "h5",
      region: "일본",
      country: "Japan",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "큐슈·간토·홋카이도 연안·논",
      season: "월동",
      estimatedCount: 25_000,
      lat: 35.0,
      lon: 136.0,
    },
    {
      id: "h6",
      region: "중국",
      country: "China",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "동·남부 연안·강 하구·논",
      season: "월동",
      estimatedCount: 40_000,
      lat: 31.0,
      lon: 121.5,
    },
    {
      id: "h7",
      region: "중동·인도",
      country: "Middle East · India",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "습지·농경지(월동)",
      season: "월동",
      estimatedCount: 80_000,
      lat: 28.0,
      lon: 77.0,
      note: "서아시아·인도 반도 월동지",
    },
    {
      id: "h8",
      region: "지중해·북아프리카",
      country: "Mediterranean · N. Africa",
      continent: "유럽",
      role: "주요서식지",
      habitatName: "연안 습지·농경지(월동)",
      season: "월동",
      estimatedCount: 200_000,
      lat: 36.0,
      lon: 10.0,
    },
    {
      id: "n1",
      region: "미국·캐나다",
      country: "USA · Canada",
      continent: "북미",
      role: "드문관찰",
      habitatName: "동·서부 연안(이류 기록)",
      season: "이동",
      estimatedCount: 5,
      lat: 45.0,
      lon: -75.0,
      note: "대서양 횡단 이류 · 정착군 없음",
    },
    {
      id: "n2",
      region: "알래스카",
      country: "USA (Alaska)",
      continent: "북미",
      role: "드문관찰",
      habitatName: "Aleutian· Alaska Peninsula",
      season: "이동",
      estimatedCount: 3,
      lat: 57.0,
      lon: -153.0,
      note: "아시아에서 넘어온 드문 기록",
    },
  ],
  migrationRoutes: [
    {
      id: "r1",
      label: "서시베리아 → 한국 월동",
      from: { name: "서시베리아 번식지", lat: 56.0, lon: 70.0 },
      to: { name: "한국 남·동해안", lat: 35.5, lon: 129.3 },
      routeType: "정기이동",
      seasonLabel: "가을~겨울",
      description: "동부 개체군의 대표적인 동아시아 이동 경로",
    },
    {
      id: "r2",
      label: "서시베리아 → 일본",
      from: { name: "러시아 극동", lat: 55.0, lon: 130.0 },
      to: { name: "일본 서부·남부", lat: 35.0, lon: 136.0 },
      routeType: "정기이동",
      seasonLabel: "겨울",
    },
    {
      id: "r3",
      label: "서시베리아 → 중국 연안",
      from: { name: "몽골·만주 북부", lat: 50.0, lon: 115.0 },
      to: { name: "장강·화동 연안", lat: 31.0, lon: 121.5 },
      routeType: "정기이동",
      seasonLabel: "겨울",
    },
    {
      id: "r4",
      label: "유럽 번식 → 지중해·북아프리카",
      from: { name: "서유럽·북유럽", lat: 52.0, lon: 5.0 },
      to: { name: "지중해·북아프리카", lat: 36.0, lon: 10.0 },
      routeType: "정기이동",
      seasonLabel: "겨울",
      description: "서부 개체군의 단·중거리 이동",
    },
    {
      id: "r5",
      label: "서시베리아 → 중동·인도",
      from: { name: "카스피·중앙아시아", lat: 45.0, lon: 55.0 },
      to: { name: "인도·중동", lat: 28.0, lon: 77.0 },
      routeType: "정기이동",
      seasonLabel: "겨울",
    },
    {
      id: "r6",
      label: "유럽·아시아 → 북미 (이류)",
      from: { name: "유럽·동아시아", lat: 55.0, lon: 20.0 },
      to: { name: "북미 동부", lat: 45.0, lon: -75.0 },
      routeType: "드문기록",
      seasonLabel: "매우 드묾",
      description: "바람·기상 이상 시 희귀 관찰",
    },
  ],
};

/** 위도·경도를 SVG 지도 좌표(%)로 변환 — 아시아-태평양+유럽+북미 전역 */
export function projectSpoonbillPoint(lat: number, lon: number) {
  const x = ((lon + 170) / 360) * 100;
  const y = ((62 - lat) / 85) * 100;
  return {
    x: Math.min(98, Math.max(2, x)),
    y: Math.min(96, Math.max(4, y)),
  };
}

export function getProjectedHabitats(): ProjectedPoint[] {
  return SPOONBILL_INFO.habitats.map((h) => {
    const { x, y } = projectSpoonbillPoint(h.lat, h.lon);
    return {
      id: h.id,
      name: h.region,
      habitatName: h.habitatName,
      x,
      y,
      count: h.estimatedCount,
      continent: h.continent,
      role: h.role,
      season: h.season,
    };
  });
}

export function projectRoute(
  route: SpoonbillMigrationRoute,
): { x1: number; y1: number; x2: number; y2: number } {
  const from = projectSpoonbillPoint(route.from.lat, route.from.lon);
  const to = projectSpoonbillPoint(route.to.lat, route.to.lon);
  return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
}

export const CONTINENT_COLORS: Record<
  import("@/types/spoonbill").SpoonbillContinent,
  string
> = {
  아시아: "#f472b6",
  유럽: "#818cf8",
  북미: "#38bdf8",
  기타: "#a3a3a3",
};
