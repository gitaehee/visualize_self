"use client";
import { css } from "@emotion/react";
import MovieBarChart from "./barchart/MovieBarChart";

const titleStyle = css`
  text-align: center;
  margin-top: 100px;
`;

const messageStyle = css`
  text-align: center;
`;

export default function Visualize() {
    
    return (
      <div>
        <h4 css={titleStyle}>시각화 페이지</h4> {
            <div>
                <MovieBarChart/>
            </div>
        }
      </div>
    );
  }

