"use client";
import { css } from "@emotion/react";

const titleStyle = css`
  text-align: center;
  margin-top: 100px;
`;

const titleSubStyle = css`
  text-align: center;
`;

export default function Home() {

  
  return (
    <div>
      <h4 css={titleStyle}>제목</h4>
      <p css={titleSubStyle}>소제목</p>
    </div>
  );
}
