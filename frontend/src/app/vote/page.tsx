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

   /* 설명글 왼쪽 정렬 */
  text-align: left;
 
  padding: 10px;

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
    title: "After Sunrise",
    genre: "로맨스",
    director: "감독 A",
    actors: "배우1, 배우2",
    runngingtime: "1시간",
    summary: "폭풍우로 배가 난파되고 아름다운 섬에 떠내려온 연인. 그러나 이 섬에는 특별한 비밀이 있다. 아침이 올 때마다 사랑을 다시 시작해야 하는 그들의 기적 같은 이야기.",
    poster: "/posters/romance.svg",
  },
  {
    title: "TITANIC",
    genre: "뮤지컬",
    director: "감독 B",
    actors: "배우3, 배우4",
    runngingtime: "2시간",
    summary: "거대한 꿈, 찬란한 희망, 그리고 운명의 밤. 전 세계를 감동시킨 타이타닉이 뮤지컬 영화로 돌아온다.",
    poster: "/posters/musical.svg",
  },
  {
    title: "Red Room",
    genre: "공포",
    director: "감독 C",
    actors: "배우5, 배우6",
    runngingtime: "2시간",
    summary: "홍수로 인해 갑자기 묵게 된 호텔. 위층에서 먼저 올라간 아내의 목소리가 들리고, 빨간 문을 연 순간 수십 개의 똑같은 얼굴이 천천히 고개를 돌리는데..!",
    poster: "/posters/horror.svg",
  },
  {
    title: "장화 싫은 고양이",
    genre: "애니메이션",
    director: "감독 D",
    actors: "배우7, 배우8",
    runngingtime: "1시간",
    summary: "매일 비가 오는 ‘소나기’ 마을에 사는 고양이 ‘토토’. 언제나 햇빛과 먹을 것이 가득하다는 츄르월드를 찾아 모험을 떠나게 되는데..!",
    poster: "/posters/animation.svg",
  },
  {
    title: "CODENAME:000",
    genre: "액션",
    director: "감독 E",
    actors: "배우9, 배우10",
    runngingtime: "3시간",
    summary: "최초의 첩보요원. 코드네임 000. 국적, 성별, 나이 미상. 다양한 세력이 갑자기 돌아온 그를 쫓는다. 그는 왜 돌아온 것일까? 올해, 가장 위험한 요원이 깨어난다.",
    poster: "/posters/action.svg",
  },
  {
    title: "왕빙어모",
    genre: "역사",
    director: "감독 F",
    actors: "배우11, 배우12",
    runngingtime: "3시간",
    summary: "횡단보도를 지나다가 트럭에 치이고, 눈 떠보니 왕..?! 근데 나.. 한자도 잘 모르는데 안들키고 살아남을 수 있을까?",
    poster: "/posters/history.svg",
  },
  {
    title: "UFO: the silent invasion",
    genre: "SF",
    director: "감독 G",
    actors: "배우13, 배우14",
    runngingtime: "2시간",
    summary: "그것은 어느 날, 갑자기 나타났다. 어떠한 공격도, 미동도 없이 지나간 1년 후에 하늘에서 수십대의 UFO가 착륙하기 시작한다..!",
    poster: "/posters/sf.svg",
  },
  {
    title: "The seekers of stars",
    genre: "판타지",
    director: "감독 H",
    actors: "배우15, 배우16",
    runngingtime: "3시간",
    summary: "세상의 모든 별이 갑자기 사라졌다! 세상은 혼란에 빠지고, 별을 되찾기 위해 ‘별을 찾는 자들’이 나타나게 된다..!",
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
