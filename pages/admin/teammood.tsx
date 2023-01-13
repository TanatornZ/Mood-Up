import { getAuth } from "firebase/auth";
import React from "react";
import AdminNavber from "../../components/admin/AdminNavber";

function Teammood() {
  console.log(getAuth().currentUser);
  return (
    <div className="flex w-screen">
      <AdminNavber />
      <div className="">asdfa</div>
    </div>
  );
}

export default Teammood;
