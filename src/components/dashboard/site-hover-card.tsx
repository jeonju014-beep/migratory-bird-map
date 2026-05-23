"use client";

import { ExternalLink, MapPin, Phone, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils/format";

interface SiteHoverPanelProps {
  summary: string;
  highlights?: string[];
  homepageUrl?: string;
  mapUrl?: string;
  tel?: string;
  homepageLabel?: string;
  className?: string;
}

export function SiteHoverPanel({
  summary,
  highlights = [],
  homepageUrl,
  mapUrl,
  tel,
  homepageLabel = "공식·상세 페이지",
  className,
}: SiteHoverPanelProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 top-full z-30 mt-1 translate-y-1 rounded-2xl border border-pink-200/90 bg-white/95 p-4 opacity-0 shadow-xl shadow-pink-100/50 backdrop-blur-md transition-all duration-200",
        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
        className,
      )}
    >
      <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-violet-600">
        <Sparkles className="h-3.5 w-3.5 text-pink-400" />
        주요 정보 요약
      </p>
      <p className="text-sm leading-relaxed text-rose-800/85">{summary}</p>

      {highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-1.5 text-xs text-violet-600/90"
            >
              <span className="text-pink-400">✦</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap gap-2 border-t border-pink-100 pt-3">
        {homepageUrl && (
          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1.5 text-xs font-medium text-rose-700 transition hover:bg-pink-200"
          >
            <ExternalLink className="h-3 w-3" />
            {homepageLabel}
          </a>
        )}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1.5 text-xs font-medium text-violet-700 transition hover:bg-violet-200"
          >
            <MapPin className="h-3 w-3" />
            지도 보기
          </a>
        )}
        {tel && (
          <span className="inline-flex items-center gap-1 rounded-full bg-sky-50 px-3 py-1.5 text-xs text-sky-700">
            <Phone className="h-3 w-3" />
            {tel}
          </span>
        )}
      </div>
    </div>
  );
}

interface ListItemShellProps {
  children: React.ReactNode;
  hoverPanel: React.ReactNode;
  borderClass?: string;
}

export function SiteListItem({
  children,
  hoverPanel,
  borderClass = "border-pink-50 hover:border-pink-200 hover:bg-pink-50/50",
}: ListItemShellProps) {
  return (
    <li
      tabIndex={0}
      className={cn(
        "group relative rounded-2xl border bg-white/50 p-4 transition focus:outline-none focus:ring-2 focus:ring-pink-300",
        borderClass,
      )}
    >
      {children}
      {hoverPanel}
      <p className="mt-2 text-[10px] text-violet-300 opacity-0 transition group-hover:opacity-100">
        마우스를 올리면 요약 · 링크가 표시돼요
      </p>
    </li>
  );
}

export function InlineSiteLinks({
  homepageUrl,
  mapUrl,
}: {
  homepageUrl?: string;
  mapUrl?: string;
}) {
  if (!homepageUrl && !mapUrl) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {homepageUrl && (
        <a
          href={homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-pink-500 underline-offset-2 hover:underline"
        >
          홈페이지 →
        </a>
      )}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-violet-500 underline-offset-2 hover:underline"
        >
          지도 →
        </a>
      )}
    </div>
  );
}
