import React from "react";

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
import { Bar } from "react-chartjs-2";
type Props = {
  chartData: any;
};

interface ChartData {
  emotion : string 
  count: number
  color: string
}

const HorizontalChart = (props: Props) => {
  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  let chartData = props.chartData
  return (
    <div className="relative w-full h-full p-5 shadow-md flex justify-center items-center">
        <Bar     
          options={{
            indexAxis: "y" as const,
            plugins: {
              legend: { display: false },
            },
          }}
          data={{
            labels: chartData.map((data: ChartData) => "ระดับอารมณ์ " + data.emotion),
            datasets: [
              {
                label: "amount",
                data: chartData.map((data: ChartData) => data.count),
                backgroundColor: chartData.map((data: ChartData) => data.color),
              },
            ],
          }}
        />
   
    </div>
  );
};

export default HorizontalChart;

