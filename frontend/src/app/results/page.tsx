"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";


const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
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
  const [votes, setVotes] = useState<{ option1: number; option2: number; option3: number }>({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/results`);
        const data = await response.json();
        setVotes(data);
      } catch (error) {
        console.error("Failed to fetch results:", error);
      }
    };

    fetchResults();
  }, []);

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>투표 결과 페이지</h1>
      <p css={subtitleStyle}>현재 1등은?</p>
      <div css={votesContainerStyle}>
        {Object.entries(votes).map(([key, value]) => (
          <p key={key} css={voteItemStyle}>{`${key}: ${value}표`}</p>
        ))}
      </div>
    </div>
  );
}
