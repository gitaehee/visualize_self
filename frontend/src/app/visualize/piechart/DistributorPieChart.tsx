import React, { useState, useEffect } from "react";
import axios from "axios";
import { ResponsivePie } from "@nivo/pie";

const DistributorPieChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/distributor-counts")
      .then((response) => {
        console.log("🎬 API 응답 데이터:", response.data);

        // 🎯 데이터 변환 (Nivo PieChart 형식)
        const formattedData = response.data.map((item) => ({
          id: item.배급사, // 라벨
          label: item.배급사, // 툴팁에 표시될 배급사명
          value: item.count, // 영화 개수
        }));

        setData(formattedData);
      })
      .catch((error) => {
        console.error("배급사 데이터를 불러오는 중 오류 발생:", error);
      });
  }, []);

  return (
    <div
      style={{
        height: "500px",
        width: "500px",
        background: "#222",
        padding: "20px",
        borderRadius: "10px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsivePie
        data={data.length > 0 ? data : [{ id: "데이터 없음", label: "데이터 없음", value: 1 }]}
        margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
        innerRadius={0.5}
        padAngle={2}
        cornerRadius={5}
        colors={{ scheme: "set3" }} // 🎨 부드러운 색상 적용
        borderWidth={2}
        borderColor={{ from: "color", modifiers: [["darker", 0.6]] }}
        activeOuterRadiusOffset={10} // ✅ 호버 시 크기 확대 효과 추가
        enableArcLinkLabels={true}
        arcLinkLabelsSkipAngle={10}
        arcLinkLabelsTextColor="#fff" // ✅ 다크 모드에서 링크 색상 흰색
        arcLinkLabelsThickness={2}
        arcLinkLabelsStraightLength={10}
        arcLinkLabelsDiagonalLength={15}
        enableArcLabels={true}
        arcLabelsRadiusOffset={0.65}
        arcLabelsTextColor="#fff" // ✅ 다크 모드에서 라벨 색상 흰색
        tooltip={({ datum }) => (
          <div
            style={{
              padding: "8px",
              background: "rgba(255, 255, 255, 0.9)",
              color: "#333",
              borderRadius: "5px",
              textAlign: "center",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
            }}
          >
            <strong>{datum.id}</strong>
            <div>🎬 {datum.value}편</div>
          </div>
        )} // ✅ 툴팁 스타일 개선
        legends={[
          {
            anchor: "bottom",
            direction: "row",
            justify: false,
            translateY: 60,
            itemsSpacing: 10,
            itemWidth: 100,
            itemHeight: 18,
            itemTextColor: "#fff", // ✅ 범례 색상 변경
            symbolSize: 18,
            symbolShape: "circle",
          },
        ]}
      />
    </div>
  );
};

export default DistributorPieChart;
