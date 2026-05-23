import { SPOONBILL_PRIMARY_IMAGE } from "@/lib/mock/spoonbill-images";

export interface BirdSpeciesInfo {
  koreanName: string;
  englishName?: string;
  scientificName?: string;
  description: string;
  imageUrl?: string;
  imageCredit?: string;
}

const DIRECT_BIRD_IMAGES: Record<string, string> = {
  "Black-faced_Spoonbill_1.jpg": SPOONBILL_PRIMARY_IMAGE,
  "Black-faced_Spoonbill_Platalea_minor_1.jpg": SPOONBILL_PRIMARY_IMAGE,
  "Northern-Lapwing-Vanellus-vanellus.jpg": SPOONBILL_PRIMARY_IMAGE,
  "Ardea_alba4.jpg":
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Ardea_alba4.jpg/640px-Ardea_alba4.jpg",
};

const W = (file: string) =>
  DIRECT_BIRD_IMAGES[file] ??
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=640`;
/** 대표 철새·텃새 카탈로그 (교육용 요약) */
export const BIRD_SPECIES_CATALOG: Record<string, BirdSpeciesInfo> = {
  댕기머리물떼새: {
    koreanName: "댕기머리물떼새",
    englishName: "Northern Lapwing",
    scientificName: "Vanellus vanellus",
    description:
      "검은 목·가슴, 흰 배, 번식기 긴 깃(댕기)이 특징인 물떼새예요. 유럽·서아시아에서 번식하고, 한국에서는 가을~봄 철새·월동새로 논·갯벌·하구에서 자주 봅니다.",
    imageUrl: SPOONBILL_PRIMARY_IMAGE,
    imageCredit: "Wikimedia Commons · CC",
  },
  백로: {
    koreanName: "백로",
    englishName: "Great Egret",
    scientificName: "Ardea alba",
    description: "하얀 깃과 S자 목이 우아한 대형 물새예요. 갯벌·논·하구에서 물고기를 잡아먹어요.",
    imageUrl: W("Ardea_alba4.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  왜가리: {
    koreanName: "왜가리",
    englishName: "Grey Heron",
    scientificName: "Ardea cinerea",
    description: "회색 깃의 대형 물새로, 느긋하게 물가를 걸으며 먹이를 기다려요. 사계절 우리나라에서 볼 수 있어요.",
    imageUrl: W("Grey_Heron_%28Ardea_cinerea%29_standing_in_the_river_%28square%29.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  도요새: {
    koreanName: "도요새",
    englishName: "Shorebirds",
    description:
      "갯벌·해변에서 긴 부리로 먹이를 찾는 철새 그룹이에요. 멧도요·흰물떼새 등이 대표적이에요.",
  },
  황새: {
    koreanName: "황새",
    englishName: "Oriental Stork",
    scientificName: "Ciconia boyciana",
    description: "흑백 대비가 선명한 멸종위기종이에요. 넓은 날개로 하늘을 크게 날며 습지를 찾아요.",
    imageUrl: W("Ciconia_boyciana_-_Changnyung_Habitat.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  가마우지: {
    koreanName: "가마우지",
    englishName: "Brant Goose",
    scientificName: "Branta bernicla",
    description: "작은 기러기류로, 해안 갯벌의 해초를 주로 먹어요. 무리를 지어 V자 대형으로 이동해요.",
    imageUrl: W("Branta_bernicla1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  큰유리: {
    koreanName: "큰유리",
    englishName: "Whooper Swan",
    scientificName: "Cygnus cygnus",
    description: "노란 부리 끝이 특징인 큰 고니예요. 겨울철 호수·하구에 무리를 지어 도래해요.",
    imageUrl: W("Cygnus_cygnus_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  재갈매기: {
    koreanName: "재갈매기",
    englishName: "Black-tailed Gull",
    scientificName: "Larus crassirostris",
    description: "검은 꼬리 끝과 붉은 부리가 특징이에요. 바닷가·항구에서 흔히 볼 수 있는 떼새예요.",
    imageUrl: W("Larus_crassirostris_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  멧도요: {
    koreanName: "멧도요",
    englishName: "Common Redshank",
    scientificName: "Tringa totanus",
    description: "붉은 다리와 긴 부리가 특징인 갯벌 철새예요. 먹이를 찾을 때 다리를 리듬감 있게 움직여요.",
    imageUrl: W("Tringa_totanus_-_Laem_Pak_Bia.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  흰뺨검둥오리: {
    koreanName: "흰뺨검둥오리",
    englishName: "Common Pochard",
    scientificName: "Aythya ferina",
    description: "수컷은 붉은 머리·검은 가슴, 암컷은 갈색 계열이에요. 겨울철 호수·저수지에 모여요.",
    imageUrl: W("Aythya_ferina_male_%28lake%29%2C_Leighton_Moss%2C_Lancashire%2C_UK.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  말새: {
    koreanName: "말새",
    englishName: "Eurasian Hobby",
    scientificName: "Falco subbuteo",
    description: "날쌘 소형 맹금류로, 하늘에서 곤충·새를 포착해요. 여름철 우리나라에 드나들어요.",
    imageUrl: W("Falco_subbuteo_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  송골매: {
    koreanName: "송골매",
    englishName: "Eurasian Sparrowhawk",
    scientificName: "Accipiter nisus",
    description: "작고 날카로운 맹금류예요. 숲 가장자리에서 작은 새를 사냥하며 빠르게 비행해요.",
    imageUrl: W("Accipiter_nisus_male.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  독수리: {
    koreanName: "독수리",
    englishName: "Eagles",
    description:
      "넓은 날개로 하늘을 크게 도는 대형 맹금류예요. 흰꼬리수리·참수리 등이 대표적이에요.",
    imageUrl: W("Haliaeetus_albicilla_2.jpg"),
    imageCredit: "Wikimedia Commons · 흰꼬리수리",
  },
  솔빔: {
    koreanName: "솔빔",
    englishName: "Merlin",
    scientificName: "Falco columbarius",
    description: "몸집이 작은 맹금류로, 빠른 비행으로 먹이를 쫓아요. 겨울철 개활지·해안에서 관측돼요.",
  },
  황조롱이: {
    koreanName: "황조롱이",
    englishName: "Common Kestrel",
    scientificName: "Falco tinnunculus",
    description: "공중에서 날개를 퍼덕이며 먹이를 찾는 맹금류예요. 들판·도시 주변에서도 흔히 볼 수 있어요.",
    imageUrl: W("Falco_tinnunculus_male_2.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  원앙: {
    koreanName: "원앙",
    englishName: "Mandarin Duck",
    scientificName: "Aix galericulata",
    description: "수컷의 화려한 깃이 유명한 담수 오리예요. 숲 속 계곡·연못 주변을 좋아해요.",
    imageUrl: W("Aix_galericulata_male.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  물닭: {
    koreanName: "물닭",
    englishName: "Common Moorhen",
    scientificName: "Gallinula chloropus",
    description: "붉은 이마와 노란 부리가 특징이에요. 연못·하천의 수초 사이를 가볍게 걸어다녀요.",
    imageUrl: W("Common_Moorhen_%28Gallinula_chloropus%29.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  쇠물닭: {
    koreanName: "쇠물닭",
    englishName: "Little Grebe",
    scientificName: "Tachybaptus ruficollis",
    description: "작은 몸집의 물새로, 물속으로 숨었다가 다시 떠올라요. 조용한 연못·호수에 서식해요.",
    imageUrl: W("Tachybaptus_ruficollis_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  청둥오리: {
    koreanName: "청둥오리",
    englishName: "Baikal Teal",
    scientificName: "Sibirionetta formosa",
    description: "수컷의 청록색 깃과 흰 줄무늬가 아름다운 철새예요. 겨울철 습지·저수지에 대규모로 모여요.",
    imageUrl: W("Baikal_Teal_%28Sibirionetta_formosa%29_male.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  "참새류": {
    koreanName: "참새류",
    englishName: "Sparrows",
    description: "도시·마을·들판에서 흔히 보는 소형 텃새 그룹이에요. 나그네새·철새 통계에도 포함돼요.",
    imageUrl: W("Passer_montanus.jpg"),
    imageCredit: "Wikimedia Commons · 참새",
  },
  참새: {
    koreanName: "참새",
    englishName: "Tree Sparrow",
    scientificName: "Passer montanus",
    description: "갈색·흰색 깃의 작은 텃새예요. 마을·논두렁·공원에서 무리를 지어 지내요.",
    imageUrl: W("Passer_montanus.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  울새: {
    koreanName: "울새",
    englishName: "Varied Tit",
    scientificName: "Sittiparus varius",
    description: "노란 배와 검은 줄무늬가 예쁜 작은 새예요. 숲·공원에서 나무 줄기를 따라 다녀요.",
    imageUrl: W("Parus_variabilis.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  까치: {
    koreanName: "까치",
    englishName: "Oriental Magpie",
    scientificName: "Pica serica",
    description: "흑백 대비가 선명한 대표적인 텃새예요. 영리하고 큰 소리로 울며 영역을 표시해요.",
    imageUrl: W("Pica_pica_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  천둥오리: {
    koreanName: "천둥오리",
    englishName: "Common Shelduck",
    scientificName: "Tadorna tadorna",
    description: "화려한 색 대비가 돋보이는 오리예요. 해안·하구·갯벌 인근에서 관측돼요.",
    imageUrl: W("Tadorna_tadorna_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  알락오리: {
    koreanName: "알락오리",
    englishName: "Eurasian Teal",
    scientificName: "Anas crecca",
    description: "작은 몸집의 오리로, 수컷 머리에 녹색 띠가 있어요. 겨울철 습지에 많이 모입니다.",
    imageUrl: W("Anas_crecca_male.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  노랑부리저어새: {
    koreanName: "노랑부리저어새",
    englishName: "Far Eastern Curlew",
    scientificName: "Numenius madagascariensis",
    description: "긴 부리와 큰 몸집의 갯벌 철새예요. 멸종위기종으로 습지 보호가 특히 중요해요.",
    imageUrl: W("Numenius_madagascariensis.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  큰고니: {
    koreanName: "큰고니",
    englishName: "Whooper Swan",
    scientificName: "Cygnus cygnus",
    description: "큰 몸집의 고니로, 우아한 S자 목과 큰 소리로 울어요. 겨울철 저수지·하구에 모여요.",
    imageUrl: W("Cygnus_cygnus_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  세가락갈매기: {
    koreanName: "세가락갈매기",
    englishName: "Black-legged Kittiwake",
    scientificName: "Rissa tridactyla",
    description: "바다 절벽에 둥지를 트는 갈매기예요. 겨울철 해안·항구에서 무리를 지어 볼 수 있어요.",
    imageUrl: W("Rissa_tridactyla_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  괭이갈매기: {
    koreanName: "괭이갈매기",
    englishName: "Slaty-backed Gull",
    scientificName: "Larus schistisagus",
    description: "등 깃이 슬레이트색인 대형 갈매기예요. 동아시아 해안에서 흔히 관측돼요.",
    imageUrl: W("Larus_schistisagus_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  붉은부리갈매기: {
    koreanName: "붉은부리갈매기",
    englishName: "Black-headed Gull",
    scientificName: "Chroicocephalus ridibundus",
    description: "번식기에 머리가 갈색·검은색으로 변하는 갈매기예요. 하구·저수지에서 무리를 지어요.",
    imageUrl: W("Chroicocephalus_ridibundus_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  붉은머리오목눈이: {
    koreanName: "붉은머리오목눈이",
    englishName: "Red-breasted Merganser",
    scientificName: "Mergus serrator",
    description: "가느다란 부리와 붉은 가슴이 특징인 물오리예요. 겨울철 바다·하구에서 헤엄쳐요.",
    imageUrl: W("Mergus_serrator_male.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  흑두루미: {
    koreanName: "흑두루미",
    englishName: "Hooded Crane",
    scientificName: "Grus monacha",
    description: "머리가 검은색인 아름다운 두루미예요. 순천만 등 주요 습지에서 겨울을 보내요.",
    imageUrl: W("Grus_monacha_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  쇠기러기: {
    koreanName: "쇠기러기",
    englishName: "Taiga Bean Goose",
    scientificName: "Anser fabalis",
    description: "큰 기러기류로, 논·습지에서 풀·곡물을 먹어요. V자 대형으로 장거리 이동해요.",
    imageUrl: W("Anser_fabalis_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
  재두루미: {
    koreanName: "재두루미",
    englishName: "White-naped Crane",
    scientificName: "Antigone vipio",
    description: "목 뒤 흰색 띠가 특징인 두루미예요. 멸종위기종으로 습지 보전이 중요해요.",
    imageUrl: W("Grus_vipio_1.jpg"),
    imageCredit: "Wikimedia Commons",
  },
};

const ALIASES: Record<string, string> = {
  "기타 이동·나그네 기록": "참새류",
};

export function normalizeBirdName(raw: string): string {
  return raw.trim().replace(/\s*등\s*$/, "").replace(/\s+/g, "");
}

export function getBirdSpeciesInfo(rawName: string): BirdSpeciesInfo | null {
  const name = normalizeBirdName(rawName);
  if (!name) return null;

  const key = ALIASES[name] ?? name;
  return BIRD_SPECIES_CATALOG[key] ?? BIRD_SPECIES_CATALOG[name] ?? null;
}

export function parseBirdNameSegments(
  text: string,
): Array<{ type: "name" | "text"; value: string }> {
  if (!text.trim()) return [];

  const segments = text.split(/(·|\.|,|、)/);
  const result: Array<{ type: "name" | "text"; value: string }> = [];

  for (const segment of segments) {
    if (!segment) continue;
    if (/^[·.,、]$/.test(segment)) {
      result.push({ type: "text", value: segment });
      continue;
    }

    const cleaned = normalizeBirdName(segment);
    if (cleaned) {
      result.push({ type: "name", value: cleaned });
    }
  }

  return result;
}
