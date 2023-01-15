import Image from "next/image";
import Link from "next/link";
import React from "react";

function First() {
  return (
    <div className="flex justify-around items-center flex-col h-screen">
      <div className="w-64 h-72 relative ">
        <Image src={`/images/logo.png`} alt="logo" layout="fill" />
      </div>
      <button className="text-xl bg-secondary p-5 rounded-xl shadow-md">
        <Link href="/register">เริ่มต้นใช้งาน</Link>
      </button>
    </div>
  );
}

export default First;
