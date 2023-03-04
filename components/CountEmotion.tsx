import Image from "next/image";
import React, { FC } from "react";
import { ChartType } from "../interface/chart";

type Props = {
  emotion: ChartType[];
};

const CountEmotion: FC<Props> = (props) => {
  let emotions = props.emotion;

  return (
    <div>
      <h1 className="text-xl font-semibold text-center">จำนวนการบันทึก</h1>
      <div className="flex justify-between items-center mt-3">
        {emotions.length
          ? emotions.map((emotion) => (
              <div className="" key={emotion.id}>
                <div
                  className={`relative w-12 h-12 ${
                    emotion.count !== 0 ? "" : "opacity-50"
                  }`}
                >
                  <Image
                    src={`/images/emotion/${emotion.emotion}.png`}
                    layout="fill"
                    alt="emotion"
                  />
                </div>
                <h1 className="text-center mt-1">{emotion.count}</h1>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default CountEmotion;
