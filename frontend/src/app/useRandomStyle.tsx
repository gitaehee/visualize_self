import { useEffect, useState } from "react";
import { css } from "@emotion/react";

const useRandomStyle = (isLarge: boolean) => {
  const [style, setStyle] = useState({});

  useEffect(() => {
    const width = isLarge
      ? Math.random() * 300 + 500
      : Math.random() * 150 + 200;
    const height = isLarge
      ? Math.random() * 250 + 600
      : Math.random() * 100 + 250;
    const translateY = Math.random() * 100 - 50;
    const rotate = Math.random() * 10 - 5;
    const zIndex = isLarge ? 1 : Math.floor(Math.random() * 3) + 2;
    const overlapLimit = width / 3;
    const translateX = isLarge
      ? 0
      : Math.random() * overlapLimit - overlapLimit / 2;

    setStyle({
      width: `${width}px`,
      height: `${height}px`,
      transform: `translate(${translateX}px, ${translateY}px) rotate(${rotate}deg)`,
      zIndex: zIndex,
    });
  }, []);

  return css`
    width: ${style.width};
    height: ${style.height};
    transform: ${style.transform};
    z-index: ${style.zIndex};
    object-fit: cover;
    border-radius: 15px;
    position: absolute;
    transition: transform 0.5s ease, z-index 0.5s ease;
  `;
};

export default useRandomStyle;
