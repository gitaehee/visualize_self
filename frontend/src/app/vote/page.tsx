"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { css } from "@emotion/react";
import { API_BASE_URL } from "@/const/baseApi";
import axios from "axios";

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
  margin-bottom: 1.5rem;
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2rem;
  width: 100%;
  max-width: 900px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  justify-items: center;
`;

const movieCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
`;

const posterContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 245px;
  height: 352px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover .description {
    opacity: 1;
  }
`;

const posterStyle = css`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 8px;
  cursor: pointer;
`;

const descriptionStyle = css`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;

  /* 설명글 왼쪽 정렬 */
  padding-left: 10px;

  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;
`;

const buttonStyle = css`
  margin-top: 10px;
  padding: 0.75rem;
  background-color: #3b82f6;
  color: white;
  border-radius: 0.375rem;
  transition: background-color 0.2s ease-in-out;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  text-align: center;
  width: 245px;

  &:hover {
    background-color: #2563eb;
  }
`;

const movies = [
  {
    title: "애프터 선셋",
    genre: "로맨스",
    director: "감독 A",
    actors: "배우1, 배우2",
    runngingtime: "1시간",
    summary: "사랑 이야기",
    poster: "/posters/romance.svg",
  },
  {
    title: "우는 남자",
    genre: "뮤지컬",
    director: "감독 B",
    actors: "배우3, 배우4",
    runngingtime: "2시간",
    summary: "음악과 춤 이야기",
    poster: "/posters/musical.svg",
  },
  {
    title: "무서워",
    genre: "스릴러",
    director: "감독 C",
    actors: "배우5, 배우6",
    runngingtime: "2시간",
    summary: "긴장감 넘치는 이야기",
    poster: "/posters/thriller.svg",
  },
  {
    title: "장화 안 신은 고양이",
    genre: "애니메이션",
    director: "감독 D",
    actors: "배우7, 배우8",
    runngingtime: "1시간",
    summary: "애니메이션 모험",
    poster: "/posters/animation.svg",
  },
  {
    title: "액션히어로",
    genre: "액션",
    director: "감독 E",
    actors: "배우9, 배우10",
    runngingtime: "3시간",
    summary: "스릴 넘치는 액션",
    poster: "/posters/action.svg",
  },
  {
    title: "태정태세문단세",
    genre: "역사",
    director: "감독 F",
    actors: "배우11, 배우12",
    runngingtime: "3시간",
    summary: "역사적 사실 기반",
    poster: "/posters/history.svg",
  },
  {
    title: "아마..존",
    genre: "코미디",
    director: "감독 G",
    actors: "배우13, 배우14",
    runngingtime: "2시간",
    summary: "유쾌한 이야기",
    poster: "/posters/comedy.svg",
  },
  {
    title: "ufo 판타지",
    genre: "판타지",
    director: "감독 H",
    actors: "배우15, 배우16",
    runngingtime: "3시간",
    summary: "마법과 모험",
    poster: "/posters/fantasy.svg",
  },
];

export default function Vote() {
  const router = useRouter();
  const [activeMovie, setActiveMovie] = useState<string | null>(null);

  const toggleDescription = (title: string) => {
    setActiveMovie(activeMovie === title ? null : title);
  };

  const handleVote = async (title: string) => {
    console.log("📌 전송할 option 값:", title);

    if (!title || typeof title !== "string") {
      console.error("❌ 잘못된 option 값:", title);
      return;
    }

    const confirmed = confirm(`'${title}'를 예약하시겠습니까?`);
    if (!confirmed) return;

    try {
      const response = await axios.post(`${API_BASE_URL}/vote`, {
        option: title,
      });

      console.log("📩 응답 상태 코드:", response.status);

      if (response.status === 200) {
        router.push("/vote-complete");
      } else {
        console.error("❌ 서버 응답 오류:", response.statusText);
      }
    } catch (error: any) {
      console.error(
        "❌ 투표 요청 실패:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div css={containerStyle}>
      <h1 css={titleStyle}>영화 예약</h1>
      <p>포스터를 클릭하면 상세 내용이 보여요!</p>
      <div css={gridContainerStyle}>
        {movies.map((movie) => (
          <div key={movie.title} css={movieCardStyle}>
            <div
              css={posterContainerStyle}
              onClick={() => toggleDescription(movie.title)}
            >
              <div
                css={[
                  descriptionStyle,
                  activeMovie === movie.title && {
                    opacity: 1,
                    pointerEvents: "auto",
                  },
                ]}
                className="description"
              >
                <p>
                  <strong>{movie.title}</strong>
                </p>
                <p>장르: {movie.genre}</p>
                <p>감독: {movie.director}</p>
                <p>출연: {movie.actors}</p>
                <p>상영시간: {movie.runngingtime}</p>
                <p>{movie.summary}</p>
              </div>
              <img src={movie.poster} alt={movie.title} css={posterStyle} />
            </div>
            <button css={buttonStyle} onClick={() => handleVote(movie.title)}>
              {movie.title} 예약
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
