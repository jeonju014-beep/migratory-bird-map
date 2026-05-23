import type { BirdSite } from "@/types/dashboard";

export interface SiteCoordinates {
  latitude: number;
  longitude: number;
}

/** 샘플·대표 철새 도래지 좌표 (WGS84) */
const KNOWN_BIRD_SITE_COORDS: Record<string, SiteCoordinates> = {
  m1: { latitude: 34.8868, longitude: 127.5253 },
  m2: { latitude: 36.102, longitude: 126.688 },
  m3: { latitude: 37.7464, longitude: 126.488 },
  m4: { latitude: 35.5546, longitude: 129.2745 },
  m5: { latitude: 37.7976, longitude: 128.9145 },
  m6: { latitude: 35.0956, longitude: 128.9667 },
  순천만: { latitude: 34.8868, longitude: 127.5253 },
  천수만: { latitude: 36.102, longitude: 126.688 },
  강화도: { latitude: 37.7464, longitude: 126.488 },
  태화강: { latitude: 35.5546, longitude: 129.2745 },
  경포호: { latitude: 37.7976, longitude: 128.9145 },
  낙동감: { latitude: 35.0956, longitude: 128.9667 },
};

function parseTourCoordinate(value: string | undefined): number | null {
  if (!value?.trim()) return null;
  const parsed = Number.parseFloat(value);
  if (Number.isNaN(parsed)) return null;

  if (Math.abs(parsed) > 180) {
    return parsed / 1_000_000;
  }

  return parsed;
}

function lookupKnownCoordinates(site: BirdSite): SiteCoordinates | null {
  if (site.id && KNOWN_BIRD_SITE_COORDS[site.id]) {
    return KNOWN_BIRD_SITE_COORDS[site.id];
  }

  for (const [keyword, coords] of Object.entries(KNOWN_BIRD_SITE_COORDS)) {
    if (keyword.length <= 2) continue;
    if (site.title.includes(keyword) || site.address.includes(keyword)) {
      return coords;
    }
  }

  return null;
}

export function resolveBirdSiteCoordinates(site: BirdSite): SiteCoordinates | null {
  let longitude = parseTourCoordinate(site.mapX);
  let latitude = parseTourCoordinate(site.mapY);
  if (
    latitude != null &&
    longitude != null &&
    latitude >= 124 &&
    latitude <= 132 &&
    longitude >= 33 &&
    longitude <= 43
  ) {
    [latitude, longitude] = [longitude, latitude];
  }

  if (
    latitude != null &&
    longitude != null &&
    Math.abs(latitude) <= 90 &&
    Math.abs(longitude) <= 180
  ) {
    return { latitude, longitude };
  }

  return lookupKnownCoordinates(site);
}
