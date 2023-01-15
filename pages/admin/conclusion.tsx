import { getAuth } from "firebase/auth";
import React from "react";
import AdminNavber from "../../components/admin/AdminNavber";

function Conclusion() {
  console.log(getAuth().currentUser);

  return (
    <div className="flex w-screen">
      <AdminNavber />
      <div className="">Conclusion</div>
    </div>
  );
}

export default Conclusion;
