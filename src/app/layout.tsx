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
  description: "철새 도래 현황과 댕기머리물떼새 세계 서식지를 한눈에 보는 대시보드",
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
