"use client";

import { useEffect, useRef } from "react";
import { css } from "@emotion/react";
import Image from "next/image";

const timelineData = [
  {
    year: 2015,
    images: [
      "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg",
    ],
  },
  {
    year: 2016,
    images: [
      "https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg",
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    ],
  },
  {
    year: 2017,
    images: ["https://images.pexels.com/photos/34950/pexels-photo.jpg"],
  },
  {
    year: 2018,
    images: [
      "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
      "https://images.pexels.com/photos/158827/pexels-photo-158827.jpeg",
    ],
  },
  {
    year: 2019,
    images: [
      "https://images.pexels.com/photos/167832/pexels-photo-167832.jpeg",
    ],
  },
  {
    year: 2020,
    images: [
      "https://images.pexels.com/photos/3183135/pexels-photo-3183135.jpeg",
      "https://images.pexels.com/photos/3224152/pexels-photo-3224152.jpeg",
    ],
  },
  {
    year: 2021,
    images: [
      "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
    ],
  },
  {
    year: 2022,
    images: [
      "https://images.pexels.com/photos/3777622/pexels-photo-3777622.jpeg",
      "https://images.pexels.com/photos/3812761/pexels-photo-3812761.jpeg",
    ],
  },
  {
    year: 2023,
    images: [
      "https://images.pexels.com/photos/4011073/pexels-photo-4011073.jpeg",
    ],
  },
  {
    year: 2024,
    images: [
      "https://images.pexels.com/photos/5005705/pexels-photo-5005705.jpeg",
      "https://images.pexels.com/photos/5011645/pexels-photo-5011645.jpeg",
    ],
  },
];

// 랜덤한 크기 및 위치 지정 (겹침 제한 적용)
const generateRandomStyle = (isLarge: boolean) => {
  const width = isLarge
    ? Math.floor(Math.random() * 300) + 500
    : Math.floor(Math.random() * 150) + 200; // 200~800px
  const height = isLarge
    ? Math.floor(Math.random() * 250) + 600
    : Math.floor(Math.random() * 100) + 250; // 250~850px
  const translateY = Math.floor(Math.random() * 100) - 50; // -50~50px
  const rotate = Math.floor(Math.random() * 10) - 5; // -5~5deg
  const zIndex = isLarge ? 1 : Math.floor(Math.random() * 3) + 2; // 작은 사진이 큰 사진보다 앞으로 오게 함
  const overlapLimit = width / 3; // 최대 겹치는 범위 = width의 1/3
  const translateX = isLarge
    ? 0
    : Math.floor(Math.random() * overlapLimit) - overlapLimit / 2; // 최대 1/3까지만 겹치게 설정

  return css`
    width: ${width}px;
    height: ${height}px;
    transform: translate(${translateX}px, ${translateY}px) rotate(${rotate}deg);
    z-index: ${zIndex};
    object-fit: cover;
    border-radius: 15px;
    position: absolute;
    transition: transform 0.5s ease, z-index 0.5s ease;
  `;
};

const titleStyle = css`
  text-align: center;
  margin-top: 50px;
`;

const scrollContainerStyle = css`
  width: 100vw;
  height: 100vh;
  overflow-x: auto;
  display: flex;
  align-items: center;
  scroll-snap-type: x mandatory;
  white-space: nowrap;
  perspective: 1500px;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const timelineContainerStyle = css`
  display: flex;
  position: relative;
  gap: 800px; /* 연도 간 간격을 더 넓게 설정 */
  padding: 0 600px;
  min-width: max-content;
`;

const yearStyle = css`
  position: absolute;
  top: -70px;
  font-size: 28px;
  font-weight: bold;
  color: #333;
`;

const yearBlockStyle = css`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const photoWrapperStyle = css`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function Home() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollContainerRef.current) return;
      const scrollX = scrollContainerRef.current.scrollLeft;

      const photos = scrollContainerRef.current.querySelectorAll(".photo");
      photos.forEach((photo, index) => {
        const depth = (index + 1) * 50;
        const offset = scrollX / depth;
        (photo as HTMLElement).style.transform = `translate(${offset}px, ${
          offset * 0.1
        }px) scale(${1 + offset * 0.002}) rotate(${offset * 0.05}deg)`;
      });
    };

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div>
      <h4 css={titleStyle}>연도별 타임라인</h4>

      <div css={scrollContainerStyle} ref={scrollContainerRef}>
        <div css={timelineContainerStyle}>
          {timelineData.map(({ year, images }) => (
            <div key={year} css={yearBlockStyle}>
              <span css={yearStyle}>{year}</span>
              {images.map((src, index) => (
                <div key={index} css={photoWrapperStyle}>
                  <Image
                    src={src}
                    alt={`Year ${year} Image ${index + 1}`}
                    width={300}
                    height={400}
                    priority
                    className="photo"
                    css={generateRandomStyle(index % 2 === 0)}
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
