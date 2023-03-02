import React from "react";
import BarChart from "../chart/BarChart";
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
            labels: chartData.map((data) => "ระดับอารมณ์ " + data.emotion),
            datasets: [
              {
                label: "amount",
                data: chartData.map((data) => data.count),
                backgroundColor: chartData.map((data) => data.color),
              },
            ],
          }}
        />
   
    </div>
  );
};

export default HorizontalChart;

const chartData = [
  {
    emotion: 1,
    count: 3,
    color: "rgb(230, 76, 60)",
  },
  {
    emotion: 2,
    count: 4,
    color: "rgb(240, 196, 25)",
  },
  {
    emotion: 3,
    count: 3,
    color: "rgb(59, 151, 211)",
  },
  {
    emotion: 4,
    count: 2,
    color: "rgb(151, 242, 177)",
  },
  {
    emotion: 5,
    count: 3,
    color: "rgb(79, 186, 111)",
  },
];