import type {
  BirdDistributionRecord,
  GumiWetlandRecord,
  JejuArrivalSite,
  JeonbukWetland,
  RegionalData,
  UlsanBirdData,
} from "@/types/regional";

import { SPOONBILL_PRIMARY_IMAGE } from "@/lib/mock/spoonbill-images";

export const MOCK_ULSAN_DATA: UlsanBirdData = {
  speciesCatalog: [],
  spoonbillMaster: {
    migrant_no: "usmgt094",
    species_name: "댕기머리물떼새",
    science_name: "Vanellus vanellus",
    species_name_eng: "Northern Lapwing",
    habitat: "논, 갯벌, 하구·습지",
    breedingplace: "유럽·서아시아(번식)",
    classificationcode: "나그네새·월동",
    picture1: SPOONBILL_PRIMARY_IMAGE,
  },
  taehwaLatestMonth: "2023-03",
  taehwaTotalCount: 6339,
  taehwaTopSpecies: [
    { name: "물닭", count: 2965 },
    { name: "참새", count: 500 },
    { name: "붉은부리갈매기", count: 273 },
    { name: "붉은머리오목눈이", count: 420 },
    { name: "청둥오리", count: 180 },
  ],
  observatories: [
    {
      observatory_year_name: "태화강하구",
      observatory_year_no: "obtyear006",
      latitude: 35.554,
      longitude: 129.27,
      year: 2023,
    },
    {
      observatory_year_name: "삼호섬",
      observatory_year_no: "obtyear004",
      latitude: 35.554,
      longitude: 129.27,
      year: 2023,
    },
  ],
  monthlyTrend: [
    { month: "2023/01", total: 5200 },
    { month: "2023/02", total: 5800 },
    { month: "2023/03", total: 6339 },
  ],
  isMock: true,
};

export const MOCK_REGIONAL_DATA: RegionalData = {
  jejuSites: [
    {
      도래지명: "하도리",
      장소: "종달리·하도리 해안일대",
      시군구명: "제주시",
      "공유수면_면적(만미터제곱)": "1148.9",
      "육상_면적(만미터제곱)": "61.1",
      도래철새: "천둥오리·알락오리·왜가리·노랑부리저어새·재갈매기 등",
      데이터기준일자: "2021-12-21",
    },
    {
      도래지명: "오조리",
      장소: "성산리·오조리·고성리 해안일대",
      시군구명: "서귀포시",
      "공유수면_면적(만미터제곱)": "1304.1",
      도래철새: "청둥오리·흰뺨검둥오리 등",
      데이터기준일자: "2021-12-21",
    },
    {
      도래지명: "용수저수지",
      장소: "용수리 저수지 일대",
      시군구명: "제주시",
      "육상_면적(만미터제곱)": "165.0",
      도래철새: "청둥오리·알락오리·왜가리 등",
      데이터기준일자: "2021-12-21",
    },
  ],
  gumiWetlandTrend: [
    {
      관측시기: "2020-10월~2021-03월",
      관측장소: "해평습지, 강정습지, 지산샛강",
      합계: 10977,
      흑두루미: 0,
      청둥오리: 3854,
      쇠기러기: 5954,
    },
    {
      관측시기: "2022-10월~2023-04월",
      관측장소: "해평습지, 강정습지, 지산샛강",
      합계: 12886,
      재두루미: 531,
      청둥오리: 4280,
      쇠기러기: 6620,
    },
    {
      관측시기: "2023-10월~2024-04월",
      관측장소: "해평습지, 강정습지, 지산샛강",
      합계: 6715,
      흑두루미: 6,
      재두루미: 139,
      청둥오리: 1250,
      쇠기러기: 4400,
    },
  ],
  jeonbukWetlands: [
    {
      지역명: "순천만갯벌",
      "위 치": "전남 순천시 별량면, 해룡면 일대",
      면적: "28",
      "특 징": "흑두루미 서식·철새도래지",
      "지정일자(람사르등록)": "2003-12-31",
    },
    {
      지역명: "고창 운곡습지",
      "위 치": "전북 고창군 아산면 운곡리",
      면적: "1.93",
      "특 징": "멸종위기야생동식물 서식",
      "지정일자(람사르등록)": "2011-03-14",
    },
    {
      지역명: "낙동강하구",
      "위 치": "부산 사하구·강서구 일원",
      면적: "37.718",
      "특 징": "철새도래지",
      "지정일자(람사르등록)": "1999-08-09",
    },
  ],
  birdDistributionHighlights: [
    {
      "국명(원병오2000)": "큰고니",
      "학명(원병오2000)": "Cygnus cygnus",
      "보호종 여부": "Y",
      관찰개체수: "676",
      조사지역: "주남저수지",
      행정구역: "경상남도 창원시",
      관찰시기: "1989-12-01",
    },
    {
      "국명(원병오2000)": "세가락갈매기",
      "학명(원병오2000)": "Rissa tridactyla",
      관찰개체수: "1000",
      조사지역: "거진항",
      행정구역: "강원도 고성군",
      관찰시기: "1989-12-01",
    },
    {
      "국명(원병오2000)": "괭이갈매기",
      "학명(원병오2000)": "Larus crassirostris",
      관찰개체수: "300",
      조사지역: "거진항",
      행정구역: "강원도 고성군",
      관찰시기: "1989-12-01",
    },
  ] as BirdDistributionRecord[],
  ulsanProtectionZones: [
    {
      구분: "철새보호구역",
      고시내용: "태화강 일원",
      소재지: "울산광역시",
      서식조수: "120종",
    },
  ],
  isMock: true,
};

export function getMockRegionalData(): RegionalData {
  return MOCK_REGIONAL_DATA;
}

export function getMockUlsanData(): UlsanBirdData {
  return MOCK_ULSAN_DATA;
}

export type { JejuArrivalSite, GumiWetlandRecord, JeonbukWetland };
