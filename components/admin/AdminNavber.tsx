import { collection, getDocs } from "firebase/firestore";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";

function AdminNavber() {
  const admin = useSelector((state: any) => state.adminAuth);
  const [companyName, setCompanyName] = useState<string>("");

  const getCompanyName = async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    querySnapshot.forEach((doc) => {
      
    });
  };

  return (
    <div className="bg-white w-[20%] h-screen shadow-lg flex flex-col  items-center py-8 justify-between">
      <h1 className="text-3xl">ชื่อบริษัท</h1>
      <ul className="text-center text-lg">
        <li className="hover:text-gray-300 cursor-pointer ">
          <div className="underline">จัดการพนักงาน</div>
        </li>
        <li className="py-12 hover:text-gray-300 cursor-pointer">การสรุปผล</li>
        <li className="hover:text-gray-300 cursor-pointer">อารมณ์ประจำวัน</li>
      </ul>
      <button className="text-lg text-white bg-red-600 p-3 rounded-xl shadow-lg hover:bg-red-700">
        ออกจากระบบ
      </button>
    </div>
  );
}

export default AdminNavber;
