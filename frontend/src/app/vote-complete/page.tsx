"use client";

import { useRouter } from "next/navigation";
import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
  min-height: 100vh;
`;

const messageStyle = css`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const buttonStyle = css`
  padding: 0.75rem 1.5rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;

  &:hover {
    background-color: #2563eb;
  }
`;

export default function VoteCompletePage() {
  const router = useRouter(); // 페이지 이동을 위한 useRouter

  return (
    <div css={containerStyle}>
      <h1 css={messageStyle}>투표가 끝났습니다!</h1>
      <button css={buttonStyle} onClick={() => router.push("/")}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
