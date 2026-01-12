import type { Metadata } from 'next';
import localFont from 'next/font/local';
import QueryProvider from '../components/providers/query-provider';
import './globals.css';

const pretendard = localFont({
  variable: '--font-pretendard',
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
  weight: '100 900',
  preload: true,
});

export const metadata: Metadata = {
  title: '사진 조회 앱',
  description: 'Picsum Photos API를 이용한 사진 조회 앱',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={`${pretendard.variable}`}>
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
