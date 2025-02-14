"use client";

import { useEffect, useState } from "react";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000";

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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">투표 결과 페이지</h1>
      <p className="text-lg font-semibold">현재 1등은?</p>
      <div className="mt-2">
        {Object.entries(votes).map(([key, value]) => (
          <p key={key} className="text-lg">{`${key}: ${value}표`}</p>
        ))}
      </div>
    </div>
  );
}
