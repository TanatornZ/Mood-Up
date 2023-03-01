import Image from "next/image";
import React, { FC } from "react";

interface Props {
  emotion: Number;
}

const ConcludeEmotion: FC<Props> = (props) => {
    console.log(props)
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-md text-center">
        อารมณ์ของพนักงานเฉลี่ยอยู่ในระดับ : {props.emotion}
      </h1>
      <div className="relative w-24 h-24 mt-5 ">
          <Image src={`/images/emotion/${props.emotion}.png`} alt="emotion"  layout="fill"/>
      </div>
    </div>
  );
};

export default ConcludeEmotion;
