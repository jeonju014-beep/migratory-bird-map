/** 서식지·이동경로용 세계 지형 지도 URL (정사도 투영, 우선순위 순) */
export function getWorldMigrationMapUrls(): string[] {
  return [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1920px-Blue_Marble_2002.png",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/The_Blue_Marble_%28remastered%29.jpg/1280px-The_Blue_Marble_%28remastered%29.jpg",
    "https://upload.wikimedia.org/wikipedia/commons/thumb/2/23/Blue_Marble_2002.png/1280px-Blue_Marble_2002.png",
    buildWorldMigrationMapOsmUrl(),
  ];
}

export function buildWorldMigrationMapOsmUrl(width = 1200, height = 560) {
  return `https://staticmap.openstreetmap.de/staticmap.php?center=42,85&zoom=2&size=${width}x${height}&maptype=mapnik`;
}

export function buildStaticMapImageUrl(
  latitude: number,
  longitude: number,
  width = 640,
  height = 256,
): string {
  const center = `${latitude},${longitude}`;
  const markers = `${latitude},${longitude},lightblue1`;
  return `https://staticmap.openstreetmap.de/staticmap.php?center=${center}&zoom=13&size=${width}x${height}&maptype=mapnik&markers=${markers}`;
}

export function buildOpenStreetMapLink(latitude: number, longitude: number): string {
  return `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=14/${latitude}/${longitude}`;
}

export function buildMapSearchLink(label: string, address?: string): string {
  const query = [label, address].filter(Boolean).join(" ").trim();
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

/** HTTP 이미지 URL을 HTTPS 페이지에서도 표시 가능하게 보정 */
export function normalizeExternalUrl(url: string): string {
  if (url.startsWith("http://usmigrant.ulsanbdc.or.kr")) {
    return url.replace("http://", "https://");
  }
  return url;
}
