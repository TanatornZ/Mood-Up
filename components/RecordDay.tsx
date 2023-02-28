import { collection, getDocs } from "firebase/firestore";
import React from "react";
import { array } from "yup";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";
import DetailDay from "./DetailDay";

function RecordDay() {
  const dataDate: any = [];
  let allDay: { emotion: number; day: Date }[] = [];
  let states: any[] = [];

  let showDay: any[] = [];

  const getAllDay = () => {
    let Day = new Date();

    for (let i = 0; i < 5; i++) {
      dataDate.push({ emotion: null, day: splitDate(Day) });
      Day = new Date(Day.getTime() - 86400000);
    }
  };

  const splitDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getLastedEmotion = async (LineId: string, date: Date) => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    // querySnapshot
    const arrayDay: string[] = [];

    //get day to array
    let Day = date;
    for (let i = 0; i < 5; i++) {
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

    allDay.forEach((item) => {
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
  };

  getAllDay();

  getLastedEmotion("U03b155b3f617330ebe19fd13038964eb", new Date());

  
  return (
    <div className="mt-5 p-5 bg-white rounded-lg">
      <h1 className="text-lg">ระดับอารมณ์ล่าสุดของวันที่ผ่านมา</h1>
      <div className="mt-5 grid grid-cols-5">
        {dataDate.map((item: { day: string; emotion: number | null }) => (
          <DetailDay key={item.day} day={item.day} emotion={3} />
        ))}
      </div>
    </div>
  );
}

export default RecordDay;
