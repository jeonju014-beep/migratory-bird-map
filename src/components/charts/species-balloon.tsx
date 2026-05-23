"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils/format";
import { useIsMobile } from "@/hooks/use-media-query";
import { BirdNameHover } from "@/components/ui/bird-name-hover";
import type { BirdSpeciesCategory } from "@/types/dashboard";

interface SpeciesBalloonProps {
  category: BirdSpeciesCategory;
  countLabel?: string;
  className?: string;
  tail?: "bottom" | "top";
  showTail?: boolean;
}

export function SpeciesBalloon({
  category,
  countLabel,
  className,
  tail = "bottom",
  showTail = true,
}: SpeciesBalloonProps) {
  return (
    <div
      className={cn(
        "relative max-w-xs rounded-xl border border-border bg-surface px-4 py-3 text-left shadow-lg",
        className,
      )}
      role="tooltip"
    >
      <p className="flex flex-wrap items-center gap-2 text-sm font-semibold text-text">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        {category.name}
        {countLabel && (
          <span className="text-xs font-normal text-text-tertiary">
            {countLabel}
          </span>
        )}
      </p>

      {category.description && (
        <p className="mt-2 text-xs leading-relaxed text-text-secondary">
          {category.description}
        </p>
      )}

      {category.examples && category.examples.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {category.examples.map((example) => (
            <BirdNameHover key={example} name={example} variant="tag" />
          ))}
        </div>
      )}

      {showTail && (
        <span
          className={cn(
            "absolute h-3 w-3 rotate-45 border-border bg-surface",
            tail === "bottom" && "-bottom-1.5 left-6 border-b border-r",
            tail === "top" && "-top-1.5 left-6 border-l border-t",
          )}
          aria-hidden
        />
      )}
    </div>
  );
}

interface SpeciesLegendItemProps {
  category: BirdSpeciesCategory;
  total: number;
}

export function SpeciesLegendItem({ category, total }: SpeciesLegendItemProps) {
  const percent = total > 0 ? Math.round((category.count / total) * 100) : 0;
  const [open, setOpen] = useState(false);
  const isMobile = useIsMobile();

  return (
    <li className="group relative rounded-lg border border-transparent md:border-0">
      <button
        type="button"
        onClick={() => {
          if (isMobile) setOpen((value) => !value);
        }}
        className="flex w-full min-h-11 items-center gap-2 rounded-lg px-2 py-2 text-left text-xs transition hover:bg-bg focus:outline-none focus:ring-2 focus:ring-brand-soft md:min-h-0 md:py-1.5"
        aria-expanded={open}
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium text-text">{category.name}</span>
        <span className="text-text-tertiary">
          {category.count}종 · {percent}%
        </span>
        <ChevronDown
          className={cn("ml-auto h-4 w-4 text-brand md:hidden", open && "rotate-180")}
        />
      </button>

      {open && (
        <div className="px-2 pb-2 md:hidden">
          <SpeciesBalloon
            category={category}
            countLabel={`${category.count}종 · ${percent}%`}
            showTail={false}
            className="max-w-none shadow-none"
          />
        </div>
      )}

      <div
        className={cn(
          "pointer-events-none absolute bottom-full left-0 z-40 mb-2 hidden opacity-0 transition-all duration-200 md:block",
          "group-hover:pointer-events-auto group-hover:opacity-100",
          "group-focus-within:pointer-events-auto group-focus-within:opacity-100",
        )}
      >
        <SpeciesBalloon
          category={category}
          countLabel={`${category.count}종 · ${percent}%`}
          tail="bottom"
        />
      </div>
    </li>
  );
}
