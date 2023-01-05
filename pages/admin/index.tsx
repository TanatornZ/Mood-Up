import React, { ReactElement } from "react";
import { AiOutlineBell } from "react-icons/ai";
import AdminNavber from "../../components/admin/AdminNavber";
import AdminLayout from "../../components/layout/AdminLayout";

export default function Admin() {
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
      </div>

      <div className="absolute top-5 right-5">
        <AiOutlineBell size={50} />
        <div className="bg-red-600 rounded-full w-6 h-6 absolute top-0 right-[-0.2em]">
          <h1 className="text-center text-md text-white">2</h1>
        </div>
      </div>
    </div>
  );
}

// Admin.getLayout = function getLayout(manage: ReactElement) {
//   return <AdminLayout>{manage}</AdminLayout>;
// };
