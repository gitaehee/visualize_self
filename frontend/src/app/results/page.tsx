"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/react";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000" || "http://127.0.0.1:5000";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  /*
  margin-top: 100px;
  */
  min-height: 100vh;
`;

const titleStyle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const subtitleStyle = css`
  font-size: 1.125rem;
  font-weight: 600;
`;

const votesContainerStyle = css`
  margin-top: 0.5rem;
`;

const voteItemStyle = css`
  font-size: 1.125rem;
`;

export default function Results() {
  const [votes, setVotes] = useState<{ [key: string]: number }>({}); // ✅ 동적으로 옵션 수용 가능

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/results`);
        const data = await response.json();

        // 객체 형태를 차트용 배열로 변환
        const formattedData = Object.entries(data).map(([key, value]) => ({
          name: key,
          votes: value as number,
        }));

        setVotes(data); // ✅ 8개 옵션을 백엔드에서 받아 자동 반영
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div css={containerStyle}>
      {/*
      <h1 css={titleStyle}>투표 결과 페이지</h1>
      <p css={subtitleStyle}>현재 투표 현황</p>
      <div css={votesContainerStyle}>
        {Object.entries(votes).map(([genre, count]) => (
          <p key={genre} css={voteItemStyle}>{`${genre}: ${count}표`}</p>
        ))}
      </div>
      */}

      {/* ✅ Streamlit 결과를 불러와서 시각화 */}
      <iframe
        src="http://localhost:8501/?graph=bar"
        //src="https://movie-visualize.streamlit.app/"
        style={{
          width: "100%",
          maxWidth: "100vw",
          height: "100vh",
          overflow: "hidden",
          border: "none",
        }} // ✅ 인라인 스타일 사용, 가로 꽉 채우기
        title="Streamlit Visualization"
      />
    </div>
  );
}
