import styled from "@emotion/styled";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Image from "next/image";
import React, { FC, useEffect } from "react";
import toast from "react-hot-toast";
import Popup from "reactjs-popup";
import { db } from "../firebase/firebaseConfig";

interface Props {
  item: any;
  id: string;
  showDate: boolean;
}

const StlyeWrapper = styled.div`
  .popup-content {
    width: 80%;
    border-radius: 0.5em 0.5em;
  }
`;

const RecordItem: FC<Props> = (props) => {
  const date = props.item.date.toDate();

  const deleteEmotion = async () => {
    const docRef = doc(db, "emotion", props.id);
    await deleteDoc(docRef).then(() => {
      toast.error("ลบเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  console.log(props.id);
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
        {props.showDate ? <p className="text-sm font-bold">{thaiDate}</p> : ""}

        <p>
          อารมณ์ : <span className="font-bold mt-2">{props.item.emotion}</span>
        </p>

        {props.item.comment && <p>{props.item.comment}</p>}
      </div>

      <StlyeWrapper>
        <Popup
          className="rounded-lg"
          trigger={
            <button className="p-3 bg-red-600 text-center rounded-xl cursor-pointer text-white">
              ลบ
            </button>
          }
          modal
        >
          {(close) => (
            <div className="rounded-lg bg-white flex flex-col justify-center items-center my-5 ">
              <h1 className="text-2xl font-semibold">ยืนยันการลบ</h1>
              <p className="mt-5 text-lg text-center">
                ต้องลบการบันทึกนี้ใช่หรือไม่
              </p>
              <div className="mt-5">
                <button
                  className="bg-red-500 text-white text-lg p-3 rounded-lg"
                  onClick={deleteEmotion}
                >
                  ลบ
                </button>
                <button
                  className="bg-gray-500 ml-5 text-white text-lg p-3 rounded-lg"
                  onClick={() => close()}
                >
                  ยกเลิก
                </button>
              </div>
            </div>
          )}
        </Popup>
      </StlyeWrapper>
    </div>
  );
};

export default RecordItem;
