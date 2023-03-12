import { collection, doc, DocumentData, updateDoc } from "firebase/firestore";
import React from "react";
import toast from "react-hot-toast";
import { AiFillCheckCircle } from "react-icons/ai";
import { db } from "../../firebase/firebaseConfig";
import { employee } from "../../interface/employyee";
import Popup from "reactjs-popup";

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

      <Popup
        trigger={
          <button className="p-3 bg-green-600 text-center rounded-xl cursor-pointer text-white">
            ยืนยัน
          </button>
        }
        modal
      >
        {(close) => (
          <div className="rounded-lg bg-white flex flex-col justify-center items-center my-5">
            <h1 className="text-2xl font-semibold">การตอบรับพนักงาน</h1>
            <p className="mt-5 text-lg ">
              ต้องการยืนยันให้ {information.first_name} {information.last_name}{" "}
              เข้าสู่องค์กรใช่หรือไม่
            </p>
            <div className="mt-5">
              <button
                className="bg-green-500 text-white text-lg p-3 rounded-lg"
                onClick={acceptUser}
              >
                ยืนยัน
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
    </div>
  );
}

export default ListWaitToAccept;
