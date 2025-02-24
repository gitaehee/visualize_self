"use client";

import { useEffect, useState } from "react";
import { css } from "@emotion/react";
import { API_BASE_URL } from "@/const/baseApi";
import axios from "axios";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
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
  width: 90%;
  max-width: 800px;
  text-align: left;
`;

const genreMapping: { [key: string]: string } = {
  "After Sunrise": "로맨스",
  "TITANIC": "뮤지컬",
  "Red Room": "공포",
  "장화 싫은 고양이": "애니메이션",
  "CODENAME:000": "액션",
  "왕빙어모": "역사",
  "UFO: the silent invasion": "SF",
  "The seekers of stars": "판타지",
};

// ✅ 커스텀 Tooltip 컴포넌트
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const genre = payload[0].payload.genre || "장르 없음";
    const titles = payload[0].payload.titles && payload[0].payload.titles.length > 0 
      ? payload[0].payload.titles.join(", ") 
      : "영화 없음";
    const count = payload[0].value || 0;

    return (
      <div
        style={{
          background: "white",
          padding: "10px",
          border: "1px solid #ddd",
          borderRadius: "8px",
          color: "black", // ✅ 텍스트가 안 보일 경우 대비
          minWidth: "150px",
          fontSize: "14px",
        }}
      >
        <p style={{ fontWeight: "bold", marginBottom: "5px" }}>🎭 {genre}</p>
        <p>🎬 {titles}</p>
        <p>🍿 {count}표</p>
      </div>
    );
  }
  return null;
};

export default function Results() {
  const [votes, setVotes] = useState<{ title: string; count: number }[]>([]);
  const [genreVotes, setGenreVotes] = useState<{ genre: string; count: number; titles: string[] }[]>([]);
  const [totalVotes, setTotalVotes] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log("🔗 API 요청 중:", `${API_BASE_URL}/results`);
        
        // ✅ axios로 API 요청
        const response = await axios.get(`${API_BASE_URL}/results`);
        const data = response.data;

        if (!data || typeof data !== "object") {
          throw new Error("API 응답이 올바른 JSON 형식이 아닙니다.");
        }

        console.log("📊 API 응답 데이터:", data);

        // ✅ 영화별 투표 데이터 변환
        const formattedVotes = Object.entries(data).map(([title, count]) => ({
          title,
          count: count as number,
        }));
        setVotes(formattedVotes);

        // ✅ 총 투표 수 계산
        setTotalVotes(formattedVotes.reduce((sum, movie) => sum + movie.count, 0));

        // ✅ 장르별 투표 데이터 변환
        const genreCounts: { [key: string]: { count: number; titles: string[] } } = {};
        formattedVotes.forEach(({ title, count }) => {
          const genre = genreMapping[title] || "기타";
          if (!genreCounts[genre]) {
            genreCounts[genre] = { count: 0, titles: [] };
          }
          genreCounts[genre].count += count;
          genreCounts[genre].titles.push(title);
        });

        const formattedGenreVotes = Object.entries(genreCounts).map(([genre, { count, titles }]) => ({
          genre,
          count,
          titles,
        }));
        setGenreVotes(formattedGenreVotes);
      } catch (error: any) {
        console.error("🚨 결과 가져오기 실패:", error);
        setError(error.response?.data?.message || "데이터를 불러오는 데 실패했습니다.");
      }
    };

    fetchResults();
  }, []);

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>🎬 투표 결과</h1>

      {error ? (
        <p style={{ color: "red" }}>❌ 데이터를 불러오지 못했습니다: {error}</p>
      ) : (
        <>
          {/* ✅ 현재 총 투표 수 표시 */}
          <h2 css={subtitleStyle}>🍿 현재 투표 수: {totalVotes}표</h2>

          {/* ✅ 제목별 투표 수 + 팝콘 이모티콘 */}
          <div css={votesContainerStyle}>
            <h3>🎥 영화별 투표 수</h3>
            {votes.length === 0 ? (
              <p>📊 데이터 로딩 중...</p>
            ) : (
              votes.map(({ title, count }) => (
                <p key={title}>
                  <strong>{title}</strong>: {count}표 {"🍿".repeat(count)}
                </p>
              ))
            )}
          </div>

          {/* ✅ 장르별 투표 결과 (그래프) */}
          <div css={votesContainerStyle}>
            <h3>🎭 장르별 투표 결과 (그래프)</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={genreVotes} margin={{ bottom: 80 }}>
                <XAxis dataKey="genre" interval={0} tick={{ fontSize: 8 }}/>
                <YAxis allowDecimals={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
}