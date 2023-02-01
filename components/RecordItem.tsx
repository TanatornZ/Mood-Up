import Image from "next/image";
import React, { FC, useEffect } from "react";
import { emotion } from "../interface/interface";

const RecordItem: FC<any> = ({ item }) => {
  // const date = new Date(item.date);
  // console.log(item.date)
  const date = item.date.toDate();
  useEffect(() => {
    console.log(item.date);
  }, []);

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className=" rounded-xl  mt-5 bg-white flex items-center justify-between p-2 drop-shadow-md">
      <div className="relative h-12 w-12 ml-2">
        <Image
          src={`/images/emotion/${item.emotion}.png`}
          alt="emotion"
          layout="fill"
        />
      </div>
      <div className="grow p-3">
        <p className="text-md font-bold">{thaiDate}</p>

        <p>
          อารมณ์ : <span className="font-semibold">{item.emotion}</span>
        </p>

        {item.comment && <p>{item.comment}</p>}
      </div>
    </div>
  );
};

export default RecordItem;
