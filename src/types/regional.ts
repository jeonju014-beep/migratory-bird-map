export interface OdcloudResponse<T> {
  page: number;
  perPage: number;
  totalCount: number;
  currentCount: number;
  matchCount: number;
  data: T[];
}

export interface JejuArrivalSite {
  연번?: number;
  시군구명?: string;
  도래지명?: string;
  장소?: string;
  "공유수면_면적(만미터제곱)"?: string;
  "육상_면적(만미터제곱)"?: string;
  도래철새?: string;
  위도?: string;
  경도?: string;
  데이터기준일자?: string;
}

export interface GumiWetlandRecord {
  관측장소?: string;
  관측시기?: string;
  흑두루미?: number | string | null;
  재두루미?: number | string | null;
  청둥오리?: number | string | null;
  쇠기러기?: number | string | null;
  "큰고니(백조)"?: number | string | null;
  합계?: number | string | null;
  관리기관명?: string;
}

export interface JeonbukWetland {
  지역명?: string;
  "위 치"?: string;
  면적?: string;
  "특 징"?: string;
  "지정일자(람사르등록)"?: string;
}

export interface BirdDistributionRecord {
  "국명(원병오2000)"?: string;
  "학명(원병오2000)"?: string;
  "영문명(원병오2000)"?: string;
  "보호종 여부"?: string;
  관찰개체수?: string;
  조사지역?: string;
  행정구역?: string;
  관찰시기?: string;
}

export interface UlsanMigrantSpecies {
  migrant_no: string;
  species_name: string;
  science_name: string;
  species_name_eng?: string;
  habitat?: string;
  breedingplace?: string;
  apperance?: string;
  feed?: string;
  classificationcode?: string;
  picture1?: string;
}

export interface UlsanEmergeMonth {
  observation_month: string;
  observatory_year_name: string;
  species_name: string;
  migrant_population_sum: number;
  migrant_no?: string;
}

export interface UlsanObservatory {
  observatory_year_name: string;
  observatory_year_no: string;
  latitude: number;
  longitude: number;
  year?: number;
  address?: string;
}

export interface UlsanBirdData {
  speciesCatalog: UlsanMigrantSpecies[];
  spoonbillMaster?: UlsanMigrantSpecies;
  taehwaLatestMonth: string;
  taehwaTotalCount: number;
  taehwaTopSpecies: Array<{ name: string; count: number }>;
  observatories: UlsanObservatory[];
  monthlyTrend: Array<{ month: string; total: number }>;
  isMock: boolean;
}

export interface RegionalData {
  jejuSites: JejuArrivalSite[];
  gumiWetlandTrend: GumiWetlandRecord[];
  jeonbukWetlands: JeonbukWetland[];
  birdDistributionHighlights: BirdDistributionRecord[];
  ulsanProtectionZones: Array<{ 구분?: string; 고시내용?: string; 소재지?: string; 서식조수?: string }>;
  isMock: boolean;
}

export interface ExtendedDashboardData {
  ulsan: UlsanBirdData;
  regional: RegionalData;
}
