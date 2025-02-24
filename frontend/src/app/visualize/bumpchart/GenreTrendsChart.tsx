import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsiveAreaBump } from "@nivo/bump";
import { API_BASE_URL } from "@/const/baseApi";
const GenreTrendsAreaBump = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/genre-trends`)
      .then((response) => {
        const transformedData = response.data.map((genreItem) => ({
          id: genreItem.id,
          data: genreItem.data.sort((a, b) => parseInt(a.x) - parseInt(b.x)),
        }));

        setData(transformedData);
      })
      .catch((error) => {
        console.error("장르 데이터를 불러오는 중 오류 발생:", error);
      });
  }, []);

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
  ];

  const CustomTooltip = ({ serie, x, y }) => {
    console.log(serie, "x", x, "y", y, "000000");
    return (
      <div
        style={{
          padding: "12px",
          background: "rgba(255, 255, 255, 0.9)",
          border: "1px solid #ccc",
          borderRadius: "6px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          color: "#333",
          fontFamily: "Pretendard, sans-serif",
          fontSize: "16px",
          textAlign: "center",
        }}
      >
        <strong>{serie.id}</strong>
        {/* <div style={{ marginTop: "5px" }}>
          📅 연도: {x}년
          <br />
          🎬 개봉 수: {y}편
        </div> */}
      </div>
    );
  };

  if (data.length === 0) {
    return (
      <div
        style={{
          height: "800px",
          width: "1200px",
          backgroundColor: "#222",
          padding: "20px",
          borderRadius: "10px",
          fontFamily: "Pretendard, sans-serif",
          fontWeight: "bold",
          color: "#fff",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div
      style={{
        height: "800px",
        width: "1200px",
        backgroundColor: "#222",
        padding: "20px",
        borderRadius: "10px",
        fontFamily: "Pretendard, sans-serif",
        fontWeight: "bold",
      }}
    >
      <ResponsiveAreaBump
        data={data}
        margin={{ top: 40, right: 120, bottom: 80, left: 100 }}
        spacing={8}
        colors={customColors}
        blendMode="normal"
        borderWidth={2}
        enableGridX={false}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "연도",
          legendPosition: "middle",
          legendOffset: 50,
          tickTextColor: "#ffffff",
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "장르 순위",
          legendPosition: "middle",
          legendOffset: -80,
          tickTextColor: "#ffffff",
        }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 14, fill: "#fff" } },
            legend: { text: { fontSize: 16, fill: "#fff" } },
          },
          grid: { line: { stroke: "#444", strokeDasharray: "3 3" } },
          labels: { text: { fill: "#fff" } },
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
        tooltip={CustomTooltip}
      />
    </div>
  );
};

export default GenreTrendsAreaBump;
