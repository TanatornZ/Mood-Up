import Image from "next/image";
import React from "react";

type Props = {};

const ReasonIntoEmotion = (props: Props) => {
  return (
    <div className="w-[35%] h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300  bg-white rounded-xl p-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full shadow-md">
      <h1 className="text-xl text-center">เหตุผลที่ทำให้เกิดอารมณ์</h1>
      <table className="border w-full text-center mt-3 p-3 overflow-hidden ">
        <tr>
          <th>อารมณ์</th>
          <th>เหตุผล</th>
        </tr>

        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        <tr className="p-5">
          <td>
            <div className="relative w-10 h-10 mx-auto">
              <Image
                src={"/images/emotion/2.png"}
                layout="fill"
                alt="emotion for reason"
              />
            </div>
          </td>
          <td>รถติด</td>
        </tr>
        
      </table>
    </div>
  );
};

export default ReasonIntoEmotion;
