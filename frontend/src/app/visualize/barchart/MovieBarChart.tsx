import Image from "next/image";
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
        setData(formattedData);
      })
      .catch((error) => {
        console.error("영화 데이터를 가져오는 중 에러 발생:", error);
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
    "#82ccdd",
  ];

  const CustomTooltip = ({ data: d }) => (
    <div
      style={{
        padding: "10px",
        background: "rgba(255, 255, 255, 0.9)",
        border: "1px solid #ccc",
        borderRadius: "5px",
        textAlign: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        color: "#333",
        fontFamily: "Pretendard, sans-serif",
      }}
    >
      <strong>{d.movie_name}</strong>
      <div>👥 {Math.round(d.audience_count / 10000).toLocaleString()}만 명</div>
      {d.poster_url && (
        <Image
          src={d.poster_url}
          alt={d.movie_name}
          width={90}
          height={135}
          style={{ marginTop: "8px", borderRadius: "5px" }}
        />
      )}
    </div>
  );

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
      <ResponsiveBar
        data={
          data.length > 0
            ? data
            : [{ movie_name: "데이터 없음", audience_count: 0 }]
        }
        keys={["audience_count"]}
        indexBy="movie_name"
        margin={{ top: 50, right: 50, bottom: 120, left: 100 }}
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
          legendOffset: 70,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: "관객수 (만 명)",
          legendPosition: "middle",
          legendOffset: -80,
          format: (value) => `${Math.round(value / 10000).toLocaleString()}만`,
        }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 14, fill: "#fff" } },
            legend: { text: { fontSize: 16, fill: "#fff" } },
          },
          grid: { line: { stroke: "#444", strokeDasharray: "3 3" } },
        }}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor="#fff"
        valueFormat={(value) =>
          `${Math.round(value / 10000).toLocaleString()}만`
        }
        gridYValues={5}
      />
    </div>
  );
};

export default MovieBarChart;
