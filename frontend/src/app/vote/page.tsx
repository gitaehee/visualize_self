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
  min-height: 110vh;
`;

const titleStyle = css`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const gridContainerStyle = css`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1.5rem;
  width: 100%;
  max-width: 900px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  justify-items: center;

  /* ✅ 모바일 대응: 작은 화면에서는 2열 */
  @media (max-width: 900px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  /* ✅ 더 작은 화면에서는 1열 */
  @media (max-width: 400px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const movieCardStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  position: relative;
  width: 100%; /* ✅ 부모 컨테이너가 유동적으로 조정됨 */
  max-width: 192px; /* ✅ 버튼과 크기 맞추기 */
`;

const posterContainerStyle = css`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 192px;
  height: 276px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;

  &:hover .description {
    opacity: 1;
    pointer-events: auto;
  }

  @media (max-width: 600px) {
    width: 192px;
    height: 276px;
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
  align-items: flex-start;

  /* 설명글 왼쪽 정렬 */
  text-align: left;
 
  padding: 10px;

  /* ✨ 스크롤 가능하도록 설정 */
  overflow-y: auto;
  max-height: 100%;
  box-sizing: border-box; /* 패딩 포함하여 크기 조절 */

  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  pointer-events: none;

  line-height: 1.5;
  font-size: 15px;

  /* ✨ 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 5px; /* ✨ 스크롤바 너비 */
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.6); /* ✨ 스크롤바 색상 */
    border-radius: 8px; /* ✨ 둥글게 */
  }

  @media (max-width: 600px) {
    font-size: 12px; /* ✅ 모바일에서 폰트 크기 더 축소 */
  }

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
  width: 100%; /* ✅ 모바일에서도 꽉 차게 */
  width: 192px;

  &:hover {
    background-color: #2563eb;
  }

  /* ✅ 모바일에서 버튼이 너무 크면 더 작게 조정 */
  @media (max-width: 600px) {
    font-size: 0.8rem;
    padding: 0.6rem;
    width: 192px;
  }
`;

const movies = [
  {
    title: "After Sunrise",
    genre: "로맨스",
    director: "닉 카사베츠",
    actors: "티모시 샬라메, 밀리 바비 브라운",
    runngingtime: "1시간",
    summary: "폭풍우로 배가 난파되고 아름다운 섬에 떠내려온 연인. 그러나 이 섬에는 특별한 비밀이 있다. 아침이 올 때마다 사랑을 다시 시작해야 하는 그들의 기적 같은 이야기.",
    poster: "/posters/romance.svg",
  },
  {
    title: "TITANIC",
    genre: "뮤지컬",
    director: "앤듀르 로이드 웨버",
    actors: "엠마 스톤, 레이디가가",
    runngingtime: "2시간",
    summary: "거대한 꿈, 찬란한 희망, 그리고 운명의 밤. 전 세계를 감동시킨 타이타닉이 뮤지컬 영화로 돌아온다.",
    poster: "/posters/musical.svg",
  },
  {
    title: "Red Room",
    genre: "공포",
    director: "박찬욱",
    actors: "김고은, 주지훈",
    runngingtime: "2시간",
    summary: "홍수로 인해 갑자기 묵게 된 호텔. 위층에서 먼저 올라간 아내의 목소리가 들리고, 빨간 문을 연 순간 수십 개의 똑같은 얼굴이 천천히 고개를 돌리는데..!",
    poster: "/posters/horror.svg",
  },
  {
    title: "장화 싫은 고양이",
    genre: "애니메이션",
    director: "미야자키 하야오",
    actors: "강수진, 신용우",
    runngingtime: "1시간",
    summary: "매일 비가 오는 ‘소나기’ 마을에 사는 고양이 ‘토토’. 언제나 햇빛과 먹을 것이 가득하다는 츄르월드를 찾아 모험을 떠나게 되는데..!",
    poster: "/posters/animation.svg",
  },
  {
    title: "CODENAME:000",
    genre: "액션",
    director: "봉준호",
    actors: "전지현, 현빈",
    runngingtime: "3시간",
    summary: "최초의 첩보요원. 코드네임 000. 국적, 성별, 나이 미상. 다양한 세력이 갑자기 돌아온 그를 쫓는다. 그는 왜 돌아온 것일까? 올해, 가장 위험한 요원이 깨어난다.",
    poster: "/posters/action.svg",
  },
  {
    title: "왕빙어모",
    genre: "역사",
    director: "황동혁",
    actors: "최수종, 이정재",
    runngingtime: "3시간",
    summary: "횡단보도를 지나다가 트럭에 치이고, 눈 떠보니 왕..?! 근데 나.. 한자도 잘 모르는데 안들키고 살아남을 수 있을까?",
    poster: "/posters/history.svg",
  },
  {
    title: "UFO: the silent invasion",
    genre: "SF",
    director: "크리스토퍼 놀란",
    actors: "브래드 피트, 앤 해서웨이",
    runngingtime: "2시간",
    summary: "그것은 어느 날, 갑자기 나타났다. 어떠한 공격도, 미동도 없이 지나간 1년 후에 하늘에서 수십대의 UFO가 착륙하기 시작한다..!",
    poster: "/posters/sf.svg",
  },
  {
    title: "The seekers of stars",
    genre: "판타지",
    director: "연상호",
    actors: "이도현, 신세경",
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
      <h1 css={titleStyle}>영화 예매</h1>
      <p>포스터를 클릭하면 상세 내용이 보여요!</p>
      {/* 위쪽 4개 영화 */}
      <div css={gridContainerStyle}>
        {movies.slice(0, 4).map((movie) => (
          <div key={movie.title} css={movieCardStyle}>
            <div css={posterContainerStyle}>
              {/* 🎯 마우스를 올리면 보이도록 hover 스타일만 사용 */}
              <div css={descriptionStyle} className="description">
                <p><strong>{movie.title}</strong></p>
                <p>장르: {movie.genre}</p>
                <p>감독: {movie.director}</p>
                <p>출연: {movie.actors}</p>
                <p>상영시간: {movie.runngingtime}</p>
                <p>{movie.summary}</p>
              </div>
              <img src={movie.poster} alt={movie.title} css={posterStyle} />
            </div>
            <button css={buttonStyle} onClick={() => handleVote(movie.title)}>
              {movie.title} 예매
            </button>
          </div>
        ))}
      </div>

      {/* 중간 여백 추가 */}
      <div css={css`height: 35px;`} /> 

      {/* 아래쪽 4개 영화 */}
      <div css={gridContainerStyle}>
        {movies.slice(4, 8).map((movie) => (
          <div key={movie.title} css={movieCardStyle}>
            <div css={posterContainerStyle}>
              {/* 🎯 hover 효과로 자동 표시 */}
              <div css={descriptionStyle} className="description">
                <p><strong>{movie.title}</strong></p>
                <p>장르: {movie.genre}</p>
                <p>감독: {movie.director}</p>
                <p>출연: {movie.actors}</p>
                <p>상영시간: {movie.runngingtime}</p>
                <p>{movie.summary}</p>
              </div>
              <img src={movie.poster} alt={movie.title} css={posterStyle} />
            </div>
            <button css={buttonStyle} onClick={() => handleVote(movie.title)}>
              {movie.title} 예매
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
