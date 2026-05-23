import "server-only";

import { ODCLOUD_BASE, ODCLOUD_DATASETS } from "@/lib/constants";
import type { OdcloudResponse } from "@/types/regional";

function getServiceKey() {
  return process.env.PUBLIC_DATA_SERVICE_KEY ?? "";
}

export async function fetchOdcloud<T>(
  datasetPath: string,
  options?: { page?: number; perPage?: number },
): Promise<OdcloudResponse<T>> {
  const serviceKey = getServiceKey();
  if (!serviceKey) {
    throw new Error("Missing PUBLIC_DATA_SERVICE_KEY");
  }

  const url = new URL(`${ODCLOUD_BASE}/${datasetPath}`);
  url.searchParams.set("serviceKey", serviceKey);
  url.searchParams.set("page", String(options?.page ?? 1));
  url.searchParams.set("perPage", String(options?.perPage ?? 100));

  const response = await fetch(url.toString(), { next: { revalidate: 3600 } });
  if (!response.ok) {
    throw new Error(`Odcloud HTTP ${response.status}`);
  }

  const json = (await response.json()) as OdcloudResponse<T> | { code?: number };
  if ("code" in json && !("data" in json)) {
    throw new Error("Odcloud API returned no data");
  }

  return json as OdcloudResponse<T>;
}

export async function fetchJeonbukWetlands() {
  const result = await fetchOdcloud<import("@/types/regional").JeonbukWetland>(
    ODCLOUD_DATASETS.jeonbukWetland,
    { perPage: 50 },
  );
  return result.data.filter(
    (item) =>
      item["특 징"]?.includes("철새") ||
      item["특 징"]?.includes("물새") ||
      item["특 징"]?.includes("습지"),
  );
}

export async function fetchJejuArrivalSites() {
  const result = await fetchOdcloud<import("@/types/regional").JejuArrivalSite>(
    ODCLOUD_DATASETS.jejuArrivalSites,
    { perPage: 20 },
  );
  return result.data;
}

export async function fetchGumiWetlandTrend() {
  const result = await fetchOdcloud<import("@/types/regional").GumiWetlandRecord>(
    ODCLOUD_DATASETS.gumiWetland,
    { perPage: 20 },
  );
  return result.data;
}

export async function fetchBirdDistributionHighlights() {
  const result = await fetchOdcloud<
    import("@/types/regional").BirdDistributionRecord
  >(ODCLOUD_DATASETS.birdDistribution, { perPage: 200 });

  const keywords = ["물떼", "저어", "두루미", "고니", "흑두루미", "따오기"];
  const filtered = result.data.filter((item) => {
    const name = item["국명(원병오2000)"] ?? "";
    return keywords.some((kw) => name.includes(kw));
  });

  return filtered
    .sort(
      (a, b) =>
        Number(b.관찰개체수 ?? 0) - Number(a.관찰개체수 ?? 0),
    )
    .slice(0, 12);
}

export async function fetchUlsanProtectionZones() {
  const result = await fetchOdcloud<{
    구분?: string;
    고시내용?: string;
    소재지?: string;
    서식조수?: string;
  }>(ODCLOUD_DATASETS.ulsanProtection, { perPage: 20 });
  return result.data;
}
