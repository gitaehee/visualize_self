import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveAreaBump } from "@nivo/bump";

const GenreTrendsAreaBump = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/genre-trends") // Flask API 호출
      .then((response) => {
        console.log("🎬 API 응답 데이터:", response.data);

        // ✅ 장르별로 하나의 연속된 시리즈가 되도록 정리
        const transformedData = response.data.map((genreItem) => ({
          id: genreItem.id,
          data: genreItem.data.sort((a, b) => parseInt(a.x) - parseInt(b.x)), // ✅ 연도 순으로 정렬
        }));

        console.log(transformedData)
        setData(transformedData);
      })
      .catch((error) => {
        console.error("장르 데이터를 불러오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div style={{ height: "500px", width: "800px", background: "#111", padding: "20px", borderRadius: "10px" }}>
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 100, bottom: 80, left: 100 }}
        spacing={8}
        colors={["#FF6B6B", "#FF9F43", "#FFD166", "#06D6A0", "#118AB2", "#073B4C", "#EF476F", "#8338EC", "#3A86FF"]} // 🎨 색상 조정
        blendMode="normal" // ✅ 대비를 높이기 위해 blendMode를 normal로 변경
        borderWidth={2} // ✅ 선 두께 조정
        enableGridX={false} // ✅ 연도별 백그라운드 선 제거
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "연도별 개봉 수",
          legendPosition: "middle",
          legendOffset: 50,
          tickTextColor: "#F8F9FA",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "장르",
          legendPosition: "middle",
          legendOffset: -80,
          tickTextColor: "#F8F9FA",
        }}
        defs={[
          {
            id: "dots",
            type: "patternDots",
            background: "inherit",
            color: "rgba(255,255,255,0.3)",
            size: 4,
            padding: 1,
            stagger: true,
          },
          {
            id: "lines",
            type: "patternLines",
            background: "inherit",
            color: "rgba(255,255,255,0.3)",
            rotation: -45,
            lineWidth: 4,
            spacing: 6,
          },
        ]}
        fill={[
          { match: { id: "액션" }, id: "dots" },
          { match: { id: "드라마" }, id: "lines" },
        ]}
        startLabel="id"
        endLabel="id"
        labelTextColor="#FFFFFF"
      />
    </div>
  );
};

export default GenreTrendsAreaBump;
