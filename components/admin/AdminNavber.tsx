import { collection, getDocs } from "firebase/firestore";
import Router from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { setAdmin } from "../../store/adminAuth-slice";

function AdminNavber() {
  const admin = useSelector((state: any) => state.adminAuth);
  const [companyName, setCompanyName] = useState<string>("");
  const dispatch = useDispatch();

  useEffect(() => {
    const getCompanyName = async () => {
      const querySnapshot = await getDocs(collection(db, "company"));
      querySnapshot.forEach((doc) => {
        if (doc.id === admin.companyId) {
          setCompanyName(doc.data().name);
        }
      });
    };
    getCompanyName();
    
  });

  console.log(admin);

  const logout = () => {
    dispatch(setAdmin({ admin: "", company: "" }));

    Router.push("/admin");
  };

  return (
    <div className="bg-white w-[20%] h-screen shadow-lg flex flex-col  items-center py-8 justify-between">
      <h1 className="text-3xl">{companyName}</h1>
      <ul className="text-center text-lg">
        <li className="hover:text-gray-300 cursor-pointer ">
          <div className="underline">จัดการพนักงาน</div>
        </li>
        <li className="py-12 hover:text-gray-300 cursor-pointer">การสรุปผล</li>
        <li className="hover:text-gray-300 cursor-pointer">อารมณ์ประจำวัน</li>
      </ul>
      <button
        className="text-lg text-white bg-red-600 p-3 rounded-xl shadow-lg hover:bg-red-700"
        onClick={logout}
      >
        ออกจากระบบ
      </button>
    </div>
  );
}

export default AdminNavber;
