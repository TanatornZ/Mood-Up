import { getAuth } from "firebase/auth";
import React from "react";
import AdminNavber from "../../components/admin/AdminNavber";

function Conclusion() {
  console.log(getAuth().currentUser);

  return (
    <div className="flex w-screen bg-gray-100">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">สรุปผลอารมณ์</h1>
      </div>
    </div>
  );
}

export default Conclusion;
