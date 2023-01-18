import { getAuth } from "firebase/auth";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import Router from "next/router";
import React, {
  ReactElement,
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import { Toaster } from "react-hot-toast";
import { AiOutlineBell } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import AdminNavber from "../../components/admin/AdminNavber";
import EmployeeList from "../../components/admin/EmployeeList";
import PopupAccept from "../../components/admin/PopupAccept";
import { db } from "../../firebase/firebaseConfig";
import { AuthAdmin, setAdmin } from "../../store/adminAuth-slice";

export default function Admin() {
  const [showAccept, setShowAccept] = useState<boolean>(false);
  const admin: AuthAdmin = useSelector((state: any) => state.adminAuth);
  const auth = getAuth();
  const dispatch = useDispatch();

  const [user, setUser] = useState([]);

  const getUser = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let data: any = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().company_id === admin.companyId) {
        data.push({ id: doc.id, information: doc.data() });
      }
    });

    return data;
  }, [admin.companyId]);

  const getAdminId = async (user: string) => {
    const querySnapshot = await getDocs(collection(db, "admin"));
    querySnapshot.forEach((doc) => {
      // check id
      if (doc.data().UID === user) {
        dispatch(setAdmin({ admin: user, company: doc.data().company_id }));
      }
    });
  };

  useEffect(() => {
    const data = getUser();
    data.then((item) => {
      setUser(item);
    });
  }, [getUser]);

  if (auth.currentUser?.uid) {
    getAdminId(auth.currentUser?.uid);
  }

  return (
    <div className="flex bg-gray-100 w-screen">
      <div>
        <Toaster />
      </div>
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

        <div className="bg-white rounded-xl mt-8 ">
          {user.map((employee: any) => {
            if (employee.information.accept_company) {
              return (
                <EmployeeList
                  key={employee.id}
                  information={employee.information}
                  docId={employee.id}
                />
              );
            }
          })}
        </div>
      </div>

      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowAccept(!showAccept)}
      >
        <AiOutlineBell size={40} />
        <div className="bg-red-600 rounded-full w-5 h-5 absolute top-0 right-[-0.2em]">
          <h1 className="text-center text-sm text-white">!</h1>
        </div>
      </div>

      <PopupAccept showAccept={showAccept} user={user} />
    </div>
  );
}
