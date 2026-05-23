export interface SpoonbillPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  credit: string;
}

/** 댕기머리물떼새 대표 사진 모음 (1분마다 순환) */
export const SPOONBILL_PHOTOS: SpoonbillPhoto[] = [
  {
    id: "ulsan-official",
    url: "http://usmigrant.ulsanbdc.or.kr/images/usmgt094_1.jpg",
    title: "울산시 · 공식 기록",
    caption: "검은 얼굴과 주걱 모양 부리가 특징이에요",
    credit: "ⓒ 울산시청 / 국립생물자원관",
  },
  {
    id: "taiwan-wetland",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Black-faced_Spoonbill_1.jpg/640px-Black-faced_Spoonbill_1.jpg",
    title: "대만 습지",
    caption: "세계 최대 월동지에서 먹이를 찾는 모습",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "hong-kong",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Platalea_minor_-_Hong_Kong.jpg/640px-Platalea_minor_-_Hong_Kong.jpg",
    title: "홍콩 Deep Bay",
    caption: "겨울철 대표 월동지에서의 모습",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "breeding-plumage",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/91/Black-faced_spoonbill_%28Platalea_minor%29.jpg/640px-Black-faced_spoonbill_%28Platalea_minor%29.jpg",
    title: "번식깃",
    caption: "노란 장식깃이 돋보이는 번식기",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "flying",
    url: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/Platalea_minor_-_Taiwan.jpg/640px-Platalea_minor_-_Taiwan.jpg",
    title: "비행",
    caption: "넓은 날개로 습지 위를 날아요",
    credit: "Wikimedia Commons · CC",
  },
];

export const PHOTO_ROTATE_MS = 60_000;

export function buildPhotoList(apiPictureUrl?: string): SpoonbillPhoto[] {
  if (!apiPictureUrl) return SPOONBILL_PHOTOS;

  const exists = SPOONBILL_PHOTOS.some((p) => p.url === apiPictureUrl);
  if (exists) return SPOONBILL_PHOTOS;

  return [
    {
      id: "ulsan-api-live",
      url: apiPictureUrl,
      title: "울산 API 실시간",
      caption: "태화강 일대에서 기록된 댕기머리물떼새",
      credit: "울산철새 API",
    },
    ...SPOONBILL_PHOTOS,
  ];
}
