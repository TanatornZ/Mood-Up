import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";

export default function Home() {
  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            console.log("login");
            console.log(`profile ${profile.userId}`);
            console.log(`liff ${liff}`);
          } else {
            liff.login();
            console.log("not login");
          }
        })
        .catch(() => {
          console.log("error");
        });
      // lib is error
    });
  }, []);

  return (
    <div className="">
      {/* <h1>home</h1> */}
      <div className="flex flex-col justify-center items-center">
        {/* <h1 className="text-2xl py-3">{line.userId}</h1> */}
        <p className="text-xl ">อารมณ์ของคุณอยู่ในระดับ : 4</p>
        <div className="w-32 h-32 relative my-5">
          <Image src={`/images/emotion/4.png`} alt="emotion" layout="fill" />
        </div>
        <p className="text-red-600">*เฉลี่ยจากการบันทึกจำนวน...ครั้ง</p>
      </div>
      {/* {data && <Chart motion={data?.map((data: Data) => data.motion)} />} */}
    </div>
  );
}
