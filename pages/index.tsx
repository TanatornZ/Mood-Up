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
      console.log(doc.data().line_id);
      // check id
      if (doc.data().line_id === lineId) {
        dispatch(
          setUser({
            firstName: doc.data().first_name,
            lastName: doc.data().last_name,
            userId: doc.id,
            pictureUrl: doc.data().pictureUrl,
          })
        );
        registered = true;
      }
    });
    if (registered) {
      console.log("is registered");
    } else {
      router.push("/first");
    }
  };

  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1657785397-LVBe6BkX" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();
            dispatch(
              setLineUser({
                userId: profile.userId as string,
                pictureUrl: profile.pictureUrl,
              })
            );
          } else {
            liff.login();
          }
        })
        .catch(() => {
          console.log("error");
        });
    });

    const fetchData = async () => {
      const data = await getArrayEmotion(lineAuth.userId);
      setEmotion(data);
    };

    fetchData();
  }, [dispatch, lineAuth.userId]);

  if (lineAuth.userId !== "") {
    checkUserRegister(lineAuth.userId);
  }

  const allEmotion = emotion.map((item) => item.emotion);

  const average = allEmotion.reduce((a, b) => a + b, 0) / allEmotion.length;

  console.log("allEmotion " + allEmotion);
  console.log("average " + average);
  return (
    <div className="">
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl py-3">{`${user.firstName} ${user.lastName}`}</h1>
        <p className="text-xl ">
          อารมณ์ของคุณอยู่ในระดับ : {Math.ceil(average)}
        </p>
        <div className="w-32 h-32 relative my-5">
          <Image
            src={`/images/emotion/${Math.ceil(average)}.png`}
            alt="emotion"
            layout="fill"
          />
        </div>
        <p className="text-red-600">
          *เฉลี่ยจากการบันทึกจำนวน {emotion.length} ครั้งsdf
        </p>
      </div>
    </div>
  );
}
