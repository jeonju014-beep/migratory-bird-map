"use client";

import { cn } from "@/lib/utils/format";
import type { BirdSpeciesCategory } from "@/types/dashboard";

interface SpeciesBalloonProps {
  category: BirdSpeciesCategory;
  countLabel?: string;
  className?: string;
  tail?: "bottom" | "top";
}

/** 말풍선 스타일 종 설명 패널 */
export function SpeciesBalloon({
  category,
  countLabel,
  className,
  tail = "bottom",
}: SpeciesBalloonProps) {
  return (
    <div
      className={cn(
        "relative max-w-xs rounded-2xl border border-pink-200 bg-gradient-to-br from-white to-pink-50/80 px-4 py-3 text-left shadow-lg shadow-pink-100/60",
        className,
      )}
      role="tooltip"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-rose-800">
        <span
          className="inline-block h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        {category.name}
        {countLabel && (
          <span className="text-xs font-normal text-violet-500">{countLabel}</span>
        )}
      </p>

      {category.description && (
        <p className="mt-2 text-xs leading-relaxed text-rose-800/85">
          {category.description}
        </p>
      )}

      {category.examples && category.examples.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {category.examples.map((example) => (
            <span
              key={example}
              className="rounded-full bg-violet-100/80 px-2 py-0.5 text-[10px] text-violet-700"
            >
              {example}
            </span>
          ))}
        </div>
      )}

      <span
        className={cn(
          "absolute h-3 w-3 rotate-45 border-pink-200 bg-gradient-to-br from-white to-pink-50/80",
          tail === "bottom" &&
            "-bottom-1.5 left-6 border-b border-r shadow-sm",
          tail === "top" &&
            "-top-1.5 left-6 border-l border-t shadow-sm",
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
        className="flex w-full items-center gap-2 rounded-xl px-2 py-1.5 text-left text-xs transition hover:bg-pink-50/80 focus:outline-none focus:ring-2 focus:ring-pink-300"
      >
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{ backgroundColor: category.color }}
        />
        <span className="font-medium text-rose-800">{category.name}</span>
        <span className="text-violet-400">
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
