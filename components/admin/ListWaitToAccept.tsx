import { collection, doc, DocumentData, updateDoc } from "firebase/firestore";
import React from "react";
import toast from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import { db } from "../../firebase/firebaseConfig";
import { employee } from "../../interface/employyee";

interface Props {
  information: employee;
  docId: string;
}

function ListWaitToAccept(props: Props) {
  const information = props.information;
  const employeeRef = doc(db, "user", props.docId);

  const acceptUser = async () => {
    await updateDoc(employeeRef, {
      accept_company: true,
    }).then(() => {
      toast.success("เพิ่มเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  return (
    <div className=" p-4 flex justify-between items-center border-b">
      <div className="">
        <h1 className="text-xl mb-2">
          {information.first_name} {information.last_name}
        </h1>
        <h1>ตำแหน่ง : {information.job_position} </h1>
      </div>

      <AiFillCheckCircle
        className="w-10 h-10 text-green-500 cursor-pointer hover:text-green-600"
        onClick={acceptUser}
      />
    </div>
  );
}

export default ListWaitToAccept;
