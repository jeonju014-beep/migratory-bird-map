export interface RegionOption {
  code: string;
  name: string;
  riverCode?: string;
}

export interface BirdSite {
  id: string;
  title: string;
  address: string;
  overview: string;
  imageUrl?: string;
  mapX?: string;
  mapY?: string;
  tel?: string;
  homepageUrl?: string;
  mapUrl?: string;
  summary?: string;
  highlights?: string[];
  source: "tour" | "mock";
}

export interface WetlandSpot {
  id: string;
  title: string;
  address: string;
  description: string;
  regionName: string;
  homepageUrl?: string;
  mapUrl?: string;
  summary?: string;
  highlights?: string[];
  source: "water" | "mock";
}

export interface BirdSpeciesCategory {
  name: string;
  count: number;
  color: string;
  description?: string;
  examples?: string[];
}

export interface RegionScore {
  regionCode: string;
  regionName: string;
  score: number;
  siteCount: number;
  wetlandCount: number;
  speciesCount: number;
  weatherScore: number;
  dataCompleteness: number;
}

export interface DashboardSummary {
  birdSiteCount: number;
  wetlandCount: number;
  recommendationScore: number;
  speciesCount: number;
  topRegions: RegionScore[];
  regionScores: RegionScore[];
  speciesCategories: BirdSpeciesCategory[];
}

export interface DashboardData {
  region: RegionOption;
  summary: DashboardSummary;
  birdSites: BirdSite[];
  wetlandSpots: WetlandSpot[];
  weather: import("./weather").WeatherSummary[];
  weatherTrend: import("./weather").WeatherTrendPoint[];
  extended: import("./regional").ExtendedDashboardData;
  updatedAt: string;
  isMock: boolean;
}

export type AreaCode =
  | "0"
  | "31"
  | "32"
  | "34"
  | "37"
  | "38"
  | "36"
  | "6";
