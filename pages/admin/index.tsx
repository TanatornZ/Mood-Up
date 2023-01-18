import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { ReactElement, useCallback, useEffect, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import { useSelector } from "react-redux";
import AdminLogin from "../../components/admin/AdminLogin";
import AdminNavber from "../../components/admin/AdminNavber";
import PopupAccept from "../../components/admin/PopupAccept";
import { db } from "../../firebase/firebaseConfig";
import { AuthAdmin } from "../../store/adminAuth-slice";

export default function Admin() {
  const [showAccept, setShowAccept] = useState<boolean>(false);
  const admin: AuthAdmin = useSelector((state: any) => state.adminAuth);

  const [user, setUser] = useState<DocumentData[]>([]);

  const getUser = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let data: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().company_id === admin.companyId) {
        data.push(doc.data());
      }
    });

    return data;
  }, [admin.companyId]);

  useEffect(() => {
    const data = getUser();
    data.then((item) => {
      setUser(item);
    });
  }, [getUser]);

  if (admin.adminId === "") {
    return <AdminLogin />;
  }

  return (
    <div className="flex bg-gray-100 w-screen">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">จัดการพนักงาน</h1>
        <div className="mt-5">
          <label htmlFor="job_select">แสดงตามตำแหน่ง</label>
          <select
            id="job_select"
            className="ml-3 bg-white border rounded-lg p-1"
          >
            <option value="1"> front-end </option>
            <option value="2"> back-end </option>
          </select>
        </div>

        <div className="bg-white p-5 mt-8 rounded-xl flex justify-between px-20">
          <div className="">
            <h1>first last</h1>
            <h1>position</h1>
          </div>
          <div className="p-3 bg-slate-600 rounded-xl cursor-pointer text-white">
            <h1 className="text-lg">edit</h1>
          </div>
        </div>
      </div>

      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowAccept(!showAccept)}
      >
        <AiOutlineBell size={40} />
        <div className="bg-red-600 rounded-full w-5 h-5 absolute top-0 right-[-0.2em]">
          <h1 className="text-center text-sm text-white">2</h1>
        </div>
      </div>

      <PopupAccept showAccept={showAccept} user={user} />
    </div>
  );
}
