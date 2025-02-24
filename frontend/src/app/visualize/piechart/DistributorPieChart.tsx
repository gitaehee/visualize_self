import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";
import { API_BASE_URL } from "@/const/baseApi";

const DistributorPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/distributor-counts`)
      .then((response) => {
        const formattedData = response.data.map((item) => ({
          id: item.배급사,
          label: item.배급사,
          value: item.count,
        }));
        setData(formattedData);
      })
      .catch((error) => {
        console.error("배급사 데이터를 불러오는 중 오류 발생:", error);
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

  const CustomTooltip = ({ datum }) => (
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
      <strong>{datum.id}</strong>
      <div>🎬 {datum.value}편</div>
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
        color: "#fff",
      }}
    >
      <ResponsivePie
        data={
          data.length > 0
            ? data
            : [{ id: "데이터 없음", label: "데이터 없음", value: 1 }]
        }
        margin={{ top: 50, right: 120, bottom: 160, left: 80 }} // 🎯 아래 공간 충분히 확보
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={5}
        colors={customColors}
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.8]] }}
        activeOuterRadiusOffset={8}
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff"
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsDiagonalLength={20}
        enableArcLabels={true}
        arcLabelsRadiusOffset={0.55}
        arcLabelsTextColor="#fff"
        tooltip={CustomTooltip}
        theme={{
          labels: {
            text: {
              fontSize: 14,
              fill: "#fff",
            },
          },
          legends: {
            text: {
              fontSize: 14,
              fill: "#fff",
            },
          },
        }}
        legends={[
          {
            anchor: "right",
            direction: "column", // 🎯 핵심
            justify: false,
            translateX: 0,
            translateY: 80,
            itemsSpacing: 10,
            itemWidth: 120,
            itemHeight: 20,
            itemTextColor: "#fff",
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
};

export default DistributorPieChart;
