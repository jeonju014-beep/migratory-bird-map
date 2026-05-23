import "server-only";

import {
  SPOONBILL_MIGRANT_NO,
  ULSAN_MIGRANT_BASE,
} from "@/lib/constants";
import { ensureArray } from "@/lib/utils/format";
import type {
  UlsanBirdData,
  UlsanEmergeMonth,
  UlsanMigrantSpecies,
  UlsanObservatory,
} from "@/types/regional";

function getServiceKey() {
  return process.env.PUBLIC_DATA_SERVICE_KEY ?? "";
}

interface UlsanApiResponse<T> {
  header: { resultCode: string; resultMsg: string };
  body: {
    totalCount?: number;
    items?: { item?: T | T[] };
  };
}

async function fetchUlsan<T>(
  endpoint: string,
  params: Record<string, string>,
): Promise<T[]> {
  const serviceKey = getServiceKey();
  if (!serviceKey) {
    throw new Error("Missing PUBLIC_DATA_SERVICE_KEY");
  }

  const url = new URL(`${ULSAN_MIGRANT_BASE}/${endpoint}`);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("type", "json");
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`Ulsan API HTTP ${response.status}`);
  }

  const json = (await response.json()) as UlsanApiResponse<T>;
  if (json.header.resultCode !== "00") {
    throw new Error(json.header.resultMsg || "Ulsan API error");
  }

  return ensureArray(json.body.items?.item);
}

function aggregateTaehwa(items: UlsanEmergeMonth[]) {
  const taehwa = items.filter((item) =>
    item.observatory_year_name?.includes("태화"),
  );
  const months = [...new Set(taehwa.map((i) => i.observation_month))].sort();
  const latestMonth = months[months.length - 1] ?? "";
  const latestItems = taehwa.filter((i) => i.observation_month === latestMonth);

  const speciesMap = new Map<string, number>();
  latestItems.forEach((item) => {
    speciesMap.set(
      item.species_name,
      (speciesMap.get(item.species_name) ?? 0) + item.migrant_population_sum,
    );
  });

  const taehwaTopSpecies = [...speciesMap.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

  const taehwaTotalCount = taehwaTopSpecies.reduce((sum, s) => sum + s.count, 0);

  const monthlyTrend = months.slice(-6).map((month) => ({
    month: month.replace("-", "/"),
    total: taehwa
      .filter((i) => i.observation_month === month)
      .reduce((sum, i) => sum + i.migrant_population_sum, 0),
  }));

  return { latestMonth, taehwaTotalCount, taehwaTopSpecies, monthlyTrend };
}

export async function fetchUlsanBirdData(): Promise<UlsanBirdData> {
  const totalCount = 10559;
  const pageSize = 1000;
  const lastPage = Math.ceil(totalCount / pageSize);

  const [speciesCatalog, emergeItems, observatories] = await Promise.all([
    fetchUlsan<UlsanMigrantSpecies>("/migrant", {
      pageNo: "1",
      numOfRows: "30",
    }),
    fetchUlsan<UlsanEmergeMonth>("/emergeMonth", {
      pageNo: String(lastPage),
      numOfRows: String(pageSize),
    }),
    fetchUlsan<UlsanObservatory>("/observatorYear", {
      pageNo: "1",
      numOfRows: "20",
    }),
  ]);

  let spoonbillMaster = speciesCatalog.find(
    (s) => s.migrant_no === SPOONBILL_MIGRANT_NO,
  );

  if (!spoonbillMaster) {
    const spoonResults = await fetchUlsan<UlsanMigrantSpecies>("/migrant", {
      pageNo: "1",
      numOfRows: "200",
    });
    spoonbillMaster = spoonResults.find(
      (s) => s.science_name === "Platalea minor",
    );
  }

  const { latestMonth, taehwaTotalCount, taehwaTopSpecies, monthlyTrend } =
    aggregateTaehwa(emergeItems);

  return {
    speciesCatalog: speciesCatalog.slice(0, 12),
    spoonbillMaster,
    taehwaLatestMonth: latestMonth,
    taehwaTotalCount,
    taehwaTopSpecies,
    observatories: observatories.slice(0, 8),
    monthlyTrend,
    isMock: false,
  };
}
