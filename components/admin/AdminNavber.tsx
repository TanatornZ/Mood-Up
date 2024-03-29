import { getAuth } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import Link from "next/link";
import Router, { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { db } from "../../firebase/firebaseConfig";
import { RootState } from "../../store";
import { setAdmin, setCompanyName } from "../../store/adminAuth-slice";

function AdminNavber() {
  const admin = useSelector((state: RootState) => state.adminAuth);
  const auth = getAuth();

  const dispatch = useDispatch();
  const router = useRouter();
  const [path, setPath] = useState<string>("");

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
    setPath(router.asPath.slice(7));
    const getCompanyName = async () => {
      const querySnapshot = await getDocs(collection(db, "company"));
      querySnapshot.forEach((doc) => {
        if (doc.id === admin.companyId) {
          dispatch(setCompanyName(doc.data().name));
        }
      });
    };
    getCompanyName();
  }, [admin.companyId, dispatch, path, router.asPath]);

  if (auth.currentUser?.uid) {
    getAdminId(auth.currentUser?.uid);
  }

  const logout = () => {
    getAuth().signOut();
    dispatch(setAdmin({ admin: "", company: "" }));
    Router.push("/admin/login");
  };

  return (
    <div className="bg-white w-[20%] h-screen shadow-lg flex flex-col  items-center py-8 justify-between">
      <div className="">
        {admin.companyName ? (
          <h1 className="text-3xl ">{admin.companyName}</h1>
        ) : (
          <h1 className="text-3xl animate-pulse ">....</h1>
        )}
      </div>
      <ul className="text-center text-lg">
        <li className="hover:text-gray-300 cursor-pointer ">
          <Link href={"/admin"} className={`${path === "" ? "underline" : ""}`}>
            จัดการพนักงาน
          </Link>
        </li>
        <li className="my-12 hover:text-gray-300 cursor-pointer">
          <Link
            href={"/admin/summarize"}
            className={`${path === "summarize" ? "underline" : ""}`}
          >
            การสรุปผล
          </Link>
        </li>
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
