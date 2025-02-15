"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ 페이지 이동을 위한 useRouter 추가
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
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* 2x4 그리드 형태 */
  gap: 1rem;
  width: 100%;
  max-width: 400px;
`;


const buttonStyle = css`
  padding: 0.75rem;
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





export default function Vote() {
  const router = useRouter(); // ✅ 페이지 이동을 위한 useRouter 추가
  const genres = ["로맨스", "뮤지컬", "스릴러", "애니메이션", "액션", "역사", "코미디", "판타지"];
  const [votes, setVotes] = useState<{ [key: string]: number }>({});

  const handleVote = async (genre: string) => {
    const confirmed = confirm(`'${genre}'를 선택하시겠습니까?`); // ✅ 사용자에게 확인창 표시
    if (!confirmed) return; // 취소 버튼을 누르면 실행 중단

      // ✅ API 요청 URL이 올바른지 콘솔에서 확인
    console.log("API 요청 URL:", `${API_BASE_URL}/vote`);

    try {
      const response = await fetch(`${API_BASE_URL}/vote`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ option: genre }),
      });

      console.log("Response status:", response.status);  // ✅ 응답 상태 출력
      
      if (!response.ok) {
        throw new Error(`서버 오류: ${response.status}`);
      }

      const data = await response.json();
      if (data.votes) {
        setVotes(data.votes); // 업데이트된 투표 결과 반영
      }

      router.push("/vote-complete"); // ✅ "확인"을 누르면 투표 완료 페이지로 이동

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
        {genres.map((genre) => (
          <button key={genre} css={buttonStyle} onClick={() => handleVote(genre)}>
            {genre} 투표
          </button>
        ))}
      </div>
    </div>
  );
  }
  
