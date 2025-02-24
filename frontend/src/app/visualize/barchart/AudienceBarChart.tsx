import React, { useEffect, useState } from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const AudienceBarChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/audience").then((res) => {
      const formattedData = res.data.map((item) => ({
        year: item.year.toString(),
        audience: item.audience,
      }));
      setData(formattedData);
    });
  }, []);

  return (
    <div style={{ height: "500px" }}>
      <ResponsiveBar
        data={data}
        keys={["audience"]}
        indexBy="year"
        margin={{ top: 50, right: 130, bottom: 50, left: 60 }}
        padding={0.3}
        colors={{ scheme: "nivo" }}
        axisBottom={{
          tickRotation: -45,
          legend: "연도",
          legendPosition: "middle",
          legendOffset: 40,
        }}
        axisLeft={{
          legend: "관객 수",
          legendPosition: "middle",
          legendOffset: -50,
        }}
        tooltip={({ id, value, indexValue }) => (
          <strong>
            {indexValue}년: {value.toLocaleString()}명
          </strong>
        )}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </div>
  );
};

export default AudienceBarChart;
