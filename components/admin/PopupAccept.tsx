import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import ListWaitToAccept from "./ListWaitToAccept";

interface Props {
  showAccept: boolean;
  user: DocumentData[];
}
function PopupAccept(props: Props) {
  const admin = useSelector((state: any) => state.adminAuth);

  return (
    <div
      className={`bg-white border border-3 p-3  w-96 absolute top-16 right-5 rounded-lg transition-all origin-[90%] delay-200 ${
        props.showAccept ? "scale-100	" : "scale-0	"
      }`}
    >
      <h1 className="text-xl text-center ">คำร้อง</h1>

      {props.user.map((items) => {
        if (!items.accept_company) {
          return <ListWaitToAccept key={items.id} {...items} />;
        }
      })}
    </div>
  );
}

export default PopupAccept;
