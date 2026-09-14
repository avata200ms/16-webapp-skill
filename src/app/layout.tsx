import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Gemini Slide Studio — 발표용 웹 슬라이드 자동 생성기',
  description:
    '텍스트 기획안을 Gemini 2.5 Flash Lite로 분석하여 web-slide-creator 표준 규격의 16:9 반응형 인터랙티브 웹 슬라이드로 즉시 변환합니다.',
  keywords: [
    'Gemini',
    'gemini-2.5-flash-lite',
    'web-slide-creator',
    '웹 슬라이드',
    '프레젠테이션 자동 생성',
    'ApexCharts',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
