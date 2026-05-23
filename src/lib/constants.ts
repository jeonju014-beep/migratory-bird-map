export const REGIONS = [
  { code: "0", name: "전국" },
  { code: "31", name: "경기", riverCode: "HA" },
  { code: "32", name: "강원" },
  { code: "34", name: "충남", riverCode: "GU" },
  { code: "37", name: "전북", riverCode: "SJ" },
  { code: "38", name: "전남", riverCode: "YS" },
  { code: "36", name: "경남", riverCode: "ND" },
  { code: "6", name: "부산·울산", riverCode: "ND" },
] as const;

export const WEATHER_CITIES = [
  { name: "순천", lat: 34.9507, lon: 127.4872 },
  { name: "서천", lat: 36.0803, lon: 126.6919 },
  { name: "강릉", lat: 37.7519, lon: 128.8761 },
  { name: "인천", lat: 37.4563, lon: 126.7052 },
  { name: "부산", lat: 35.1796, lon: 129.0756 },
] as const;

export const TOUR_API_BASE = "https://apis.data.go.kr/B551011/KorService2";
export const WATER_API_BASE = "https://apis.data.go.kr/B500001/myportal/travel";
export const OPENWEATHER_BASE =
  "https://api.openweathermap.org/data/2.5/forecast";

export const MOBILE_APP = "MigratoryBirdDashboard";

export const ULSAN_MIGRANT_BASE = "https://apis.data.go.kr/6310000/UlsanMigrantAPI";
export const ODCLOUD_BASE = "https://api.odcloud.kr/api";

export const ODCLOUD_DATASETS = {
  jeonbukWetland: "3081530/v1/uddi:2d25e5d4-fc54-44c8-bca0-e740dea7d761_201909250900",
  gumiWetland: "3033335/v1/uddi:aa575cfa-07d3-4d4a-994e-c1a7ef3f75f8",
  jejuArrivalSites: "15097059/v1/uddi:77f0883c-fe45-4c4d-a5ce-c1d40ac41d36",
  jejuWatchAreas: "15097060/v1/uddi:90604a9f-6fe5-4d4b-aa1b-c3d83f9a41eb",
  ulsanProtection: "3083236/v1/uddi:994155e2-df8a-4594-aabe-a900fcff4527_201909241921",
  birdDistribution: "3033734/v1/uddi:e8403582-6959-4955-b240-e96e5420a358",
} as const;

export const SPOONBILL_MIGRANT_NO = "usmgt094";
