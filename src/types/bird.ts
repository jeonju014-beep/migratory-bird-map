export interface TourApiItem {
  contentid: string;
  title: string;
  addr1?: string;
  addr2?: string;
  overview?: string;
  firstimage?: string;
  mapx?: string;
  mapy?: string;
  tel?: string;
}

export interface TourApiResponse {
  response: {
    header: { resultCode: string; resultMsg: string };
    body: {
      items?: { item?: TourApiItem | TourApiItem[] };
      totalCount?: number;
    };
  };
}

export interface WaterTravelItem {
  spotNm?: string;
  spotExpln?: string;
  spotAddr?: string;
  regionNm?: string;
  spotNo?: string;
}

export interface WaterTravelResponse {
  response?: {
    body?: {
      items?: WaterTravelItem | WaterTravelItem[];
    };
  };
}

export interface ApiResult<T> {
  data: T;
  isMock: boolean;
  error?: string;
}
