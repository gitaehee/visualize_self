"use client";

import { useEffect, useRef, useState } from "react";

const sections = [
  { title: "Section 1", image: "/awardsimages/section1.svg" },
  { title: "Section 2", image: "/awardsimages/section2.svg" },
  { title: "Section 3", image: "/awardsimages/section3.svg" },
];

export default function ScrollSections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);
  const isInitialLoad = useRef(true); // ✅ 처음 로딩 여부 체크

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // 스크롤 딜레이

      if (isInitialLoad.current) {
        isInitialLoad.current = false; // ✅ 첫 스크롤 이후 정상 작동
        return;
      }

      if (event.deltaY > 0 && activeIndex < sections.length - 1) {
        setActiveIndex((prev) => prev + 1);
      } else if (event.deltaY < 0 && activeIndex > 0) {
        setActiveIndex((prev) => prev - 1);
      }
    };

    window.addEventListener("wheel", handleScroll);
    return () => window.removeEventListener("wheel", handleScroll);
  }, [activeIndex]);

  useEffect(() => {
    if (isInitialLoad.current) return; // ✅ 초기 로딩 시 자동 스크롤 방지

    window.scrollTo({
      top: window.innerHeight * activeIndex,
      behavior: "smooth",
    });
  }, [activeIndex]);

  return (
    <div className="h-screen w-screen overflow-hidden">
      <div className="h-screen w-screen">
        {sections.map((section, index) => (
          <div
            key={index}
            className="h-screen flex items-center justify-center text-white text-3xl font-bold"
            style={{
              backgroundImage: `url(${section.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {section.title}
          </div>
        ))}
      </div>
    </div>
  );
}
