import Image from "next/image";
import React, { useEffect, useState } from "react";
import { emotion } from "../../interface/emotion";
import { BsTypeH1 } from "react-icons/bs";

type Props = {
  emotion: emotion[];
};

const ReasonIntoEmotion = (props: Props) => {
  const [emotionHaveComment, setEmotionHaveComment] = useState<emotion[]>([]);

  const sortingByEmotion = (arrayEmotionHaveComment: emotion[]) => {
    let result = [];
    for (let i in arrayEmotionHaveComment) {
      result.push(arrayEmotionHaveComment[i]);
    }

    result.sort((a, b) => {
      return a.emotion - b.emotion;
    });

    return result;
  };

  useEffect(() => {
    let ignore = false;
    setEmotionHaveComment([]);
    if (!ignore) {
      let checkComment = props.emotion.filter((item) => item.comment);
      let commentEmotion = sortingByEmotion(checkComment);
      setEmotionHaveComment(commentEmotion);
    }

    return () => {
      ignore = true;
    };
  }, [props.emotion]);

  return (
    <div
      className={`w-full h-full overflow-auto scrollbar-thin scrollbar-thumb-gray-300  bg-white rounded-xl p-5 scrollbar-thumb-rounded-full scrollbar-track-rounded-full shadow-md`}
    >
      <h1 className="text-xl text-center font-semibold">
        เหตุผลที่ทำให้เกิดอารมณ์
      </h1>
      <table className="border w-full text-center mt-3 p-3 ">
        {emotionHaveComment.length !== 0 && (
          <tr>
            <th>อารมณ์</th>
            <th>เหตุผล</th>
          </tr>
        )}

        {emotionHaveComment.length !== 0 ? (
          emotionHaveComment.map((emotion) => {
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
                    <p className="text-sm mt-2  np">ระดับ {emotion.emotion}</p>
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
