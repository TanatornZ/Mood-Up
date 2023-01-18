import { collection, doc, DocumentData } from "firebase/firestore";
import React from "react";
import { AiFillCheckCircle } from "react-icons/ai";
import { db } from "../../firebase/firebaseConfig";

interface Props {
  first_name: string;
  job_position: string;
  last_name: string;
}

function ListWaitToAccept(props: DocumentData) {
  console.log(props)
  return (
    <div className=" p-4 flex justify-between items-center border-b">
      <div className="">
        <h1 className="text-xl mb-2">
          {props.first_name} {props.last_name}
        </h1>
        <h1>ตำแหน่ง : {props.job_position} </h1>
      </div>

      <div className="">
        <AiFillCheckCircle className="w-10 h-10 text-green-500 cursor-pointer hover:text-green-600" />
      </div>
    </div>
  );
}

export default ListWaitToAccept;
