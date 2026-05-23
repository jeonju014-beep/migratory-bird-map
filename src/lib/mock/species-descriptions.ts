import type { BirdSpeciesCategory } from "@/types/dashboard";

/** 철새 종 분류별 설명 (교육용 요약) */
export const SPECIES_CATEGORY_META: Record<
  string,
  Pick<BirdSpeciesCategory, "description" | "examples">
> = {
  물새: {
    description:
      "강·호수·습지·하구 등 물가에서 먹이를 찾는 철새 그룹이에요. 긴 다리와 부리로 물속·진흙 속 먹이를 잡습니다.",
    examples: ["백로", "왜가리", "도요새", "황새", "댕기머리물떼새"],
  },
  떼새: {
    description:
      "무리(떼)를 지어 이동하고 번식하는 철새예요. 갯벌·들판·해안에서 군집으로 관측되는 경우가 많아요.",
    examples: ["가마우지", "큰유리", "재갈매기", "멧도요", "흰뺨검둥오리"],
  },
  맹금류: {
    description:
      "예리한 시력으로 먹이를 포착하는 육식성 조류예요. 철새 이동 경로의 산악·숲·개활지에서 종종 관측돼요.",
    examples: ["말새", "송골매", "독수리", "솔빔", "황조롱이"],
  },
  "물닭·원앙": {
    description:
      "연못·호수·하천 등 담수 환경을 좋아하는 철새예요. 겨울철에 따뜻한 남쪽으로 이동하는 종이 많아요.",
    examples: ["원앙", "물닭", "쇠물닭", "흰뺨검둥오리", "청둥오리"],
  },
  기타: {
    description:
      "위 분류에 속하지 않거나, 나그네새·통계상 소수로 기록된 철새·텃새를 포함해요.",
    examples: ["참새류", "울새", "까치", "기타 이동·나그네 기록"],
  },
};

export function enrichSpeciesCategory(
  category: BirdSpeciesCategory,
): BirdSpeciesCategory {
  const meta = SPECIES_CATEGORY_META[category.name];
  if (!meta) return category;
  return {
    ...category,
    description: category.description ?? meta.description,
    examples: category.examples ?? meta.examples,
  };
}
