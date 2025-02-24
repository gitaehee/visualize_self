/** @jsxImportSource @emotion/react */
"use client";

import { useRef } from "react";
import { css } from "@emotion/react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";

const getImagePaths = (year: number | string, count: number) => {
  return Array.from(
    { length: count },
    (_, i) => `/homeimages/${year}_${i + 1}.png`
  );
};

const timelineData = [
  {
    year: 1919,
    title: "의리적 구토",
    description: (
      <>
        김도산이 각본을 쓰고 주연한 키노드라마로, 서울 단성사에서 초연된{" "}
        <strong>한국 최초의 영화</strong>입니다. 이는 한국 영화의 시작을 알리는
        역사적인 순간이었습니다.
      </>
    ),
    imageCount: 1,
  },
  {
    year: 1955,
    title: "자유부인",
    description: (
      <>
        이병일 감독의 자유부인은 <strong>해방 이후 한국 영화의 부흥기</strong>를
        알린 작품입니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 1993,
    title: "서편제",
    description: (
      <>
        한국 영화 사상 처음으로 <strong>백만 관객을 돌파</strong>하여 ‘백만 관객
        시대’를 연 첫 번째 영화입니다.
      </>
    ),
    imageCount: 3,
  },
  {
    year: 1999,
    title: "쉬리",
    description: (
      <>
        강제규 감독의 쉬리는 <strong>한국 영화 최초로 블록버스터</strong> 개념을
        도입하여 상업 영화의 새로운 지평을 열었습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2003,
    title: "실미도",
    description: (
      <>
        강우석 감독의 실미도가 <strong>한국 영화 사상 최초로 천만 관객</strong>
        을 돌파하며 한국 영화의 새로운 기록을 세웠습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2010,
    title: "한국 영화 성장기",
    description: (
      <>
        <strong>명량, 국제시장, 부산행, 신과함께, 극한직업</strong> 등 다양한
        장르에서 천만 관객을 달성하며 <strong>영화 산업의 부흥기</strong>를
        맞았습니다.
      </>
    ),
    imageCount: 4,
  },
  {
    year: 2019,
    title: "기생충",
    description: (
      <>
        봉준호 감독의 기생충이 한국 영화 최초로 <strong>칸 영화제</strong>에서
        최고상인 <strong>황금종려상을 수상</strong>하며 세계적인 인정을
        받았습니다.
      </>
    ),
    imageCount: 2,
  },
  {
    year: 2020,
    title: "글로벌 영향력 확대",
    description: (
      <>
        <strong>미나리</strong>의 윤여정은{" "}
        <strong>한국 배우 최초로 아카데미 여우조연상</strong>을 수상하였고,{" "}
        <strong>골든글로브 외국어영화상</strong>을 수상했습니다. 헤어질 결심의
        박찬욱 감독은 한국 감독으로서는 두 번째로{" "}
        <strong>칸 영화제 감독상</strong>을 수상하였고,
        <strong>브로커</strong>의 송강호는{" "}
        <strong>한국 배우 최초로 칸 남우주연상</strong>을 수상하며 해외
        시장에서의 영향력을 증명했습니다.
      </>
    ),
    imageCount: 4,
  },
].map((data) => ({
  ...data,
  images: getImagePaths(data.year, data.imageCount),
}));

const styles = {
  title: css`
    text-align: center;
    margin: 24px 0 5px;
    font-size: 24px;
    font-weight: bold;
    color: white;
    height: 5vh; /* 제목 공간 */
  `,
  scrollContainer: css`
    width: 100vw;
    height: 60vh; /* 제목을 제외한 공간 */
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    align-items: center;
    scroll-snap-type: x mandatory;
    white-space: nowrap;
    perspective: 1500px;
    scrollbar-width: none;
    padding: 15px 20px;
    position: relative;

    &::-webkit-scrollbar {
      display: none;
    }
  `,
  timelineContainer: css`
    display: flex;
    gap: 300px; /* 간격 줄이기 */
    padding: 0 300px;
    min-width: max-content;
    align-items: center;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 28px;
      left: 0;
      height: 3px;
      width: 100%;
      background: #ffffff;
      opacity: 0.4;
      z-index: 0;
    }
  `,

  yearBlock: css`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 600px;
    height: 60vh; // 원하시는 대로 고정 높이 유지
    padding: 50px 10px;
    box-sizing: border-box;
  `,

  yearCircle: css`
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: #ffcc00;
    border: 2px solid #ffffff;
    position: absolute;
    top: 26px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 1;
  `,
  year: css`
    font-size: 26px; /* 연도 글씨 크기 축소 */
    font-weight: bold;
    color: #ffcc00;
    margin-top: 8px;
  `,
  content: css`
    max-width: 100%;
    text-align: center;
    color: #ccc;
    font-size: 15px; /* 글씨 크기 축소 */
    margin-top: 10px;
    line-height: 1.4;

    strong {
      font-weight: 700;
      color: white;
    }
  `,
  photoWrapper: (imageCount: number) => css`
    display: grid;
    gap: 8px;
    width: 100%;
    flex: 1;
    overflow: visible; // ⭐️ 넘치는 부분을 숨기지 말고, 전부 보이게 함

    ${imageCount === 4
      ? `
      grid-template-columns: repeat(2, 1fr);
      grid-template-rows: repeat(2, 1fr);
    `
      : imageCount === 3
      ? `
      grid-template-columns: repeat(2, 1fr);
      grid-template-areas:
        "img1 img2"
        "img3 .";
    `
      : `
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    `}
  `,

  image: (imageCount: number, index: number) => css`
    border-radius: 8px;
    object-fit: contain; // 비율 유지하면서 전부 보이게
    width: 100%;
    height: auto; // 높이를 자동으로 설정하여 절대 넘치지 않음

    ${imageCount === 3 ? `grid-area: img${index + 1};` : ""}
  `,
};

export default function Timeline() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  return (
    <div>
      <h4 css={styles.title}>한국 영화사</h4>

      <div css={styles.scrollContainer} ref={scrollContainerRef}>
        <div css={styles.timelineContainer}>
          {timelineData.map(({ year, title, description, images }) => (
            <motion.div key={year} css={styles.yearBlock}>
              <div css={styles.yearCircle}></div>
              <motion.span css={styles.year}>
                {year}
                {year === 2010 ? "년대" : year === 2020 ? "년 이후" : ""}
              </motion.span>
              <motion.h3 css={styles.year}>{title}</motion.h3>
              <motion.p css={styles.content}>{description}</motion.p>
              <div css={styles.photoWrapper(images.length)}>
                {images.map((src, i) => (
                  <motion.div key={i} css={styles.image(images.length, i)}>
                    <Image
                      src={src}
                      alt={`Year ${year} - Image ${i + 1}`}
                      width={400}
                      height={280}
                      priority
                      unoptimized
                      style={{
                        width: "100%",
                        height: "auto", // 이미지 높이를 자동으로 비율 유지
                        borderRadius: "8px",
                        objectFit: "contain",
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
