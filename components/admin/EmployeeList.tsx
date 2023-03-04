import React from "react";
import { employee } from "../../interface/employyee";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { toast } from "react-hot-toast";

interface Props {
  information: employee;
  docId: string;
}

function EmployeeList(props: Props) {
  const information = props.information;

  // Update the timestamp field with the value from the server
  const deleteUser = async () => {
    const docRef = doc(db, "user", props.docId);
    await updateDoc(docRef, {
      accept_company: false,
    }).then(() => {
      toast.error("ลบเรียบร้อย");
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    });;
  };

  return (
    <div className="p-5  flex justify-between px-20 border-b">
      <div className="">
        <h1>
          {information.first_name} {information.last_name}
        </h1>
        <h1 className="mt-2">position : {information.job_position}</h1>
      </div>
      <div
        className="p-3 bg-red-600 text-center rounded-xl cursor-pointer text-white"
        onClick={() => {
          deleteUser();
        }}
      >
        <h1 className="text-lg">ลบ</h1>
      </div>
    </div>
  );
}

export default EmployeeList;
