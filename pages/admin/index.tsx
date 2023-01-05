import React, { ReactElement, useState } from "react";
import { AiOutlineBell } from "react-icons/ai";
import AdminLogin from "../../components/admin/AdminLogin";
import AdminNavber from "../../components/admin/AdminNavber";
import PopupAccept from "../../components/admin/PopupAccept";

export default function Admin() {
  const [showAccept, setShowAccept] = useState<boolean>(false);

  return <AdminLogin />;

  // return (
  //   <div className="flex bg-gray-100 w-screen">
  //     <AdminNavber />
  //     <div className="p-8 w-[80%]">
  //       <h1 className="text-3xl text-center">จัดการพนักงาน</h1>
  //       <div className="mt-5">
  //         <label htmlFor="job_select">แสดงตามตำแหน่ง</label>
  //         <select
  //           id="job_select"
  //           className="ml-3 bg-white border rounded-lg p-1"
  //         >
  //           <option value="1"> front-end </option>
  //           <option value="2"> back-end </option>
  //         </select>
  //       </div>
  //     </div>

  //     <div
  //       className="absolute top-5 right-5 cursor-pointer"
  //       onClick={() => setShowAccept(!showAccept)}
  //     >
  //       <AiOutlineBell size={40} />
  //       <div className="bg-red-600 rounded-full w-5 h-5 absolute top-0 right-[-0.2em]">
  //         <h1 className="text-center text-sm text-white">2</h1>
  //       </div>
  //     </div>

  //     <PopupAccept showAccept={showAccept} />
  //   </div>
  // );
}

// Admin.getLayout = function getLayout(manage: ReactElement) {
//   return <AdminLayout>{manage}</AdminLayout>;
// };
