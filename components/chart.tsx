import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import React from "react";
import { faker } from "@faker-js/faker";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface props {
  motion: number[];
  performance: number[];
}

function Chart({ motion, performance }: props) {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: "Chart.js Line Chart",
      },
    },
  };

  const labels = ["M", "T", "W", "T", "F"];

  const data = {
    labels,
    datasets: [
      {
        label: "ประสิทธิภาพการทำงาน",
        data: performance,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "อารมณ์",
        data: motion,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  console.log(motion);
  
  return <Line options={options} data={data} />;
}

export default Chart;
