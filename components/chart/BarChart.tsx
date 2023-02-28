import React, { FC } from "react";
import { Bar } from "react-chartjs-2";
import { ChartType } from "../../interface/chart";

interface Props {
  data: ChartType[];
}
const BarChart: FC<Props> = (props): JSX.Element => {

  let chartData = props.data
  
  return (
    <div className="bg-white col-span-3 h-[420px] w-full rounded-xl p-5 flex justify-center">
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

export default BarChart;
