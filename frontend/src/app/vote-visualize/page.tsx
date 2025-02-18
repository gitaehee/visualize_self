"use client";

import { css } from "@emotion/react";

const containerStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 100px;
`;

const iframeStyle = css`
  width: 100%;
  max-width: 900px;
  height: 600px;
  border: none;
`;

export default function VoteVisualize() {
  return (
    <div css={containerStyle}>
      <h1>🎬 실시간 투표 결과</h1>
      <iframe
        src="http://localhost:8501" // ✅ Streamlit 서버 주소
        css={iframeStyle}
        title="Streamlit Visualization"
      />
    </div>
  );
}
