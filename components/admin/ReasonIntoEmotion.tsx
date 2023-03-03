import Image from "next/image";
import React from "react";
import { emotion } from "../../interface/interface";
import { BsTypeH1 } from "react-icons/bs";

type Props = {
  emotion: emotion[];
};

const ReasonIntoEmotion = (props: Props) => {
  let checkComment = props.emotion.filter((item) => item.comment);


  return (
    <div className="w-[35%] h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300  bg-white rounded-xl p-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full shadow-md">
      <h1 className="text-xl text-center">เหตุผลที่ทำให้เกิดอารมณ์</h1>
      <table className="border w-full text-center mt-3 p-3 ">
      {checkComment.length!== 0 && 
        <tr>
          <th>อารมณ์</th>
          <th>เหตุผล</th>
        </tr>}

        {checkComment.length !== 0 ? (
          props.emotion.map((emotion) => {
            if (emotion.comment) {
              return (
                <tr className="p-5 " key={emotion.comment + emotion.line_id}>
                  <td>
                    <div className="relative w-10 h-10 mx-auto">
                      <Image
                        src={`/images/emotion/${emotion.emotion}.png`}
                        layout="fill"
                        alt="emotion for reason"
                      />
                    </div>
                  </td>
                  <td className="truncate  ">{emotion.comment}</td>
                </tr>
              );
            }
          })
        ) : (
          <h1 className="text-xl">ไม่มีการบันทึกเหตุผล</h1>
        )}
      </table>
    </div>
  );
};

export default ReasonIntoEmotion;
