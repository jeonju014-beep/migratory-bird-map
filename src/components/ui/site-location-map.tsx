"use client";

import { useState } from "react";
import { ExternalLink, MapPin } from "lucide-react";
import { cn } from "@/lib/utils/format";
import {
  buildMapSearchLink,
  buildOpenStreetMapLink,
  buildStaticMapImageUrl,
} from "@/lib/utils/map-url";

interface SiteLocationMapProps {
  title: string;
  address?: string;
  latitude?: number;
  longitude?: number;
  className?: string;
}

export function SiteLocationMap({
  title,
  address,
  latitude,
  longitude,
  className,
}: SiteLocationMapProps) {
  const [mapFailed, setMapFailed] = useState(false);
  const hasCoords = latitude != null && longitude != null;
  const mapLink = hasCoords
    ? buildOpenStreetMapLink(latitude, longitude)
    : buildMapSearchLink(title, address);
  const embedFallbackUrl = hasCoords
    ? (() => {
        const delta = 0.015;
        const bbox = [
          longitude! - delta,
          latitude! - delta,
          longitude! + delta,
          latitude! + delta,
        ].join(",");
        return `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${latitude}%2C${longitude}`;
      })()
    : null;
  const staticMapUrl =
    hasCoords && !mapFailed
      ? buildStaticMapImageUrl(latitude, longitude)
      : null;

  return (
    <div className={cn("overflow-hidden rounded-lg border border-border", className)}>
      {staticMapUrl ? (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="group/map block"
          aria-label={`${title} 지도에서 크게 보기`}
        >
          <div className="relative h-32 w-full bg-sky-50 sm:h-36">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={staticMapUrl}
              alt={`${title} 위치 지도`}
              className="h-full w-full object-cover transition group-hover/map:brightness-95"
              loading="eager"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={() => setMapFailed(true)}
            />
            <span className="absolute bottom-2 right-2 inline-flex items-center gap-1 rounded-lg bg-surface/90 px-2 py-1 text-[10px] font-medium text-text shadow-sm backdrop-blur-sm">
              <ExternalLink className="h-3 w-3" />
              크게 보기
            </span>
          </div>
        </a>
      ) : mapFailed && embedFallbackUrl ? (
        <div className="relative h-32 w-full bg-sky-50 sm:h-36">
          <iframe
            title={`${title} 위치 지도`}
            src={embedFallbackUrl}
            className="h-full w-full border-0"
            loading="eager"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      ) : (
        <a
          href={mapLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex h-32 flex-col items-center justify-center gap-2 bg-gradient-to-br from-sky-50 to-violet-50 px-4 text-center sm:h-36"
        >
          <MapPin className="h-6 w-6 text-brand" />
          <span className="text-xs font-medium text-text">지도에서 위치 보기</span>
          <span className="text-[10px] text-text-tertiary">탭하면 지도 앱/웹이 열려요</span>
        </a>
      )}

      {(address || hasCoords) && (
        <p className="flex items-start gap-1 border-t border-border bg-bg/80 px-2 py-1.5 text-[10px] leading-snug text-text-tertiary">
          <MapPin className="mt-0.5 h-3 w-3 shrink-0 text-brand" />
          <span>
            {address ??
              `${latitude?.toFixed(4)}°N, ${longitude?.toFixed(4)}°E`}
          </span>
        </p>
      )}
    </div>
  );
}
