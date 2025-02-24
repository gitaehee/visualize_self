"use client";

import { useRouter } from "next/navigation";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  background-image: url("/awardsimages/section4.svg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: white;
`;

const messageStyle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;


export default function Awards4() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter

  return (
    <div css={containerStyle} onClick={() => router.push("/awards/awards5")}>
    </div>
  );
}
