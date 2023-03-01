import React, { FC } from "react";
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { ChartType } from "../../interface/chart";

interface Props {
  data: ChartType[];
  size: number;
}

const DoughnutChart: FC<Props> = (props): JSX.Element => {
  const chartData = props.data;

  console.log(chartData)
  return (
    <div className={`w-${props.size} h-${props.size} relative my-5`}>
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
              label: "จำนวน",
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
