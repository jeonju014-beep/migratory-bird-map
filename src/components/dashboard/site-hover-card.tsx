"use client";

import { useState } from "react";
import { ChevronDown, ExternalLink, MapPin, Phone } from "lucide-react";
import { cn } from "@/lib/utils/format";

export interface SiteDetailPanelProps {
  summary: string;
  highlights?: string[];
  homepageUrl?: string;
  mapUrl?: string;
  tel?: string;
  homepageLabel?: string;
  className?: string;
}

export function SiteDetailPanel({
  summary,
  highlights = [],
  homepageUrl,
  mapUrl,
  tel,
  homepageLabel = "공식·상세 페이지",
  className,
}: SiteDetailPanelProps) {
  return (
    <div className={cn("rounded-xl border border-border bg-bg/80 p-3", className)}>
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
            className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-brand px-3 py-2 text-xs font-medium text-white active:scale-[0.98]"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {homepageLabel}
          </a>
        )}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-10 items-center gap-1 rounded-xl border border-border bg-surface px-3 py-2 text-xs font-medium text-text active:scale-[0.98]"
          >
            <MapPin className="h-3.5 w-3.5" />
            지도 보기
          </a>
        )}
        {tel && (
          <a
            href={`tel:${tel.replace(/\s/g, "")}`}
            className="inline-flex min-h-10 items-center gap-1 rounded-xl bg-bg px-3 py-2 text-xs text-text-secondary"
          >
            <Phone className="h-3.5 w-3.5" />
            {tel}
          </a>
        )}
      </div>
    </div>
  );
}

export function SiteHoverPanel(props: SiteDetailPanelProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 top-full z-30 mt-1 hidden translate-y-1 opacity-0 transition-all duration-200 md:block",
        "group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100",
        "group-focus-within:pointer-events-auto group-focus-within:translate-y-0 group-focus-within:opacity-100",
      )}
    >
      <SiteDetailPanel
        {...props}
        className="border-pink-200 bg-surface shadow-xl shadow-pink-100/40"
      />
    </div>
  );
}

interface ListItemShellProps {
  children: React.ReactNode;
  detailPanel: SiteDetailPanelProps;
  borderClass?: string;
}

export function SiteListItem({
  children,
  detailPanel,
  borderClass = "border-border hover:border-brand/40 hover:bg-bg/50",
}: ListItemShellProps) {
  const [open, setOpen] = useState(false);

  return (
    <li
      tabIndex={0}
      className={cn(
        "group relative rounded-xl border bg-surface transition focus:outline-none focus:ring-2 focus:ring-brand-soft",
        borderClass,
      )}
    >
      <div className="p-3 sm:p-4">{children}</div>

      <div className="border-t border-border/60 px-3 pb-3 md:hidden">
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="flex w-full min-h-11 items-center justify-between rounded-lg px-1 text-xs font-medium text-brand"
          aria-expanded={open}
        >
          {open ? "접기" : "자세히 보기"}
          <ChevronDown
            className={cn("h-4 w-4 transition", open && "rotate-180")}
          />
        </button>
        {open && <SiteDetailPanel {...detailPanel} className="mt-2" />}
      </div>

      <SiteHoverPanel {...detailPanel} />
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
    <div className="mt-2 flex flex-wrap gap-3 md:hidden">
      {homepageUrl && (
        <a
          href={homepageUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center text-xs font-medium text-brand underline-offset-2 active:opacity-70"
        >
          홈페이지
        </a>
      )}
      {mapUrl && (
        <a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-9 items-center text-xs font-medium text-text-secondary underline-offset-2 active:opacity-70"
        >
          지도
        </a>
      )}
    </div>
  );
}
