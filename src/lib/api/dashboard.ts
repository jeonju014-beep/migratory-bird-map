import "server-only";

import { fetchAllWeather, fetchBirdSites, fetchWetlandSpots } from "@/lib/api/clients";
import { getExtendedData } from "@/lib/api/extended-data";
import { REGIONS } from "@/lib/constants";
import {
  getMockDashboardData,
  MOCK_REGION_SCORES,
  MOCK_SPECIES,
} from "@/lib/mock/data";
import {
  getMockRegionalData,
  getMockUlsanData,
} from "@/lib/mock/regional-fallback";
import {
  buildRegionScores,
  estimateSpeciesCount,
} from "@/lib/utils/recommendation";
import type { DashboardData } from "@/types/dashboard";

export async function getDashboardData(areaCode = "0"): Promise<DashboardData> {
  const region = REGIONS.find((r) => r.code === areaCode) ?? REGIONS[0];

  try {
    const wetlandPromise =
      areaCode === "0"
        ? Promise.resolve({
            data: getMockDashboardData("0").wetlandSpots,
            isMock: true,
          })
        : "riverCode" in region && region.riverCode
          ? fetchWetlandSpots(region.riverCode)
          : Promise.resolve({ data: [], isMock: false });

    const [birdResult, wetlandResult, weatherResult, extendedResult] =
      await Promise.allSettled([
        fetchBirdSites(areaCode),
        wetlandPromise,
        fetchAllWeather(),
        getExtendedData(),
      ]);

    const birdSites =
      birdResult.status === "fulfilled" ? birdResult.value.data : [];
    const wetlandSpots =
      wetlandResult.status === "fulfilled" ? wetlandResult.value.data : [];
    const weather =
      weatherResult.status === "fulfilled"
        ? weatherResult.value.summary
        : getMockDashboardData(areaCode).weather;
    const weatherTrend =
      weatherResult.status === "fulfilled"
        ? weatherResult.value.trend
        : getMockDashboardData(areaCode).weatherTrend;
    const extended =
      extendedResult.status === "fulfilled"
        ? extendedResult.value
        : { ulsan: getMockUlsanData(), regional: getMockRegionalData() };

    const isMock =
      birdSites.length === 0 &&
      wetlandSpots.length === 0 &&
      weatherResult.status !== "fulfilled";

    if (isMock) {
      return { ...getMockDashboardData(areaCode), extended };
    }

    const speciesCount = estimateSpeciesCount(
      birdSites.length,
      wetlandSpots.length,
    );

    const currentRegionScore = buildRegionScores([
      {
        regionCode: areaCode,
        regionName: region.name,
        siteCount: birdSites.length,
        wetlandCount: wetlandSpots.length,
        speciesCount,
        weather,
        dataFieldsFilled: birdSites.filter((s) => s.overview).length,
        dataFieldsTotal: Math.max(birdSites.length, 1),
      },
    ])[0];

    const regionScores = MOCK_REGION_SCORES.map((score) =>
      score.regionCode === areaCode && currentRegionScore
        ? currentRegionScore
        : score,
    ).sort((a, b) => b.score - a.score);

    return {
      region,
      summary: {
        birdSiteCount: birdSites.length,
        wetlandCount: wetlandSpots.length,
        recommendationScore: currentRegionScore?.score ?? 0,
        speciesCount,
        topRegions: regionScores.slice(0, 3),
        regionScores,
        speciesCategories: MOCK_SPECIES,
      },
      birdSites:
        birdSites.length > 0
          ? birdSites
          : getMockDashboardData(areaCode).birdSites,
      wetlandSpots:
        wetlandSpots.length > 0
          ? wetlandSpots
          : getMockDashboardData(areaCode).wetlandSpots,
      weather,
      weatherTrend,
      extended,
      updatedAt: new Date().toISOString(),
      isMock:
        birdResult.status !== "fulfilled" ||
        weatherResult.status !== "fulfilled" ||
        extended.ulsan.isMock,
    };
  } catch {
    return {
      ...getMockDashboardData(areaCode),
      extended: {
        ulsan: getMockUlsanData(),
        regional: getMockRegionalData(),
      },
    };
  }
}
