"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Global, css } from "@emotion/react";
import Link from "next/link"; // 이걸로 페이지 import 해오기
import Image from "next/image"; // 최적화로 불러오기

const globalStyles = css`
  body {
    margin: 0;
    background: #303030;
    color: white;
  }
`;

const navbarStyle = css`
  background: white;
  padding: 20px;
`;

const linkStyle = css`
  margin-right: 10px;
  text-decoration: none;
`;

const logoStyle = css`
  position: relative;
  top: 3px; /* 로고 위치 조정 */
`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ 추가: Head 내부에 필요한 태그를 선언 (필요한 경우) */}
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Global styles={globalStyles} /> {/* ✅ Global 위치 수정 (body 내부) */}
        <div css={navbarStyle}> {/* 헤더 같은 느낌, html 안에 작성 */}
          <Link href="/" css={linkStyle}>
            홈
            <Image src="/logo.svg" alt="홈 로고" width={20} height={20} css={logoStyle} />
          </Link>
          <Link href="/visualize" css={linkStyle}>시각화</Link>
          <Link href="/awards" css={linkStyle}>어워즈</Link>
          <Link href="/vote" css={linkStyle}>투표</Link>
          <Link href="/results" css={linkStyle}>투표결과</Link>
        </div>
        {children}
      </body>
    </html>
  );
}
