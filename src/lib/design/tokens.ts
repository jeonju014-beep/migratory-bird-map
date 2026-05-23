/** 중학생 여자아이 취향 · 파스텔 디자인 토큰 */
export const colors = {
  brand: "#f472b6",
  brandSoft: "#fce7f3",
  accent: "#c084fc",
  accentSoft: "#f3e8ff",
  bg: "#fdf2f8",
  surface: "#ffffff",
  text: "#831843",
  textSecondary: "#9d174d",
  textTertiary: "#a855f7",
  border: "#fbcfe8",
  success: "#2dd4bf",
  successSoft: "#ccfbf1",
  warning: "#fcd34d",
  warningSoft: "#fef9c3",
  mint: "#5eead4",
  mintSoft: "#ccfbf1",
  sky: "#7dd3fc",
  skySoft: "#e0f2fe",
} as const;

export const chartPalette = [
  "#f472b6",
  "#c084fc",
  "#fcd34d",
  "#5eead4",
  "#fda4af",
  "#818cf8",
] as const;

export const chartTooltipStyle = {
  borderRadius: "16px",
  border: "1px solid #fbcfe8",
  background: "#fff1f2",
  boxShadow: "0 8px 24px rgba(244, 114, 182, 0.15)",
  fontSize: "13px",
  color: colors.text,
} as const;

export const chartGridStroke = "#fce7f3";
