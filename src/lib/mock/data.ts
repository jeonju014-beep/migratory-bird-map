import type {
  BirdSite,
  BirdSpeciesCategory,
  DashboardData,
  RegionScore,
  WetlandSpot,
} from "@/types/dashboard";
import type { WeatherSummary, WeatherTrendPoint } from "@/types/weather";
import { getMockRegionalData, getMockUlsanData } from "@/lib/mock/regional-fallback";
import { REGIONS } from "@/lib/constants";

export const MOCK_BIRD_SITES: BirdSite[] = [
  {
    id: "m1",
    title: "순천만 국가정원·습지",
    address: "전라남도 순천시 순천만길 513-25",
    overview:
      "동아시아-대양주 철새 이동 경로의 핵심 습지. 가을·겨울 철새 300종 이상 기록.",
    source: "mock",
  },
  {
    id: "m2",
    title: "천수만 철새도래지",
    address: "충청남도 서천군 마서면",
    overview: "갯벌과 간석지가 발달한 국제적 중요습지. 흑두루미·고니 등 관측.",
    source: "mock",
  },
  {
    id: "m3",
    title: "강화도 갯벌·하구",
    address: "인천광역시 강화군",
    overview: "서해안 대표 겨울철새 서식지. 멧도요·재갈매기 등 다수 도래.",
    source: "mock",
  },
  {
    id: "m4",
    title: "태화강 하구습지",
    address: "울산광역시 남구",
    overview: "떼까마귀·원앙·물닭 등 겨울철 대규모 군집 관측으로 유명.",
    source: "mock",
  },
  {
    id: "m5",
    title: "경포호·주변 습지",
    address: "강원특별자치도 강릉시",
    overview: "봄·가을 철새 이동 시 물새·맹금류 관측에 적합한 호수 습지.",
    source: "mock",
  },
  {
    id: "m6",
    title: "낙동감 하구 생태공원",
    address: "부산광역시 사하구",
    overview: "하구 습지와 갯벌이 발달한 철새 도래지. 겨울 물새 다수 서식.",
    source: "mock",
  },
];

export const MOCK_WETLAND_SPOTS: WetlandSpot[] = [
  {
    id: "w1",
    title: "금강하구습지",
    address: "전라북도 군산시 옥도면",
    description: "금강 하구의 광활한 간석지·습지. 철새 도래의 대표 거점.",
    regionName: "전북",
    source: "mock",
  },
  {
    id: "w2",
    title: "영산강 하구",
    address: "전라남도 목포시",
    description: "영산강·섬진강 하구 일대 갯벌. 겨울철 물새 서식지.",
    regionName: "전남",
    source: "mock",
  },
  {
    id: "w3",
    title: "한강하구습지",
    address: "경기도 김포시",
    description: "한강 하구의 생태공원과 습지. 도심 근접 철새 관측지.",
    regionName: "경기",
    source: "mock",
  },
  {
    id: "w4",
    title: "섬진강 수변공원",
    address: "전라북도 남원시",
    description: "섬진강 유역 수변 녹지. 봄·가을 이동 철새 관측.",
    regionName: "전북",
    source: "mock",
  },
];

export const MOCK_SPECIES: BirdSpeciesCategory[] = [
  { name: "물새", count: 42, color: "#f9a8d4" },
  { name: "떼새", count: 28, color: "#c4b5fd" },
  { name: "맹금류", count: 15, color: "#fcd34d" },
  { name: "물닭·원앙", count: 22, color: "#5eead4" },
  { name: "기타", count: 18, color: "#fda4af" },
];

export const MOCK_WEATHER: WeatherSummary[] = [
  {
    city: "순천",
    date: "05/23",
    tempMin: 14,
    tempMax: 22,
    description: "맑음",
    icon: "01d",
    pop: 0.1,
    windSpeed: 3.2,
  },
  {
    city: "서천",
    date: "05/23",
    tempMin: 13,
    tempMax: 21,
    description: "구름 조금",
    icon: "02d",
    pop: 0.15,
    windSpeed: 4.1,
  },
  {
    city: "강릉",
    date: "05/23",
    tempMin: 11,
    tempMax: 19,
    description: "흐림",
    icon: "03d",
    pop: 0.35,
    windSpeed: 5.5,
  },
  {
    city: "인천",
    date: "05/23",
    tempMin: 12,
    tempMax: 20,
    description: "맑음",
    icon: "01d",
    pop: 0.05,
    windSpeed: 3.8,
  },
  {
    city: "부산",
    date: "05/23",
    tempMin: 15,
    tempMax: 23,
    description: "맑음",
    icon: "01d",
    pop: 0.08,
    windSpeed: 4.0,
  },
];

export const MOCK_WEATHER_TREND: WeatherTrendPoint[] = [
  { date: "5/23", temp: 18, pop: 10 },
  { date: "5/24", temp: 19, pop: 15 },
  { date: "5/25", temp: 17, pop: 40 },
  { date: "5/26", temp: 16, pop: 55 },
  { date: "5/27", temp: 18, pop: 20 },
];

export const MOCK_REGION_SCORES: RegionScore[] = [
  {
    regionCode: "38",
    regionName: "전남",
    score: 92,
    siteCount: 18,
    wetlandCount: 12,
    speciesCount: 128,
    weatherScore: 27,
    dataCompleteness: 14,
  },
  {
    regionCode: "34",
    regionName: "충남",
    score: 88,
    siteCount: 14,
    wetlandCount: 10,
    speciesCount: 115,
    weatherScore: 26,
    dataCompleteness: 13,
  },
  {
    regionCode: "31",
    regionName: "경기",
    score: 81,
    siteCount: 11,
    wetlandCount: 8,
    speciesCount: 98,
    weatherScore: 24,
    dataCompleteness: 12,
  },
  {
    regionCode: "37",
    regionName: "전북",
    score: 79,
    siteCount: 10,
    wetlandCount: 9,
    speciesCount: 92,
    weatherScore: 23,
    dataCompleteness: 12,
  },
  {
    regionCode: "6",
    regionName: "부산·울산",
    score: 76,
    siteCount: 9,
    wetlandCount: 7,
    speciesCount: 86,
    weatherScore: 22,
    dataCompleteness: 11,
  },
  {
    regionCode: "32",
    regionName: "강원",
    score: 68,
    siteCount: 7,
    wetlandCount: 5,
    speciesCount: 72,
    weatherScore: 20,
    dataCompleteness: 10,
  },
  {
    regionCode: "36",
    regionName: "경남",
    score: 65,
    siteCount: 6,
    wetlandCount: 5,
    speciesCount: 68,
    weatherScore: 19,
    dataCompleteness: 10,
  },
];

export function getMockDashboardData(areaCode = "0"): DashboardData {
  const region = REGIONS.find((r) => r.code === areaCode) ?? REGIONS[0];
  const filteredSites =
    areaCode === "0"
      ? MOCK_BIRD_SITES
      : MOCK_BIRD_SITES.filter((site) =>
          site.address.includes(region.name.replace("·울산", "")),
        );
  const filteredWetlands =
    areaCode === "0"
      ? MOCK_WETLAND_SPOTS
      : MOCK_WETLAND_SPOTS.filter((spot) =>
          spot.regionName.includes(region.name.replace("·울산", "")),
        );

  const sites = filteredSites.length > 0 ? filteredSites : MOCK_BIRD_SITES.slice(0, 3);
  const wetlands =
    filteredWetlands.length > 0 ? filteredWetlands : MOCK_WETLAND_SPOTS.slice(0, 2);

  const regionScore =
    MOCK_REGION_SCORES.find((r) => r.regionCode === areaCode) ??
    MOCK_REGION_SCORES[0];

  return {
    region,
    summary: {
      birdSiteCount: sites.length,
      wetlandCount: wetlands.length,
      recommendationScore: regionScore.score,
      speciesCount: regionScore.speciesCount,
      topRegions: [...MOCK_REGION_SCORES]
        .sort((a, b) => b.score - a.score)
        .slice(0, 3),
      regionScores: MOCK_REGION_SCORES,
      speciesCategories: MOCK_SPECIES,
    },
    birdSites: sites,
    wetlandSpots: wetlands,
    weather: MOCK_WEATHER,
    weatherTrend: MOCK_WEATHER_TREND,
    extended: {
      ulsan: getMockUlsanData(),
      regional: getMockRegionalData(),
    },
    updatedAt: new Date().toISOString(),
    isMock: true,
  };
}
