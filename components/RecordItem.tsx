import Image from "next/image";
import React, { FC } from "react";
import { Data } from "../interface/data";

const RecordItem: FC<any> = ({ item }) => {
  const date = new Date(item.date);
  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="h-20 rounded-lg border-4 mt-5 bg-white flex items-center justify-between p-5">
      <div className="relative h-12 w-12">
        <Image
          src={`/images/emotion/${item.motion}.png`}
          alt="emotion"
          layout="fill"
        />
      </div>
      <div className="grow pl-5">
        <p className="text-lg">{thaiDate}</p>
        <div className=" flex justify-between">
          <p>
            อารมณ์ : <span>{item.motion}</span>
          </p>
          <p className="grow pl-12">
            การทำงาน : <span>{item.performance}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
