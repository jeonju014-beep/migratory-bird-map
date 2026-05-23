"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/format";
import { useIsMobile } from "@/hooks/use-media-query";
import {
  getBirdSpeciesInfo,
  parseBirdNameSegments,
  type BirdSpeciesInfo,
} from "@/lib/mock/bird-species-catalog";

interface BirdSpeciesCardProps {
  name: string;
  info: BirdSpeciesInfo | null;
  className?: string;
  showTail?: boolean;
}

export function BirdSpeciesCard({
  name,
  info,
  className,
  showTail = false,
}: BirdSpeciesCardProps) {
  const displayName = info?.koreanName ?? name;

  return (
    <div
      className={cn(
        "relative w-56 overflow-hidden rounded-xl border border-border bg-surface text-left shadow-lg shadow-pink-100/30",
        className,
      )}
      role="tooltip"
    >
      {info?.imageUrl ? (
        <div className="relative h-28 w-full bg-gradient-to-br from-pink-50 to-violet-50">
          <Image
            src={info.imageUrl}
            alt={displayName}
            fill
            className="object-cover"
            sizes="224px"
            unoptimized
          />
        </div>
      ) : (
        <div className="flex h-20 items-center justify-center bg-gradient-to-br from-pink-50 to-violet-50 text-3xl">
          🐦
        </div>
      )}

      <div className="px-3 py-2.5">
        <p className="text-sm font-semibold text-text">{displayName}</p>
        {(info?.englishName || info?.scientificName) && (
          <p className="mt-0.5 text-[10px] text-text-tertiary">
            {[info?.englishName, info?.scientificName].filter(Boolean).join(" · ")}
          </p>
        )}
        <p className="mt-1.5 text-xs leading-relaxed text-text-secondary">
          {info?.description ??
            "아직 카드가 준비되지 않은 종이에요. 공공데이터·관측 기록에 등장한 철새 이름입니다."}
        </p>
        {info?.imageCredit && (
          <p className="mt-1 text-[9px] text-text-tertiary">📷 {info.imageCredit}</p>
        )}
      </div>

      {showTail && (
        <span
          className="absolute -bottom-1.5 left-6 h-3 w-3 rotate-45 border-b border-r border-border bg-surface"
          aria-hidden
        />
      )}
    </div>
  );
}

interface BirdNameHoverProps {
  name: string;
  className?: string;
  variant?: "inline" | "tag" | "list";
}

export function BirdNameHover({
  name,
  className,
  variant = "inline",
}: BirdNameHoverProps) {
  const info = getBirdSpeciesInfo(name);
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  const baseClass =
    variant === "tag"
      ? "rounded-md bg-brand-soft px-2 py-0.5 text-[10px] font-medium text-brand underline-offset-2 hover:bg-brand/15"
      : variant === "list"
        ? "font-semibold text-text underline decoration-brand/30 decoration-dotted underline-offset-2 hover:text-brand"
        : "cursor-help font-medium text-brand underline decoration-brand/40 decoration-dotted underline-offset-2 hover:decoration-brand";

  return (
    <span className={cn("group/bird relative inline", className)}>
      <button
        type="button"
        onClick={() => {
          if (isMobile) setOpen((value) => !value);
        }}
        className={cn(
          baseClass,
          "rounded-sm transition focus:outline-none focus:ring-2 focus:ring-brand-soft",
          isMobile && open && "ring-2 ring-brand-soft",
          className,
        )}
        aria-expanded={open}
        aria-label={`${name} 조류 정보`}
      >
        {name}
      </button>

      {open && isMobile && (
        <span className="absolute left-0 top-full z-50 mt-1 block">
          <BirdSpeciesCard name={name} info={info} />
        </span>
      )}

      <span
        className={cn(
          "pointer-events-none absolute bottom-full left-0 z-50 mb-2 hidden opacity-0 transition-all duration-200 md:block",
          "group-hover/bird:pointer-events-auto group-hover/bird:opacity-100",
          "group-focus-within/bird:pointer-events-auto group-focus-within/bird:opacity-100",
        )}
      >
        <BirdSpeciesCard name={name} info={info} showTail />
      </span>
    </span>
  );
}

export function BirdNamesText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const segments = parseBirdNameSegments(text);

  if (segments.length === 0) {
    return <span className={className}>{text}</span>;
  }

  return (
    <span className={cn("leading-relaxed", className)}>
      {segments.map((segment, index) =>
        segment.type === "text" ? (
          <span key={`${segment.value}-${index}`}>{segment.value}</span>
        ) : (
          <BirdNameHover key={`${segment.value}-${index}`} name={segment.value} />
        ),
      )}
      {text.trim().endsWith("등") && <span> 등</span>}
    </span>
  );
}
