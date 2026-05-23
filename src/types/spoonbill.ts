export type SpoonbillContinent = "아시아" | "유럽" | "북미" | "기타";
export type HabitatRole = "주요서식지" | "드문관찰";

export interface SpoonbillHabitat {
  id: string;
  region: string;
  country: string;
  continent: SpoonbillContinent;
  role: HabitatRole;
  habitatName: string;
  season: "번식" | "월동" | "이동";
  estimatedCount: number;
  lat: number;
  lon: number;
  note?: string;
}

export interface SpoonbillMigrationRoute {
  id: string;
  label: string;
  from: { name: string; lat: number; lon: number };
  to: { name: string; lat: number; lon: number };
  routeType: "정기이동" | "드문기록";
  seasonLabel: string;
  description?: string;
}

export interface SpoonbillInfo {
  koreanName: string;
  englishName: string;
  scientificName: string;
  conservationStatus: string;
  totalPopulation: number;
  censusYear: string;
  censusNote: string;
  description: string;
  globalNote: string;
  habitats: SpoonbillHabitat[];
  migrationRoutes: SpoonbillMigrationRoute[];
}

export interface ProjectedPoint {
  id: string;
  name: string;
  x: number;
  y: number;
  count: number;
  continent: SpoonbillContinent;
  role: HabitatRole;
  season: string;
}
