"use client";
import { css } from "@emotion/react";
import MovieBarChart from "./barchart/MovieBarChart";
import DistributorPieChart from "./piechart/DistributorPieChart";
import GenreTrendsChart from "./bumpchart/GenreTrendsChart";
import AudienceBarChart from "./barchart/AudienceBarChart";
import AudienceRatioBarChart from "./barchart/AudienceRatioBarChart";

const titleStyle = css`
  text-align: center;
  margin-top: 150px;
`;

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export default function Visualize() {
  return (
    <div>
      {
        <div css={containerStyle}>
          <h2 css={titleStyle}>한국 영화 역대 관객수 TOP 10</h2>{" "}
          <MovieBarChart />
          <h2 css={titleStyle}>배급사별 천만 영화 갯수</h2>
          <DistributorPieChart />
          <h2 css={titleStyle}>연도별 장르 개봉 횟수(Top 200)</h2>
          <GenreTrendsChart />
          <h2 css={titleStyle}>연도별 관객수</h2>
          <AudienceBarChart />
          <h2 css={titleStyle}>
            Top 200 영화로 보는 한국 영화의 흥행 점유율 변화
          </h2>
          <AudienceRatioBarChart />
        </div>
      }
    </div>
  );
}
