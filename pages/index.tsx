import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLineUser } from "../store/auth-slice";
export default function Home() {
  const lineAuth = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            console.log(profile)
            await dispatch(
              setLineUser({
                line_id: profile.userId as string,
                picture: profile.pictureUrl,
              })
            );
          } else {
            liff.login();
          }
        })
        .catch(() => {
          console.log("error");
        });
      // lib is error
    });
  }, []);

  console.log(lineAuth)

  return (
    <div className="">
      {/* <h1>home</h1> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl py-3">{lineAuth.line_id}</h1>
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
