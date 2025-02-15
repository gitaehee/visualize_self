"use client";
import { css } from "@emotion/react";

const titleStyle = css`
  text-align: center;
  margin-top: 100px;
`;

const messageStyle = css`
  text-align: center;
`;

export default function Awards() {
    
    return (
      <div>
        <h4 css={titleStyle}>시상식 페이지</h4> {
            <div>
                <p css={messageStyle}>이미지 넣을 거임</p>
            </div>
        }
      </div>
    );
  }

