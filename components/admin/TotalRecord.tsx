import React, { FC } from "react";

interface Props {
  totalRecord: number;
}
const TotalRecord: FC<Props> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-lg text-center">จาการบันทึกทั้งหมด</h1>

      <h1 className="text-6xl my-5 font-bold">{props.totalRecord}</h1>

      <p>ครั้ง</p>
    </div>
  );
};

export default TotalRecord;
