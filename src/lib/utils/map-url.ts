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
