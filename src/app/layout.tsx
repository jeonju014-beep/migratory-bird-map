import type { Metadata } from "next";
import { Gaegu, Noto_Sans_KR } from "next/font/google";
import "./globals.css";

const notoSans = Noto_Sans_KR({
  variable: "--font-noto",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const gaegu = Gaegu({
  variable: "--font-gaegu",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "철새 맵 ✨ | 댕기머리물떼새와 함께하는 철새 여행",
  description:
    "철새 도래지, 습지, 날씨와 댕기머리물떼새 정보를 귀엽게 한눈에!",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover" as const,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${notoSans.variable} ${gaegu.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
