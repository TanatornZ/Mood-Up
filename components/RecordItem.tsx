import Image from "next/image";
import React, { FC } from "react";


const RecordItem: FC<any> = ({ item }) => {
  const date = new Date(item.date);

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="h-20 rounded-xl  mt-5 bg-white flex items-center justify-between p-3 drop-shadow-md">
      <div className="relative h-12 w-12">
        <Image
          src={`/images/emotion/${item.motion}.png`}
          alt="emotion"
          layout="fill"
        />
      </div>
      <div className="grow pl-3">
        <p className="text-md font-bold">{thaiDate}</p>
        <div className=" flex justify-between">
          <p>
            อารมณ์ : <span className="font-semibold">{item.motion}</span>
          </p>
          <p className="grow pl-12">
            การทำงาน : <span className="font-semibold">{item.performance}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RecordItem;
