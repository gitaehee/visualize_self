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
  background-image: url("/awardsimages/section2.svg");
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

const buttonStyle = css`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  text-align: center;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #2563eb;
  }
`;

export default function Awards2() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter

  return (
    <div css={containerStyle}>
      <h1 css={messageStyle}>222</h1>
      <button css={buttonStyle} onClick={() => router.push("/awards/awards3")}>
        다음
      </button>
    </div>
  );
}
