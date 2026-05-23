"use client";

import { cn } from "@/lib/utils/format";
import type { BirdSpeciesCategory } from "@/types/dashboard";

interface SpeciesBalloonProps {
  category: BirdSpeciesCategory;
  countLabel?: string;
  className?: string;
  tail?: "bottom" | "top";
}

export function SpeciesBalloon({
  category,
  countLabel,
  className,
  tail = "bottom",
}: SpeciesBalloonProps) {
  return (
    <div
      className={cn(
        "relative max-w-xs rounded-xl border border-border bg-surface px-4 py-3 text-left shadow-lg",
        className,
      )}
      role="tooltip"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-text">
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
            <span
              key={example}
              className="rounded-md bg-brand-soft px-2 py-0.5 text-[10px] text-brand"
            >
              {example}
            </span>
          ))}
        </div>
      )}

      <span
        className={cn(
          "absolute h-3 w-3 rotate-45 border-border bg-surface",
          tail === "bottom" && "-bottom-1.5 left-6 border-b border-r",
          tail === "top" && "-top-1.5 left-6 border-l border-t",
        )}
        aria-hidden
      />
    </div>
  );
}

interface SpeciesLegendItemProps {
  category: BirdSpeciesCategory;
  total: number;
}

export function SpeciesLegendItem({ category, total }: SpeciesLegendItemProps) {
  const percent = total > 0 ? Math.round((category.count / total) * 100) : 0;

  return (
    <li className="group relative">
      <button
        type="button"
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-left text-xs transition hover:bg-bg focus:outline-none focus:ring-2 focus:ring-brand-soft"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium text-text">{category.name}</span>
        <span className="text-text-tertiary">
          {category.count}종 · {percent}%
        </span>
      </button>

      <div
        className={cn(
          "pointer-events-none absolute bottom-full left-0 z-40 mb-2 opacity-0 transition-all duration-200",
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
