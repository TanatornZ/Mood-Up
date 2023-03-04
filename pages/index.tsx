import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLineUser } from "../store/auth-slice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { setUser } from "../store/user-slice";
import { emotion } from "../interface/emotion";
import { getArrayEmotion } from "../utils/getArrayEmotion";
import { findAvrEmotion, splitSliceDate } from "../utils/getEmotionInCompany";
import { RootState } from "../store";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import styled from "@emotion/styled";

export const StlyeWrapper = styled.div`
  .fc .fc-toolbar-title {
    font-size: 1.25em;
  }
  .fc-daygrid-block-event .fc-event-time,
  .fc-daygrid-block-event .fc-event-title {
    padding: 1px;
    font-size: 20px;
    color: black;
  }
  .fc-h-event {
    background-color: inherit;
    border: none;
    display: block;
  }
  .fc-h-event .fc-event-main-frame {
    display: flex;
    justify-content: center;
  }
  .fc-h-event .fc-event-title-container {
    flex-grow: 0;
    flex-shrink: 1;
    min-width: 0;
  }
`;

export default function Home() {
  const lineAuth = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
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

    // dispatch(
    //   setLineUser({
    //     userId: "U03b155b3f617330ebe19fd13038964eb",
    //     pictureUrl:
    //       "https://profile.line-scdn.net/0hi90K76b8NhYdMiPyUfxIaW1iNXw-Q28EZAQrdn0yPCEkUHVGZlZ_cio2aXZyBCFDNVEqdS40YSQRIUFwA2TKIhoCaCEkBHdJNVZx9g",
    //   })
    // );

    const fetchData = async () => {
      const data = await getArrayEmotion(lineAuth.userId);
      setEmotion(data);
    };

    fetchData();
  }, [dispatch, lineAuth.userId]);

  const convertEmotionToCalendar = (EmotionArray: emotion[]) => {
    const ArrayforCalendar: { emotion: number; date: String }[] = [];
    const Day: String[] = [];

    const result: { date: String; title: number }[] = [];
    EmotionArray.map((emotion) => {
      let ed = new Date(emotion.date.seconds * 1000);
      let date = splitSliceDate(ed);

      ArrayforCalendar.push({
        emotion: emotion.emotion,
        date: date,
      });
    });

    ArrayforCalendar.map((item) => {
      Day.push(item.date);
    });
    const AllDay = [...new Set(Day)];

    AllDay.map((day) => {
      let emotion = 0;
      for (let i in ArrayforCalendar) {
        if (ArrayforCalendar[i].date === day) {
          if (emotion === 0) {
            emotion = ArrayforCalendar[i].emotion;
          } else {
            emotion = Math.ceil((emotion + ArrayforCalendar[i].emotion) / 2);
          }
        }
      }

      result.push({ date: day, title: emotion });
    });

    return result;
  };

  let calandarData: { date: String; title: number }[] = convertEmotionToCalendar(emotion);

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

      <div className="mt-5 h-full">
        <h1 className="text-xl text-center font-semibold my-5">
          ระดับอารมณ์เฉลี่ยในแต่ละวัน
        </h1>
        <StlyeWrapper>
          <FullCalendar
            height={600}
            locale={"th"}
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={calandarData}
          />
        </StlyeWrapper>
      </div>
    </div>
  );
}
