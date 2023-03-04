import { collection, doc, DocumentData, getDocs } from "firebase/firestore";
import React, { useCallback, useEffect, useState } from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { employee, employeeNid } from "../../interface/employyee";
import ListWaitToAccept from "./ListWaitToAccept";


interface Props {
  showAccept: boolean;
  user: employeeNid[];
}

function PopupAccept(props: Props) {
  const user = props.user;

  return (
    <div
      className={`bg-white border border-3 p-3  w-96 absolute top-16 right-5 rounded-lg transition-all origin-[90%] delay-200 ${
        props.showAccept ? "scale-100" : "scale-0"
      }`}
    >
      <h1 className="text-xl text-center">คำร้อง</h1>
      {user.map((items: employeeNid) => {
        if (!items.information.accept_company) {
          return (
            <ListWaitToAccept
              key={items.id}
              information={items.information}
              docId={items.id}
            />
          );
        }
      })}
    </div>
  );
}

export default PopupAccept;
