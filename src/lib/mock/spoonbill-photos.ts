import {
  SPOONBILL_PRIMARY_IMAGE,
  SPOONBILL_VERIFIED_IMAGES,
} from "@/lib/mock/spoonbill-images";
import { normalizeExternalUrl } from "@/lib/utils/map-url";

export interface SpoonbillPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  credit: string;
}

/** 댕기머리물떼새(Northern Lapwing · Vanellus vanellus) 대표 사진 */
export const SPOONBILL_PHOTOS: SpoonbillPhoto[] = [
  {
    id: "portrait",
    url: SPOONBILL_VERIFIED_IMAGES.portrait,
    title: "댕기머리물떼새",
    caption: "검은 목·가슴과 초록빛 머리, 번식기 긴 깃(댕기)가 특징이에요",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "breeding",
    url: SPOONBILL_VERIFIED_IMAGES.breeding,
    title: "번식기 · 유럽",
    caption: "봄 들판·습지에서 번식하며 ‘삐-익’ 소리를 내요",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "foraging",
    url: SPOONBILL_VERIFIED_IMAGES.foraging,
    title: "갯벌·논",
    caption: "논·갯벌·하구에서 곤충·벌레를 찾아먹어요",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "wetland",
    url: SPOONBILL_VERIFIED_IMAGES.wetland,
    title: "물가",
    caption: "물가와 진흙탕 주변을 가볍게 걸어다녀요",
    credit: "Wikimedia Commons · CC",
  },
  {
    id: "classic",
    url: SPOONBILL_VERIFIED_IMAGES.classic,
    title: "Northern Lapwing",
    caption: "흰 배와 갈색 등, 넓은 날개의 대표적인 물떼새예요",
    credit: "Wikimedia Commons · CC",
  },
];

export const PHOTO_ROTATE_MS = 60_000;

export function buildPhotoList(apiPictureUrl?: string): SpoonbillPhoto[] {
  if (!apiPictureUrl) return SPOONBILL_PHOTOS;

  const normalizedApiUrl = normalizeExternalUrl(apiPictureUrl);
  const exists = SPOONBILL_PHOTOS.some((photo) => photo.url === normalizedApiUrl);

  if (exists || normalizedApiUrl.includes("usmigrant.ulsanbdc.or.kr")) {
    return SPOONBILL_PHOTOS;
  }

  return [
    {
      id: "api-live",
      url: normalizedApiUrl,
      title: "관측 기록",
      caption: "API에서 제공한 사진이에요",
      credit: "철새 API",
    },
    ...SPOONBILL_PHOTOS,
  ];
}

export { SPOONBILL_PRIMARY_IMAGE };
