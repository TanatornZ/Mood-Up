import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import Image from "next/image";


export default function Home() {
  const userContext = useContext(AuthContext);
  const [user, setUser] = useState<string>("");
  const [emotion, setEmotion] = useState<number>(1);
  const [line, setLine] = useState();
  const loadLine = async () => {
    await import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            console.log("login");
            const profile = await liff.getProfile().then((profile: any) => {
              setLine(profile);
            });
            console.log(`profile ${line}`)
            console.log(`liff ${liff}`)
          } else {
            // liff.login();
            console.log("not login");
          }
        })
        .catch(() => {
          console.log("error");
        });
      // lib is error
    });
  };

  useEffect(() => {
    loadLine();
    userContext?.setUser("id123");
    setUser("ธนาธร");
    setEmotion(4);
  }, [userContext]);



  return (
    <div className="">
      {/* <h1>home</h1> */}
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl py-3">{user}</h1>
        <p className="text-xl ">อารมณ์ของคุณอยู่ในระดับ : {emotion}</p>
        <div className="w-32 h-32 relative my-5">
          <Image
            src={`/images/emotion/${emotion}.png`}
            alt="emotion"
            layout="fill"
          />
        </div>
        <p className="text-red-600">*เฉลี่ยจากการบันทึกจำนวน...ครั้ง</p>
      </div>
      {/* {data && <Chart motion={data?.map((data: Data) => data.motion)} />} */}
    </div>
  );
}
