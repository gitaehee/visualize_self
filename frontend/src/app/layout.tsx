"use client";

import { Geist, Geist_Mono } from "next/font/google";
import { Global, css } from "@emotion/react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const globalStyles = css`
  body {
    background: radial-gradient(
        circle at 35% 50%,
        /* X축(35%)과 Y축(50%) 위치에서 빛 발산 */ rgba(255, 204, 0, 0.3),
        /* Golden 노란빛 (중심부) */ transparent 70%
          /* 바깥쪽으로 갈수록 투명해짐 */
      ),
      #000; /* 전체 배경 검정색 */
    margin: 0;
    color: white;
    font-family: "Pretendard", sans-serif;
  }
`;

const navbarStyle = css`
  background: #303030;
  padding: 15px 20px 0 20px;
  width: 100vw;
  display: flex;
  align-items: center;
  gap: 20px;
`;

const linkStyle = css`
  color: #c0c0c0;
  text-decoration: none;
  padding: 20px 15px;
  border-radius: 8px 8px 0 0;
  transition: all 0.3s;

  &:hover {
    color: #ffffff;
  }
`;

const activeLinkStyle = css`
  background: linear-gradient(to bottom, #ffffff, #2a2a2a);
  color: #000000;
`;

const logoStyle = css`
  position: relative;
  top: 3px;
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
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>My App</title>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Global styles={globalStyles} />
        <div css={navbarStyle}>
          <Link href="/" css={[linkStyle, isActive("/") && activeLinkStyle]}>
            홈
            <Image
              src="/logo.svg"
              alt="홈 로고"
              width={20}
              height={20}
              css={logoStyle}
            />
          </Link>
          <Link
            href="/visualize"
            css={[linkStyle, isActive("/visualize") && activeLinkStyle]}
          >
            시각화
          </Link>
          <Link
            href="/explore"
            css={[linkStyle, isActive("/explore") && activeLinkStyle]}
          >
            데이터탐색
          </Link>
          <Link
            href="/awards"
            css={[linkStyle, isActive("/awards") && activeLinkStyle]}
          >
            어워즈
          </Link>
          <Link
            href="/vote"
            css={[linkStyle, isActive("/vote") && activeLinkStyle]}
          >
            투표
          </Link>
          <Link
            href="/results"
            css={[linkStyle, isActive("/results") && activeLinkStyle]}
          >
            투표결과
          </Link>
        </div>
        {children}
      </body>
    </html>
  );
}
