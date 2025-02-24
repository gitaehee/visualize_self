// AudienceBarChart.tsx
"use client";

import { ResponsiveBar } from "@nivo/bar";
import { useEffect, useState } from "react";
import axios from "axios";

interface AudienceData {
  year: number;
  audience: number;
}

const AudienceBarChart = () => {
  const [data, setData] = useState<AudienceData[]>([]);

  useEffect(() => {
    axios
      .get<AudienceData[]>("http://localhost:5000/api/audience")
      .then((res) => {
        setData(res.data);
      });
  }, []);

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
        data={data}
        keys={["audience"]}
        indexBy="year"
        margin={{ top: 50, right: 50, bottom: 100, left: 90 }}
        padding={0.3}
        colors={{ scheme: "set2" }}
        axisBottom={{
          tickRotation: -45,
          legend: "연도",
          legendPosition: "middle",
          legendOffset: 70,
          tickSize: 5,
          tickPadding: 5,
          format: (value) => `${value}년`,
        }}
        axisLeft={{
          legend: "관객수 (억 명)",
          legendPosition: "middle",
          legendOffset: -70,
          tickSize: 5,
          tickPadding: 5,
          format: (value) => `${(value / 100000000).toLocaleString()}억`,
        }}
        theme={{
          axis: {
            ticks: { text: { fontSize: 14, fill: "#fff" } },
            legend: { text: { fontSize: 16, fill: "#fff" } },
          },
          grid: { line: { stroke: "#444", strokeDasharray: "3 3" } },
          labels: { text: { fill: "#fff" } },
        }}
        enableLabel={false}
        tooltip={({ indexValue, value }) => (
          <div
            style={{
              padding: "10px",
              background: "rgba(255,255,255,0.9)",
              boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
              borderRadius: "6px",
              color: "#333",
              fontSize: "16px",
              textAlign: "center",
            }}
          >
            <strong>{indexValue}년</strong>
            <div style={{ marginTop: "5px" }}>
              👥 {(Number(value) / 100000000).toLocaleString()}억 명
            </div>
          </div>
        )}
      />
    </div>
  );
};

export default AudienceBarChart;
