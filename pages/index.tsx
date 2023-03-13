import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { setLineUser } from "../store/auth-slice";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useRouter } from "next/router";
import { setUser } from "../store/user-slice";
import { emotion } from "../interface/emotion";
import { getArrayEmotion } from "../utils/getArrayEmotion";
import {
  findAvrEmotion,
  splitDate,
  splitSliceDate,
} from "../utils/getEmotionInCompany";
import { RootState } from "../store";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import styled from "@emotion/styled";
import AverageEmotion from "../components/AverageEmotion";
import { Toaster } from "react-hot-toast";

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

  const getMonth = (date: Date) => {
    return date.toISOString().slice(0, 7);
  };

  const [emotion, setEmotion] = useState<emotion[]>([]);
  const [month, setMonth] = useState(getMonth(new Date()));
  const [day, setDay] = useState(splitDate(new Date()));
  const dayRef = useRef(null);
  const [typeShow, setTypeShow] = useState<string>("All");
  const monthRef = useRef<HTMLInputElement | null>(null);

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
            accept_company: doc.data().accept_company,
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
    //     .init({ liffId: "1660709285-D5QggOXl" })
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

  let calandarData: { date: String; title: number }[] =
    convertEmotionToCalendar(emotion);

 
  function format(inputDate: Date) {
    let date, month, year;
    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();
    date = date.toString().padStart(2, "0");
    month = month.toString().padStart(2, "0");
    return `${date}/${month}/${year}`;
  }

  return (
    <div className="">
      
      <div className="text-center">
        <h1 className="text-2xl py-3 text-center">{`${user.firstName} ${user.lastName}`}</h1>
        <div className=" mr-3">
          <label htmlFor="job_select ">รูปแบบแสดงระดับอารมณ์</label>
          <select
            id="job_select"
            className="ml-3 bg-white border rounded-lg p-1 "
            onChange={(e) => setTypeShow(e.target.value)}
          >
            <option value="All"> ทั้งหมด </option>
            <option value="Month"> เดือน </option>
            <option value="Day"> วัน </option>
          </select>
        </div>

        {typeShow === "Month" && (
          <div
            className="flex relative justify-center items-center cursor-pointer transition-all mt-3"
            onChange={() => setMonth(monthRef.current.value)}
            onClick={() => {
              monthRef.current.showPicker();
            }}
          >
            <label htmlFor="Month_select">เลือกเดือน</label>
            <input
              type="month"
              className="bg-white rounded-lg ml-3 text-center  opacity-0 cursor-pointer absolute left-0"
              id="Month_select"
              name="Month_select"
              ref={monthRef}
              value={month}
            />
            <h1 className="bg-white p-2 border rounded-lg ml-3">{month}</h1>
          </div>
        )}

        {typeShow === "Day" && (
          <div className="flex relative justify-center items-center cursor-pointer mt-5">
            <label id="Day_select">เลือกวัน</label>
            <input
              type="date"
              className="bg-white rounded-lg ml-3 text-center absolute opacity-0"
              id="Day_select"
              name="Day_select"
              ref={dayRef}
              value={day}
              onClick={() => {
                dayRef.current.showPicker();
              }}
              onChange={() => setDay(dayRef.current.value)}
            />

            <h1 className="bg-white p-2 border rounded-lg ml-3">
              {format(new Date(day))}
            </h1>
          </div>
        )}
      </div>

      <AverageEmotion showType={typeShow} month={month} day={day} />

      <div className="mt-5 h-full p-3 bg-white rounded-lg shadow-lg">
        <h1 className="text-xl text-center font-semibold mb-3">
          ปฏิทินระดับอารมณ์เฉลี่ย
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
