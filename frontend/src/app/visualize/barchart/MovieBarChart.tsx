import Image from "next/image"; // ✅ next/image 추가

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { API_BASE_URL } from "@/const/baseApi";

const MovieBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/top10movies`)
      .then((response) => {
        const movies =
          typeof response.data === "string"
            ? JSON.parse(response.data)
            : response.data;
        const formattedData = movies.map((movie) => ({
          movie_name: movie.영화명,
          audience_count: Number(movie.관객수.replace(/,/g, "")),
          poster_url: movie.poster_url,
        }));
        console.log(formattedData);
        setData(formattedData);
      })
      .catch((error) => {
        console.error("영화 데이터를 가져오는 중 에러 발생:", error);
      });
  }, []);

  // 🎨 블루 & 퍼플 계열의 톤다운된 색상 팔레트
  const customColors = [
    "#4a69bd",
    "#6a89cc",
    "#78e08f",
    "#38ada9",
    "#e55039",
    "#f6b93b",
    "#fa983a",
    "#b71540",
    "#60a3bc",
    "#82ccdd",
  ];

  // 🎭 툴팁 스타일 개선
  const CustomTooltip = ({ data: d }) => {
    return (
      <div
        style={{
          padding: "10px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          borderRadius: "5px",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          color: "#333",
        }}
      >
        <strong>{d.movie_name}</strong>
        <div>👥 {d.audience_count.toLocaleString()}명</div>
        {d.poster_url && (
          <Image
            src={d.poster_url}
            alt={d.movie_name}
            width={90}
            height={135}
            style={{
              marginTop: "8px",
              borderRadius: "5px",
            }}
          />
        )}
      </div>
    );
  };

  return (
    <div
      style={{
        height: "500px",
        width: "800px",
        backgroundColor: "#222",
        padding: "20px",
        borderRadius: "10px",
      }}
    >
      <ResponsiveBar
        data={
          data.length > 0
            ? data
            : [{ movie_name: "데이터 없음", audience_count: 0 }]
        }
        keys={["audience_count"]}
        indexBy="movie_name"
        margin={{ top: 50, right: 50, bottom: 100, left: 80 }}
        padding={0.3}
        colors={({ index }) => customColors[index % customColors.length]}
        borderColor={{ from: "color", modifiers: [["darker", 1.6]] }}
        colorBy="indexValue"
        tooltip={CustomTooltip}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 30,
          legend: "영화명",
          legendPosition: "middle",
          legendOffset: 60,
          tickTextColor: "#fff", // ✅ X축 레이블을 흰색으로 변경
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "관객수",
          legendPosition: "middle",
          legendOffset: -60,
          format: (value) => value.toLocaleString(),
          tickTextColor: "#fff", // ✅ Y축 레이블을 흰색으로 변경
        }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 12, fill: "#fff" } }, // ✅ X축, Y축 글자 색상 흰색
            legend: { text: { fontSize: 14, fill: "#fff" } }, // ✅ 범례 색상 흰색
          },
          grid: {
            line: { stroke: "#444", strokeDasharray: "3 3" }, // ✅ 눈금선을 배경과 조화롭게 변경
          },
        }}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fff" // ✅ 막대 위 숫자도 흰색으로 변경
        valueFormat={(value) => value.toLocaleString()} // ✅ 숫자 쉼표 추가
        gridYValues={5} // ✅ Y축 눈금 개수 조정
      />
    </div>
  );
};

export default MovieBarChart;
