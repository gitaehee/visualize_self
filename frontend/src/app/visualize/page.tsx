"use client";
import { css } from "@emotion/react";

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
                <p css={messageStyle}>그래프 넣을 거임</p>
            </div>
        }
      </div>
    );
  }

