import React from "react";
import DoughnutChart from "./DoughnutChart";
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
import { ChartType } from "../../interface/chart";

type Props = {
  chartData: ChartType[];
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
