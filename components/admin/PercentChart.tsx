import React from "react";
import DoughnutChart from "../chart/DoughnutChart";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
} from "chart.js";
function PercentChart() {
  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  const chartData = [
    {
      emotion: 1,
      count: 3,
      color: "rgb(230, 76, 60)",
    },
    {
      emotion: 2,
      count: 1,
      color: "rgb(240, 196, 25)",
    },
    {
      emotion: 3,
      count: 1,
      color: "rgb(59, 151, 211)",
    },
    {
      emotion: 4,
      count: 1,
      color: "rgb(151, 242, 177)",
    },
    {
      emotion: 5,
      count: 1,
      color: "rgb(79, 186, 111)",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <DoughnutChart data={chartData} size={32} />
      <h1 className="text-sm">อัตราส่วนการบันทึก</h1>
    </div>
  );
}

export default PercentChart;
