export interface SpoonbillHabitat {
  id: string;
  region: string;
  country: string;
  habitatName: string;
  season: "번식" | "월동" | "이동";
  estimatedCount: number;
  note?: string;
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
  habitats: SpoonbillHabitat[];
}
