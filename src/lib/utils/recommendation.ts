import type { RegionScore } from "@/types/dashboard";
import type { WeatherSummary } from "@/types/weather";

interface ScoreInput {
  siteCount: number;
  wetlandCount: number;
  speciesCount: number;
  weather: WeatherSummary[];
  dataFieldsFilled: number;
  dataFieldsTotal: number;
  maxSiteCount: number;
}

export function calculateWeatherScore(weather: WeatherSummary[]): number {
  if (weather.length === 0) return 15;

  const avgTemp =
    weather.reduce((sum, w) => sum + (w.tempMin + w.tempMax) / 2, 0) /
    weather.length;
  const avgPop =
    weather.reduce((sum, w) => sum + w.pop, 0) / weather.length;
  const avgWind =
    weather.reduce((sum, w) => sum + w.windSpeed, 0) / weather.length;

  let score = 0;

  if (avgPop < 0.3) score += 10;
  else if (avgPop < 0.5) score += 6;
  else score += 2;

  if (avgTemp >= 10 && avgTemp <= 22) score += 10;
  else if (avgTemp >= 5 && avgTemp <= 25) score += 6;
  else score += 2;

  if (avgWind < 10) score += 5;
  if (avgWind > 15) score -= 5;
  if (avgTemp > 30) score -= 5;
  if (avgTemp < -5) score -= 5;

  return Math.max(0, Math.min(30, score));
}

export function calculateRecommendationScore(input: ScoreInput): number {
  const siteScore = Math.min(
    30,
    (input.siteCount / Math.max(input.maxSiteCount, 1)) * 30,
  );
  const wetlandScore = Math.min(15, (input.wetlandCount / 12) * 15);
  const speciesScore = Math.min(25, (input.speciesCount / 150) * 25);
  const weatherScore = calculateWeatherScore(input.weather);
  const completenessScore =
    input.dataFieldsTotal === 0
      ? 10
      : (input.dataFieldsFilled / input.dataFieldsTotal) * 15;

  const total =
    siteScore + wetlandScore + speciesScore + weatherScore + completenessScore;

  return Math.round(Math.min(100, Math.max(0, total)));
}

export function buildRegionScores(
  regions: Array<{
    regionCode: string;
    regionName: string;
    siteCount: number;
    wetlandCount: number;
    speciesCount: number;
    weather: WeatherSummary[];
    dataFieldsFilled: number;
    dataFieldsTotal: number;
  }>,
): RegionScore[] {
  const maxSiteCount = Math.max(...regions.map((r) => r.siteCount), 1);

  return regions
    .map((region) => {
      const weatherScore = calculateWeatherScore(region.weather);
      const score = calculateRecommendationScore({
        ...region,
        maxSiteCount,
      });

      return {
        regionCode: region.regionCode,
        regionName: region.regionName,
        score,
        siteCount: region.siteCount,
        wetlandCount: region.wetlandCount,
        speciesCount: region.speciesCount,
        weatherScore,
        dataCompleteness: Math.round(
          (region.dataFieldsFilled / Math.max(region.dataFieldsTotal, 1)) * 15,
        ),
      };
    })
    .sort((a, b) => b.score - a.score);
}

export function estimateSpeciesCount(siteCount: number, wetlandCount: number) {
  return Math.min(150, siteCount * 8 + wetlandCount * 6 + 20);
}
