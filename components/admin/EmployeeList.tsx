import React from "react";
import { employee } from "../../interface/employyee";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-hot-toast";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "@emotion/styled";

interface Props {
  information: employee;
  docId: string;
}

//

function EmployeeList(props: Props) {
  const information = props.information;

  const deleteUser = async () => {
    const docRef = doc(db, "user", props.docId);
    await updateDoc(docRef, {
      accept_company: false,
    }).then(() => {
      toast.error("ลบเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });
  };

  return (
    <div className="p-5  flex justify-between px-20 border-b">
      <div className="">
        <h1>
          {information.first_name} {information.last_name}
        </h1>
        <h1 className="mt-2">position : {information.job_position}</h1>
      </div>

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
          <div className="rounded-lg bg-white flex flex-col justify-center items-center my-5">
            <h1 className="text-2xl font-semibold">ยืนยันการลบ</h1>
            <p className="mt-5 text-lg ">
              ต้องการลบ {information.first_name} {information.last_name}{" "}
              ออกจากองค์กรใช่หรือไม่
            </p>
            <div className="mt-5">
              <button
                className="bg-red-500 text-white text-lg p-3 rounded-lg"
                onClick={deleteUser}
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
    </div>
  );
}

export default EmployeeList;
