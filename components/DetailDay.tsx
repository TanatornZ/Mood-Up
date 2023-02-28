import React, { FC, useEffect, useState } from "react";
import Image from "next/image";

import { RxCross2 } from "react-icons/rx";
interface Props {
  day: string;
  emotion: any;
}
const DetailDay: FC<Props> = (props) => {
  const parseThaiDate = (date: string) => {
    const Day = new Date(date);
    let thaiDate = Day.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
      weekday: "long",
    });
    if (Day.toDateString().slice(0, 3) === "Sat") {
      return "ส";
    } else {
      return thaiDate[3];
    }
  };

  console.log(props.emotion);

  return (
    <div className="flex flex-col items-center justify-center">
      {props.emotion ? (
        <div className="rounded-full relative w-10 h-10">
          <Image
            src={`/images/emotion/${props.emotion}.png`}
            alt="emotion"
            layout="fill"
          />
        </div>
      ) : (
        <div className="rounded-full bg-slate-100 w-10 h-10  relative">
          <RxCross2 className="text-red-500 w-10 h-10" />
        </div>
      )}
      <h1 className="mt-1">{parseThaiDate(props.day)}.</h1>
    </div>
  );
};

export default DetailDay;
