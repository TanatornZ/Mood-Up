import React, { FC } from "react";

interface Props {
  totalEmployee: number;
  totalRecord: number;
}
const CheckEmployee: FC<Props> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-lg text-center">จำนวนคนบันทึก</h1>

      <h1 className="text-6xl my-5 font-semibold">
        {props.totalRecord} / {props.totalEmployee}
      </h1>

      <p>คน</p>
    </div>
  );
};

export default CheckEmployee;
