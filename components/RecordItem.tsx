import Image from "next/image";
import React, { FC, useEffect } from "react";

interface Props {
  item: any;
  showDate: boolean;
}
const RecordItem: FC<Props> = (props) => {
  const date = props.item.date.toDate();

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  

  return (
    <div className=" rounded-xl  mt-5 bg-white flex items-center justify-between p-3 drop-shadow-md">
      <div className="relative h-12 w-12 ml-2">
        <Image
          src={`/images/emotion/${props.item.emotion}.png`}
          alt="emotion"
          layout="fill"
        />
      </div>
      <div className="grow p-3">
        {props.showDate ? <p className="text-md font-bold">{thaiDate}</p> : ""}

        <p>
          อารมณ์ : <span className="font-bold ">{props.item.emotion}</span>
        </p>

        {props.item.comment && <p>{props.item.comment}</p>}
      </div>
    </div>
  );
};

export default RecordItem;
