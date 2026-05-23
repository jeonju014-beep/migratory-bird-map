"use client";

import { ExternalLink, MapPin, Phone } from "lucide-react";
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
        "pointer-events-none absolute left-0 right-0 top-full z-30 mt-1 translate-y-1 rounded-xl border border-border bg-surface p-4 opacity-0 shadow-lg transition-all duration-200",
        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
        className,
      )}
    >
      <p className="mb-2 text-xs font-semibold text-text-secondary">주요 정보</p>
      <p className="text-sm leading-relaxed text-text">{summary}</p>

      {highlights.length > 0 && (
        <ul className="mt-2 space-y-1">
          {highlights.map((item) => (
            <li
              key={item}
              className="flex items-start gap-1.5 text-xs text-text-secondary"
            >
              <span className="text-brand">·</span>
              {item}
            </li>
          ))}
        </ul>
      )}

      <div className="mt-3 flex flex-wrap gap-2 border-t border-border pt-3">
        {homepageUrl && (
          <a
            href={homepageUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 rounded-lg bg-brand px-3 py-1.5 text-xs font-medium text-white transition hover:bg-brand/90"
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
            className="inline-flex items-center gap-1 rounded-lg border border-border bg-surface px-3 py-1.5 text-xs font-medium text-text transition hover:bg-bg"
          >
            <MapPin className="h-3 w-3" />
            지도 보기
          </a>
        )}
        {tel && (
          <span className="inline-flex items-center gap-1 rounded-lg bg-bg px-3 py-1.5 text-xs text-text-secondary">
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
  borderClass = "border-border hover:border-brand/40 hover:bg-bg/50",
}: ListItemShellProps) {
  return (
    <li
      tabIndex={0}
      className={cn(
        "group relative rounded-xl border bg-surface p-4 transition focus:outline-none focus:ring-2 focus:ring-brand-soft",
        borderClass,
      )}
    >
      {children}
      {hoverPanel}
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
    <div className="mt-2 flex flex-wrap gap-3">
      {homepageUrl && (
        <a
          href={homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-brand underline-offset-2 hover:underline"
        >
          홈페이지
        </a>
      )}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs font-medium text-text-secondary underline-offset-2 hover:underline"
        >
          지도
        </a>
      )}
    </div>
  );
}
