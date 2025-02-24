"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { ResponsiveBar } from "@nivo/bar";
import { API_BASE_URL } from "@/const/baseApi";

interface AudienceRatio {
  year: number;
  movies: Record<string, string[]>;
  [key: string]: any;
}

const AudienceRatioBarChart = () => {
  const [data, setData] = useState<AudienceRatio[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    axios.get<AudienceRatio[]>(`${API_BASE_URL}/audience-ratio`).then((res) => {
      setData(res.data);
      if (res.data.length > 0) {
        const keys = Object.keys(res.data[0]).filter(
          (key) => key !== "year" && key !== "movies"
        );
        setCountries(keys);
      }
    });
  }, []);

  const formattedData = data.map((item) => {
    const total = countries.reduce((sum, country) => sum + item[country], 0);
    const ratioData = {
      year: item.year,
      totalAudience: total,
      movies: item.movies,
    };

    countries.forEach((country) => {
      ratioData[country] = (item[country] / total) * 100;
      ratioData[`${country}Audience`] = item[country];
    });

    return ratioData;
  });

  const customColors = [
    "#4a69bd",
    "#f6b93b",
    "#e55039",
    "#78e08f",
    "#38ada9",
    "#fa983a",
    "#82ccdd",
    "#b71540",
  ];

  return (
    <div
      style={{
        width: "1200px",
        height: "800px",
        background: "#222",
        padding: "20px",
        borderRadius: "10px",
        fontFamily: "Pretendard, sans-serif",
        fontWeight: "bold",
      }}
    >
      <ResponsiveBar
        data={formattedData}
        keys={countries}
        indexBy="year"
        margin={{ top: 50, right: 160, bottom: 100, left: 90 }}
        padding={0.3}
        colors={customColors}
        enableLabel={false}
        tooltip={({ id, indexValue, data }) => {
          const movieList = data.movies[id] || [];
          const actualAudience = data[`${id}Audience`] || 0;
          const maxVisibleMovies = 10;
          const hiddenMoviesCount = movieList.length - maxVisibleMovies;

          return (
            <div
              style={{
                padding: "12px",
                background: "rgba(0, 0, 0, 0.8)",
                color: "#fff",
                borderRadius: "6px",
                boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                fontSize: "14px",
                maxWidth: "300px",
              }}
            >
              <strong>
                {indexValue}년 - {id}
              </strong>
              : {Math.floor(actualAudience / 10000).toLocaleString()}만 명
              <div style={{ marginTop: "8px" }}>
                영화 목록 <strong>({movieList.length})</strong>
              </div>
              <ul
                style={{
                  textAlign: "left",
                  margin: "8px 0",
                  paddingLeft: "20px",
                }}
              >
                {movieList
                  .slice(0, maxVisibleMovies)
                  .map((movie: string, idx: number) => (
                    <li key={idx}>{movie}</li>
                  ))}
                {hiddenMoviesCount > 0 && (
                  <li style={{ opacity: 0.7 }}>외 {hiddenMoviesCount}편</li>
                )}
              </ul>
            </div>
          );
        }}
        axisLeft={{
          format: (value) => `${value}%`,
          tickSize: 5,
          tickPadding: 5,
          legend: "관객수 비율 (%)",
          legendPosition: "middle",
          legendOffset: -70,
        }}
        axisBottom={{
          tickRotation: -45,
          tickSize: 5,
          tickPadding: 5,
          legend: "연도",
          legendPosition: "middle",
          legendOffset: 70,
        }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 14, fill: "#fff" } },
            legend: { text: { fontSize: 16, fill: "#fff" } },
          },
          grid: { line: { stroke: "#444", strokeDasharray: "3 3" } },
          legends: { text: { fill: "#fff" } },
        }}
        legends={[
          {
            dataFrom: "keys",
            anchor: "right",
            direction: "column",
            translateX: 150,
            itemWidth: 120,
            itemHeight: 20,
            symbolSize: 18,
            itemTextColor: "#fff",
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
};

export default AudienceRatioBarChart;
