"use client";

import { useChartHeight } from "@/hooks/use-media-query";

export function ChartFrame({
  mobileHeight,
  desktopHeight,
  children,
}: {
  mobileHeight: number;
  desktopHeight: number;
  children: (height: number) => React.ReactNode;
}) {
  const height = useChartHeight(mobileHeight, desktopHeight);
  return <>{children(height)}</>;
}
