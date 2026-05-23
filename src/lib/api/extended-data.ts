import "server-only";

import {
  fetchBirdDistributionHighlights,
  fetchGumiWetlandTrend,
  fetchJejuArrivalSites,
  fetchJeonbukWetlands,
  fetchUlsanProtectionZones,
} from "@/lib/api/odcloud";
import { fetchUlsanBirdData } from "@/lib/api/ulsan-migrant";
import {
  getMockRegionalData,
  getMockUlsanData,
} from "@/lib/mock/regional-fallback";
import type { ExtendedDashboardData, RegionalData, UlsanBirdData } from "@/types/regional";

export async function getExtendedData(): Promise<ExtendedDashboardData> {
  const [ulsanResult, regionalResult] = await Promise.allSettled([
    fetchUlsanBirdData(),
    fetchRegionalData(),
  ]);

  return {
    ulsan:
      ulsanResult.status === "fulfilled"
        ? ulsanResult.value
        : getMockUlsanData(),
    regional:
      regionalResult.status === "fulfilled"
        ? regionalResult.value
        : getMockRegionalData(),
  };
}

async function fetchRegionalData(): Promise<RegionalData> {
  const [
    jejuSites,
    gumiWetlandTrend,
    jeonbukWetlands,
    birdDistributionHighlights,
    ulsanProtectionZones,
  ] = await Promise.all([
    fetchJejuArrivalSites(),
    fetchGumiWetlandTrend(),
    fetchJeonbukWetlands(),
    fetchBirdDistributionHighlights(),
    fetchUlsanProtectionZones(),
  ]);

  return {
    jejuSites,
    gumiWetlandTrend,
    jeonbukWetlands,
    birdDistributionHighlights,
    ulsanProtectionZones,
    isMock: false,
  };
}

export async function getUlsanData(): Promise<UlsanBirdData> {
  try {
    return await fetchUlsanBirdData();
  } catch {
    return getMockUlsanData();
  }
}

export async function getRegionalDataOnly(): Promise<RegionalData> {
  try {
    return await fetchRegionalData();
  } catch {
    return getMockRegionalData();
  }
}
