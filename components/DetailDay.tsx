import React, { FC } from "react";
import Image from "next/image";

interface Props {
  day: string;
  emotion: number | null;
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

  console.log("test");
  console.log("props ", props);

  return (
    <div className="flex flex-col items-center justify-center">
      {props.emotion !== null ? (
        <div className="rounded-full relative w-10 h-10">
          <Image
            src={`/images/emotion/${props.emotion}.png`}
            alt="emotion"
            layout="fill"
           
          />
        </div>
      ) : (
        <div className="rounded-full bg-slate-400 w-10 h-10"></div>
      )}

      <h1 className="mt-1">{parseThaiDate(props.day)}</h1>
    </div>
  );
};

export default DetailDay;
