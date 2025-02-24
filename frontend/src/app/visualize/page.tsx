"use client";
import { css } from "@emotion/react";
import MovieBarChart from "./barchart/MovieBarChart";
import DistributorPieChart from "./piechart/DistributorPieChart";
import GenreTrendsChart from "./bumpchart/GenreTrendsChart";
import AudienceBarChart from "./barchart/AudienceBarChart";

const titleStyle = css`
  text-align: center;
  margin-top: 100px;
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
      <h4 css={titleStyle}>시각화 페이지</h4>{" "}
      {
        <div css={containerStyle}>
          <MovieBarChart />
          <DistributorPieChart />
          <GenreTrendsChart />
          <AudienceBarChart />
        </div>
      }
    </div>
  );
}
