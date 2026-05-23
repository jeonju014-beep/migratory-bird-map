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
