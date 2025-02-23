"use client";

import { useEffect, useRef, useState } from "react";

const sections = ["Section 1", "Section 2", "Section 3", "Section 4"];

export default function ScrollSections() {
  const [activeIndex, setActiveIndex] = useState(0);
  const isScrolling = useRef(false);

  useEffect(() => {
    const handleScroll = (event: WheelEvent) => {
      if (isScrolling.current) return;
      isScrolling.current = true;

      setTimeout(() => {
        isScrolling.current = false;
      }, 800); // 스크롤 딜레이 (부드러운 전환)

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
              backgroundColor: index % 2 === 0 ? "#4A90E2" : "#50E3C2",
              width: "100vw",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {section}
          </div>
        ))}
      </div>
    </div>
  );
}
