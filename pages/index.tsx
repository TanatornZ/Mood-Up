import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLineUser } from "../store/auth-slice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { setUser } from "../store/user-slice";
import { emotion } from "../interface/interface";
import { getArrayEmotion } from "../utils/getArrayEmotion";
import { findAvrEmotion } from "../utils/getEmotionInCompany";
import RecordDay from "../components/RecordDay";
export default function Home() {
  const lineAuth = useSelector((state: any) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: any) => state.user);
  const [emotion, setEmotion] = useState<emotion[]>([]);

  const checkUserRegister = async (lineId: string) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let registered = false;
    querySnapshot.forEach((doc) => {
      // check id
      if (doc.data().line_id === lineId) {
        dispatch(
          setUser({
            firstName: doc.data().first_name,
            lastName: doc.data().last_name,
            userId: doc.id,
            companyId: doc.data().company_id,
            pictureUrl: doc.data().pictureUrl,
          })
        );
        registered = true;
      }
    });
    if (registered) {

    } else {
      router.push("/first");
    }
  };

  useEffect(() => {
    // import("@line/liff").then((liff) => {
    //   liff
    //     .init({ liffId: "1657785397-LVBe6BkX" })
    //     .then(async () => {
    //       if (liff.isLoggedIn()) {
    //         const profile = await liff.getProfile();

    //         dispatch(
    //           setLineUser({
    //             userId: profile.userId as string,
    //             pictureUrl: profile.pictureUrl,
    //           })
    //         );
    //       } else {
    //         liff.login();
    //       }
    //     })
    //     .catch(() => {
    //       console.log("error");
    //     });
    // });

    dispatch(
      setLineUser({
        userId: "U03b155b3f617330ebe19fd13038964eb",
        pictureUrl:
          "https://profile.line-scdn.net/0hi90K76b8NhYdMiPyUfxIaW1iNXw-Q28EZAQrdn0yPCEkUHVGZlZ_cio2aXZyBCFDNVEqdS40YSQRIUFwA2TKIhoCaCEkBHdJNVZx9g",
      })
    );

    const fetchData = async () => {
      const data = await getArrayEmotion(lineAuth.userId);
      setEmotion(data);
    };

    fetchData();
  }, [dispatch, lineAuth.userId]);

  if (lineAuth.userId !== "") {
    checkUserRegister(lineAuth.userId);
  }

  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl py-3">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-xl ">
          อารมณ์ของคุณอยู่ในระดับ : {findAvrEmotion(emotion)}
        </p>
        <div className="w-32 h-32 relative my-5">
          <Image
            src={`/images/emotion/${findAvrEmotion(emotion)}.png`}
            alt="emotion"
            layout="fill"
          />
        </div>
        <p className="text-red-600">
          *เฉลี่ยจากการบันทึกจำนวน {emotion.length} ครั้ง
        </p>
      </div>

      <RecordDay />
    </div>
  );
}
