"use client";

import { useState, useEffect } from "react";
import { css } from "@emotion/react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"; // 기본값 추가


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
  margin-bottom: 1.5rem;
`;

const buttonContainerStyle = css`
  display: flex;
  gap: 1rem;
`;

const buttonStyle = css`
  padding: 0.5rem 1rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #2563eb;
  }
`;




export default function Vote() {
  const [votes, setVotes] = useState<{ option1: number; option2: number; option3: number }>({
    option1: 0,
    option2: 0,
    option3: 0,
  });

  const handleVote = async (option: string) => {

      // ✅ API 요청 URL이 올바른지 콘솔에서 확인
    console.log("API 요청 URL:", `${API_BASE_URL}/vote`);

    try {
      const response = await fetch(`${API_BASE_URL}/vote`, {
        method: "POST",
        mode: "cors",  // CORS 요청 방식 명시
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ option }),
      });

      console.log("Response status:", response.status);  // ✅ 응답 상태 출력
      
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      if (data.votes) {
        setVotes(data.votes); // 업데이트된 투표 결과 반영
      }

    } catch (error) {
      console.error("투표 요청 실패:", error);
    }
  };

  const fetchResults = async () => {
    console.log("API 요청 URL:", `${API_BASE_URL}/results`);

    try {
      const response = await fetch(`${API_BASE_URL}/results`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
      });
  
      console.log("Response status:", response.status);  // ✅ 응답 상태 출력

      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      setVotes(data);
    } catch (error) {
      console.error("결과 가져오기 실패:", error);
    }
  };

  useEffect(() => {
    fetchResults();
  }, []);



    return (
      <div css={containerStyle}>
        <h1 css={titleStyle}>실시간 투표</h1>
        <div css={buttonContainerStyle}>
          {["option1", "option2", "option3"].map((option) => (
            <button key={option} css={buttonStyle} onClick={() => handleVote(option)}>
              {option} 투표
            </button>
          ))}
        </div>
      </div>
    );
  }
  
