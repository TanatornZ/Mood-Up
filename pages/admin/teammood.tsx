import { getAuth } from "firebase/auth";
import React from "react";
import AdminNavber from "../../components/admin/AdminNavber";

function TeamMoodAdmin() {
  console.log(getAuth().currentUser);
  return (
    <div className="flex w-screen">
      <AdminNavber />
      <div className="">TeamMoodAdmin</div>
    </div>
  );
}

export default TeamMoodAdmin;
