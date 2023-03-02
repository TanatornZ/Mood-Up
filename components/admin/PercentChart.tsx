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

type Props = {
  chartData: any;
};
function PercentChart(props: Props) {
  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  
  return (
    <div className="flex flex-col justify-center items-center">
      <DoughnutChart data={props.chartData} size={32} />
      <h1 className="text-sm">อัตราส่วนการบันทึก</h1>
    </div>
  );
}

export default PercentChart;
