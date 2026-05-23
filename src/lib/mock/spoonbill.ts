import type {
  ProjectedPoint,
  SpoonbillInfo,
  SpoonbillMigrationRoute,
} from "@/types/spoonbill";

/** 댕기머리물떼새(Platalea minor) — IUCN·국제 센서스·이류 기록 기반 교육용 데이터 */
export const SPOONBILL_INFO: SpoonbillInfo = {
  koreanName: "댕기머리물떼새",
  englishName: "Black-faced Spoonbill",
  scientificName: "Platalea minor",
  conservationStatus: "세계자연보전연맹(IUCN) · 멸종위기(EN)",
  totalPopulation: 7066,
  censusYear: "2024",
  censusNote:
    "동아시아·동남아 33개 지역 동시 조사 기준. 유럽·북미 수치는 정착 개체군이 아닌 드문 관찰 기록을 의미합니다.",
  description:
    "흰 깃과 검은 얼굴, 넓적한 부리가 특징인 물새예요. 번식지는 주로 한반도·중국 동북부 해안이고, 겨울에는 대만·홍콩·베트남·일본 등 아시아 습지로 이동해요.",
  globalNote:
    "댕기머리물떼새는 동아시아-대양주 이동 경로(Flyway)의 대표 종이에요. 세계 개체의 99% 이상이 아시아에 있지만, 바람·이류 등으로 유럽(영국·네덜란드·프랑스)과 북미(알래스카·캐나다·미국 서부)에서도 가끔 관찰돼요. 이는 ‘여행 왔다가 돌아가는’ 드문 기록이지, 유럽·미국에 큰 서식군이 있는 것은 아니에요.",
  habitats: [
    {
      id: "h1",
      region: "대만",
      country: "Taiwan",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "치구·증문 하구 등 서부 습지",
      season: "월동",
      estimatedCount: 4231,
      lat: 23.1,
      lon: 120.1,
      note: "세계 최대 월동지 · 전체의 약 60%",
    },
    {
      id: "h2",
      region: "중국",
      country: "China",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "랴오닝·대련, 푸젠·하이난 연안",
      season: "번식",
      estimatedCount: 980,
      lat: 38.9,
      lon: 121.6,
      note: "번식지·월동지 혼재",
    },
    {
      id: "h3",
      region: "대한민국",
      country: "Korea",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "서해5도·강화·연평, 고흥·신안 갯벌",
      season: "번식",
      estimatedCount: 850,
      lat: 35.8,
      lon: 126.3,
      note: "국내 유일 번식종 · 세계의 약 12%",
    },
    {
      id: "h4",
      region: "홍콩",
      country: "Hong Kong",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "Deep Bay · 마이포 습지",
      season: "월동",
      estimatedCount: 422,
      lat: 22.5,
      lon: 114.0,
    },
    {
      id: "h5",
      region: "베트남",
      country: "Vietnam",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "Red River·Mekong Delta",
      season: "월동",
      estimatedCount: 380,
      lat: 20.5,
      lon: 106.5,
    },
    {
      id: "h6",
      region: "일본",
      country: "Japan",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "큐슈·오키나와·아리아케해",
      season: "월동",
      estimatedCount: 210,
      lat: 32.5,
      lon: 130.5,
    },
    {
      id: "h7",
      region: "필리핀",
      country: "Philippines",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "Palawan·Cebu 연안",
      season: "월동",
      estimatedCount: 45,
      lat: 10.0,
      lon: 118.5,
    },
    {
      id: "h8",
      region: "태국",
      country: "Thailand",
      continent: "아시아",
      role: "주요서식지",
      habitatName: "태국만 연안 습지",
      season: "이동",
      estimatedCount: 48,
      lat: 7.5,
      lon: 100.0,
      note: "이동·소규모 월동",
    },
    {
      id: "e1",
      region: "영국",
      country: "UK",
      continent: "유럽",
      role: "드문관찰",
      habitatName: "잉글랜드·스코틀랜드 연안 (이류 기록)",
      season: "이동",
      estimatedCount: 3,
      lat: 53.5,
      lon: -2.5,
      note: "1960년대 이후 수 차례 관찰 · 정착군 없음",
    },
    {
      id: "e2",
      region: "네덜란드",
      country: "Netherlands",
      continent: "유럽",
      role: "드문관찰",
      habitatName: "북해 연안·Wadden Sea 인근",
      season: "이동",
      estimatedCount: 2,
      lat: 53.0,
      lon: 5.5,
      note: "2000년대 희귀 이류 기록",
    },
    {
      id: "e3",
      region: "프랑스",
      country: "France",
      continent: "유럽",
      role: "드문관찰",
      habitatName: "브르타뉴·지중해 연안",
      season: "이동",
      estimatedCount: 2,
      lat: 47.5,
      lon: -2.0,
      note: "유럽 남부 드문 관찰 사례",
    },
    {
      id: "n1",
      region: "미국",
      country: "USA",
      continent: "북미",
      role: "드문관찰",
      habitatName: "캘리포니아·워싱턴주 연안",
      season: "이동",
      estimatedCount: 4,
      lat: 37.5,
      lon: -122.5,
      note: "태평양 횡단 이류로 추정 · 매우 희귀",
    },
    {
      id: "n2",
      region: "알래스카",
      country: "USA (Alaska)",
      continent: "북미",
      role: "드문관찰",
      habitatName: "Aleutian· Alaska Peninsula",
      season: "이동",
      estimatedCount: 2,
      lat: 57.0,
      lon: -153.0,
      note: "북미 최북단 관찰 기록",
    },
    {
      id: "n3",
      region: "캐나다",
      country: "Canada",
      continent: "북미",
      role: "드문관찰",
      habitatName: "브리티시컬럼비아 연안",
      season: "이동",
      estimatedCount: 1,
      lat: 49.2,
      lon: -123.1,
      note: "서식지가 아닌 단발성 관찰",
    },
  ],
  migrationRoutes: [
    {
      id: "r1",
      label: "한국 번식 → 대만 월동",
      from: { name: "전라 서해안", lat: 35.8, lon: 126.3 },
      to: { name: "대만 서부", lat: 23.1, lon: 120.1 },
      routeType: "정기이동",
      seasonLabel: "가을~겨울",
      description: "가장 많은 개체가 이동하는 핵심 경로",
    },
    {
      id: "r2",
      label: "중국 번식 → 홍콩·베트남",
      from: { name: "랴오닝·대련", lat: 38.9, lon: 121.6 },
      to: { name: "홍콩 Deep Bay", lat: 22.5, lon: 114.0 },
      routeType: "정기이동",
      seasonLabel: "겨울",
    },
    {
      id: "r3",
      label: "서해안 → 일본 큐슈",
      from: { name: "한국·중국 서해", lat: 36.0, lon: 125.0 },
      to: { name: "일본 큐슈", lat: 32.5, lon: 130.5 },
      routeType: "정기이동",
      seasonLabel: "겨울",
    },
    {
      id: "r4",
      label: "동남아 연안 이동",
      from: { name: "베트남", lat: 20.5, lon: 106.5 },
      to: { name: "태국·필리핀", lat: 10.0, lon: 100.0 },
      routeType: "정기이동",
      seasonLabel: "겨울~봄",
    },
    {
      id: "r5",
      label: "아시아 → 유럽 (이류)",
      from: { name: "동아시아 습지", lat: 35.0, lon: 125.0 },
      to: { name: "서유럽 연안", lat: 53.0, lon: 5.0 },
      routeType: "드문기록",
      seasonLabel: "불규칙",
      description: "바람·기상 이상 시 드물게 기록",
    },
    {
      id: "r6",
      label: "아시아 → 북미 서부 (이류)",
      from: { name: "동아시아", lat: 38.0, lon: 122.0 },
      to: { name: "미국 서부", lat: 37.5, lon: -122.5 },
      routeType: "드문기록",
      seasonLabel: "매우 드묾",
      description: "태평양 횡단 가능성 · 정착 없음",
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
