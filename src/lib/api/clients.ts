import "server-only";

import {
  MOBILE_APP,
  OPENWEATHER_BASE,
  TOUR_API_BASE,
  WATER_API_BASE,
} from "@/lib/constants";
import { ensureArray } from "@/lib/utils/format";
import type {
  ApiResult,
  TourApiItem,
  TourApiResponse,
  WaterTravelItem,
  WaterTravelResponse,
} from "@/types/bird";
import type { BirdSite, WetlandSpot } from "@/types/dashboard";
import type {
  OpenWeatherResponse,
  WeatherSummary,
  WeatherTrendPoint,
} from "@/types/weather";

function getServiceKey() {
  return process.env.PUBLIC_DATA_SERVICE_KEY ?? "";
}

function getWeatherKey() {
  return process.env.OPENWEATHER_API_KEY ?? "";
}

function buildPublicDataUrl(base: string, path: string, params: Record<string, string>) {
  const url = new URL(`${base}${path}`);
  Object.entries(params).forEach(([key, value]) => {
    if (value) url.searchParams.set(key, value);
  });
  return url.toString();
}

async function fetchJson<T>(url: string): Promise<T> {
  const response = await fetch(url, { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }
  return response.json() as Promise<T>;
}

function mapTourItem(item: TourApiItem): BirdSite {
  return {
    id: item.contentid,
    title: item.title,
    address: [item.addr1, item.addr2].filter(Boolean).join(" "),
    overview: item.overview ?? "",
    imageUrl: item.firstimage,
    mapX: item.mapx,
    mapY: item.mapy,
    tel: item.tel,
    source: "tour",
  };
}

export async function fetchBirdSites(
  areaCode: string,
): Promise<ApiResult<BirdSite[]>> {
  const serviceKey = getServiceKey();
  if (!serviceKey) {
    throw new Error("Missing PUBLIC_DATA_SERVICE_KEY");
  }

  const commonParams = {
    serviceKey,
    MobileOS: "ETC",
    MobileApp: MOBILE_APP,
    _type: "json",
    numOfRows: "20",
    pageNo: "1",
    listYN: "Y",
    arrange: "A",
  };

  const keywordUrl = buildPublicDataUrl(TOUR_API_BASE, "/searchKeyword2", {
    ...commonParams,
    keyword: "철새",
    ...(areaCode !== "0" ? { areaCode } : {}),
  });

  const areaUrl =
    areaCode !== "0"
      ? buildPublicDataUrl(TOUR_API_BASE, "/areaBasedList2", {
          ...commonParams,
          areaCode,
          contentTypeId: "12",
        })
      : null;

  const [keywordRes, areaRes] = await Promise.all([
    fetchJson<TourApiResponse>(keywordUrl),
    areaUrl ? fetchJson<TourApiResponse>(areaUrl) : Promise.resolve(null),
  ]);

  const keywordItems = ensureArray(keywordRes.response.body.items?.item);
  const areaItems = ensureArray(areaRes?.response.body.items?.item);

  const merged = new Map<string, BirdSite>();
  [...keywordItems, ...areaItems].forEach((item) => {
    merged.set(item.contentid, mapTourItem(item));
  });

  return {
    data: Array.from(merged.values()),
    isMock: false,
  };
}

export async function fetchWetlandSpots(
  riverCode?: string,
): Promise<ApiResult<WetlandSpot[]>> {
  const serviceKey = getServiceKey();
  if (!serviceKey || !riverCode) {
    throw new Error("Missing service key or river code");
  }

  const url = buildPublicDataUrl(WATER_API_BASE, "/getTravelSpotList", {
    serviceKey,
    pageNo: "1",
    numOfRows: "20",
    searchTypeCd: "02",
    regionCd: riverCode,
    _type: "json",
  });

  const response = await fetchJson<WaterTravelResponse>(url);
  const items = ensureArray(response.response?.body?.items);

  const data = items.map((item: WaterTravelItem, index) => ({
    id: item.spotNo ?? `water-${index}`,
    title: item.spotNm ?? "수변 명소",
    address: item.spotAddr ?? "",
    description: item.spotExpln ?? "",
    regionName: item.regionNm ?? "",
    source: "water" as const,
  }));

  return { data, isMock: false };
}

export async function fetchWeatherForecast(
  lat: number,
  lon: number,
  cityName: string,
): Promise<{ summary: WeatherSummary[]; trend: WeatherTrendPoint[] }> {
  const appid = getWeatherKey();
  if (!appid) {
    throw new Error("Missing OPENWEATHER_API_KEY");
  }

  const url = `${OPENWEATHER_BASE}?lat=${lat}&lon=${lon}&appid=${appid}&units=metric&lang=kr`;
  const response = await fetchJson<OpenWeatherResponse>(url);

  const dailyMap = new Map<string, WeatherSummary>();

  response.list.forEach((item) => {
    const dateKey = item.dt_txt.split(" ")[0];
    const existing = dailyMap.get(dateKey);
    const pop = item.pop ?? 0;

    if (!existing) {
      dailyMap.set(dateKey, {
        city: cityName,
        date: dateKey.slice(5).replace("-", "/"),
        tempMin: item.main.temp_min,
        tempMax: item.main.temp_max,
        description: item.weather[0]?.description ?? "",
        icon: item.weather[0]?.icon ?? "01d",
        pop,
        windSpeed: item.wind.speed,
      });
      return;
    }

    dailyMap.set(dateKey, {
      ...existing,
      tempMin: Math.min(existing.tempMin, item.main.temp_min),
      tempMax: Math.max(existing.tempMax, item.main.temp_max),
      pop: Math.max(existing.pop, pop),
      windSpeed: Math.max(existing.windSpeed, item.wind.speed),
    });
  });

  const summary = Array.from(dailyMap.values()).slice(0, 5);
  const trend = summary.map((day) => ({
    date: day.date,
    temp: Math.round((day.tempMin + day.tempMax) / 2),
    pop: Math.round(day.pop * 100),
  }));

  return { summary, trend };
}

export async function fetchAllWeather() {
  const { WEATHER_CITIES } = await import("@/lib/constants");
  const results = await Promise.allSettled(
    WEATHER_CITIES.map((city) =>
      fetchWeatherForecast(city.lat, city.lon, city.name),
    ),
  );

  const successful = results
    .filter(
      (result): result is PromiseFulfilledResult<{
        summary: WeatherSummary[];
        trend: WeatherTrendPoint[];
      }> => result.status === "fulfilled",
    )
    .map((result) => result.value);

  if (successful.length === 0) {
    throw new Error("All weather requests failed");
  }

  const summary = successful.flatMap((item) => item.summary.slice(0, 1));
  const trend = successful[0]?.trend ?? [];

  return { summary, trend };
}
