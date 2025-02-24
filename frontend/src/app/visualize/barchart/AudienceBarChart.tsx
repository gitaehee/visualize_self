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
    <div style={{ width: "100%", height: "500px" }}>
      <ResponsiveBar
        data={data}
        keys={["audience"]}
        indexBy="year"
        margin={{ top: 50, right: 50, bottom: 50, left: 70 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickRotation: -45,
        }}
        label={(d) => `${d.value.toLocaleString()}`}
        tooltip={({ indexValue, value }) => (
          <div
            style={{
              padding: "8px",
              background: "white",
              boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
              borderRadius: "4px",
            }}
          >
            <strong>{indexValue}년</strong>: {value.toLocaleString()}명
          </div>
        )}
      />
    </div>
  );
};

export default AudienceBarChart;
