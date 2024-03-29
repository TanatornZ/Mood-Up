import { getAuth } from "firebase/auth";
import { collection, DocumentData, getDocs } from "firebase/firestore";
import Router, { useRouter } from "next/router";
import React, {
  ReactElement,
  Suspense,
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
import { employee, employeeNid } from "../../interface/employyee";
import { RootState } from "../../store";
import { AuthAdmin, setAdmin } from "../../store/adminAuth-slice";
import Spinner from "../../components/Spinner";

export default function Admin() {
  const [showAccept, setShowAccept] = useState<boolean>(false);
  const admin = useSelector((state: RootState) => state.adminAuth);
  const auth = getAuth();
  const dispatch = useDispatch();
  const router = useRouter();

  const [user, setUser] = useState<employeeNid[]>([]);

  const getUser = useCallback(async () => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let data: employeeNid[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().company_id === admin.companyId) {
        data.push({ id: doc.id, information: doc.data() as employee });
      }
    });
    return data;
  }, [admin.companyId]);

  useEffect(() => {
    const data = getUser();
    data.then((item) => {
      setUser(item);
    });
    const auth = getAuth();
    setTimeout(() => {
      if (!auth.currentUser) {
        router.push("/admin/login");
      }
    }, 500);
  }, [auth.currentUser, getUser, router]);

  const unAcceptUser = user.filter(
    (u) => u.information.accept_company === false
  );

  console.log("un user ", unAcceptUser);

  return (
    <div className="flex bg-gray-100 w-screen">
      <div>
        <Toaster />
      </div>
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">จัดการพนักงาน</h1>

        <Suspense fallback={<Spinner />}>
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
        </Suspense>
      </div>

      <div
        className="absolute top-5 right-5 cursor-pointer"
        onClick={() => setShowAccept(!showAccept)}
      >
        <AiOutlineBell size={40} />
        {unAcceptUser.length !== 0 && (
          <div className="bg-red-600 rounded-full w-5 h-5 absolute top-0 right-[-0.2em]">
            <h1 className="text-center text-sm text-white">!</h1>
          </div>
        )}
      </div>

      <PopupAccept showAccept={showAccept} user={user} />
    </div>
  );
}
