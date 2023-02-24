import React, { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartType } from "../../interface/chart";

interface Props {
  data: ChartType[];
  size: number
}

const DoughnutChart: FC<Props> = (
  props,
  size = 28
): JSX.Element => {
  const chartData = props.data;

  console.log(props.size);

  return (
    <div className={`w-[${size}] h-[${size}] relative my-5`}>
      <Doughnut
        plugins={[ChartDataLabels]}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
        data={{
          labels: chartData.map((data) => "ระดับอารมณ์ " + data.emotion),
          datasets: [
            {
              label: "amount",
              // datalabels: {
              //   formatter: (value, ctx) => {
              //     let sum = 0;

              //     chartData.map((data) => {
              //       sum += data.count;
              //     });
              //     let percentage =
              //       ((value * 100) / sum).toFixed(2) + "%";
              //     return percentage;
              //   },
              //   color: "#fff",
              // },
              data: chartData.map((data) => data.count),
              backgroundColor: chartData.map((data) => data.color),
            },
          ],
        }}
      />
    </div>
  );
};

export default DoughnutChart;
