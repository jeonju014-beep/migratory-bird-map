/** 토스·야놀자 스타일 디자인 토큰 */
export const colors = {
  brand: "#3182F6",
  brandSoft: "#E8F3FF",
  accent: "#FF6B00",
  accentSoft: "#FFF4EB",
  bg: "#F2F4F6",
  surface: "#FFFFFF",
  text: "#191F28",
  textSecondary: "#4E5968",
  textTertiary: "#8B95A1",
  border: "#E5E8EB",
  success: "#00C853",
  successSoft: "#E8FAF0",
  warning: "#FFB020",
  warningSoft: "#FFF8E6",
} as const;

export const chartPalette = [
  "#3182F6",
  "#FF6B00",
  "#00C853",
  "#6366F1",
  "#8B95A1",
  "#06B6D4",
] as const;

export const chartTooltipStyle = {
  borderRadius: "12px",
  border: `1px solid ${colors.border}`,
  background: colors.surface,
  boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
  fontSize: "13px",
  color: colors.text,
} as const;

export const chartGridStroke = colors.border;
