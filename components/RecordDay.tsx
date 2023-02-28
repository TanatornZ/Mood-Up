import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { array } from "yup";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";
import { splitDate } from "../utils/getEmotionInCompany";
import DetailDay from "./DetailDay";

function RecordDay() {
  const [lastedDay, setLastedDay] = useState<any>();
  const lineAuth = useSelector((state: any) => state.auth);

  console.log("line ", lineAuth.userId);
  useEffect(() => {
    const fecthData = async () => {
      let data = await getLastedEmotion("U03b155b3f617330ebe19fd13038964eb");

      setLastedDay(data);
    };
    fecthData();
  }, []);


  const getLastedEmotion = async (LineId: string) => {
    let dataDate: any = [];
    let allDay: { emotion: number; day: Date }[] = [];
    let states: any[] = [];
    const arrayDay: string[] = [];
    let Day = new Date();

    const querySnapshot = await getDocs(collection(db, "emotion"));

    for (let i = 0; i < 5; i++) {
      dataDate.push({ emotion: null, day: splitDate(Day) });
      arrayDay.unshift(Day.toISOString().split("T")[0]);
      Day = new Date(Day.getTime() - 86400000);
    }

    querySnapshot.forEach((doc) => {
      if (LineId === doc.data().line_id) {
        let ed = new Date(doc.data().date.seconds * 1000);

        if (arrayDay.includes(splitDate(ed))) {
          allDay.push({ emotion: doc.data().emotion, day: ed });
        }
      }
    });

    allDay.map((item) => {
      if (states.length > 0) {
        for (let state in states) {
          if (splitDate(states[state].day) === splitDate(item.day)) {
            states[state].emotion =
              Math.floor(states[state].emotion + item.emotion) / 2;
            break;
          }
          states.push(item);
        }
      } else {
        states.push(item);
      }
    });

    states.map((item) => {
      for (let i in dataDate) {
        if (splitDate(item.day) === dataDate[i].day) {
          dataDate[i].emotion = item.emotion;
        }
      }
    });

    return dataDate;
  };

  return (
    <div className="mt-5 p-5 bg-white rounded-lg">
      <h1 className="text-lg">ระดับอารมณ์ล่าสุดของวันที่ผ่านมา</h1>
      <div className="mt-5 grid grid-cols-5">
        {lastedDay
          ? lastedDay.map((item: { day: string; emotion: number }) => (
              <DetailDay key={item.day} day={item.day} emotion={item.emotion} />
            ))
          : ""}
      </div>
    </div>
  );
}

export default RecordDay;
