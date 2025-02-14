"use client";

import { useState, useEffect } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000"; // 기본값 추가

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ option }),
      });

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
      const response = await fetch(`${API_BASE_URL}/results`);

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
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="title">실시간 투표</h1>
      <div className="flex space-x-4">
        {["option1", "option2", "option3"].map((option) => (
          <button
            key={option}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={() => handleVote(option)}
          >
            {option} 투표
          </button>
        ))}
      </div>
    </div>
    );
  }
  
