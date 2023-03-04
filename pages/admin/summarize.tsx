import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AdminNavber from "../../components/admin/AdminNavber";
import CheckEmployee from "../../components/admin/CheckEmployee";
import ConcludeEmotion from "../../components/admin/ConcludeEmotion";
import FromCard from "../../components/admin/FromCard";
import PercentChart from "../../components/admin/PercentChart";
import ReasonIntoEmotion from "../../components/admin/ReasonIntoEmotion";
import TotalRecord from "../../components/admin/TotalRecord";
import { RootState } from "../../store";
import {
  findAvrEmotion,
  getArrayEmotionWithDate,
  getArrayEmotionWithMonth,
  getUserInCompany,
  splitDate,
} from "../../utils/getEmotionInCompany";
import HorizontalChart from "../../components/admin/HorizontalChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { emotion } from "../../interface/interface";

import { makeChartData } from "../../utils/makeChartData";

function Summarize() {
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const [allUser, setAllUser] = useState<number>();
  const admin = useSelector((state: RootState) => state.adminAuth);

  const getMonth = (date: Date) => {
    return date.toISOString().slice(0, 7);
  };

  const [day, setDay] = useState(splitDate(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()));
  const [typeShow, setTypeShow] = useState<string>("All");
  const monthRef = useRef<HTMLInputElement | null>(null);
  const dayRef = useRef(null);

  const getAllUserInCompany = async (company_id: string) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let totalUser: number = 0;
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      if (doc.data().company_id === company_id) {
        if (doc.data().accept_company) {
          totalUser += 1;
        }
      }
    });
    return totalUser;
  };

  const getEmotion = async () => {
    const querySnapshot = await getDocs(collection(db, "emotion"));

    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      emotionArray.push(doc.data() as emotion);
    });

    setEmotionInCompany(emotionArray);
  };

  useEffect(() => {
    switch (typeShow) {
      case "All":
        getEmotion();
        break;
      case "Month":
        const getEmotionMonth = async () => {
          const userInCompany = await getUserInCompany(admin.companyId);
          const companyEmotion = await getArrayEmotionWithMonth(
            userInCompany,
            new Date(month)
          );
          setEmotionInCompany(companyEmotion);
        };
        getEmotionMonth();
        break;
      case "Day":
        const getEmotionDay = async () => {
          const userInCompany = await getUserInCompany(admin.companyId);
          const companyEmotion = await getArrayEmotionWithDate(
            userInCompany,
            new Date(day)
          );
          setEmotionInCompany(companyEmotion);
        };
        getEmotionDay();
        break;
    }

    const fecthUser = async () => {
      const user = await getAllUserInCompany(admin.companyId);
      setAllUser(user);
    };
    fecthUser();
  }, [typeShow, day, month]);

  const findUserRecord = (emotionArray: emotion[]) => {
    const userRecord: string[] = [];
    emotionArray.map((emotion) => [userRecord.push(emotion.line_id)]);
    const result = Array.from(new Set(userRecord));
    return result;
  };

  function format(inputDate: Date) {
    let date, month, year;

    date = inputDate.getDate();
    month = inputDate.getMonth() + 1;
    year = inputDate.getFullYear();

    date = date.toString().padStart(2, "0");

    month = month.toString().padStart(2, "0");

    return `${date}/${month}/${year}`;
  }

  let userRecord = findUserRecord(emotionInCompany);

  let chartData = makeChartData(emotionInCompany);

  return (
    <div className="flex w-screen bg-gray-100 h-screen">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">สรุปผลอารมณ์</h1>
        <div className="flex mt-3  items-center">
          <div className=" mr-3">
            <label htmlFor="job_select ">รูปแบบแสดงผลการบันทึก</label>
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
            <div className="flex relative justify-center items-center cursor-pointer">
              <label htmlFor="Month_select">เลือกเดือน</label>
              <input
                type="month"
                className="bg-white rounded-lg ml-3 text-center  opacity-0 cursor-pointer absolute left-0"
                id="Month_select"
                name="Month_select"
                ref={monthRef}
                value={month}
                onChange={() => setMonth(monthRef.current.value)}
                onClick={() => {
                  monthRef.current.showPicker();
                }}
              />
              <h1 className="bg-white p-2 border rounded-lg ml-3">{month}</h1>
            </div>
          )}
          {typeShow === "Day" && (
            <div className="flex relative justify-center items-center cursor-pointer">
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

        {emotionInCompany.length !== 0 ? (
          <>
            <div className="flex  mt-5 justify-between  items-center">
              <FromCard>
                <ConcludeEmotion emotion={findAvrEmotion(emotionInCompany)} />
              </FromCard>
              <FromCard>
                <TotalRecord totalRecord={emotionInCompany.length} />
              </FromCard>
              <FromCard>
                <CheckEmployee
                  totalRecord={userRecord.length}
                  totalEmployee={allUser}
                />
              </FromCard>
              <FromCard>
                <PercentChart chartData={chartData} />
              </FromCard>
            </div>
            <div className="h-[55%] mt-5 flex justify-between ">
              <div className="w-[35%]">
                <ReasonIntoEmotion emotion={emotionInCompany} />
              </div>
              <div className="w-[60%]  min-h-fit bg-white rounded-xl ">
                <HorizontalChart chartData={chartData} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex mt-12 justify-center items-center">
            <h1 className="text-2xl text-gray-400">ไม่มีการบันทึก</h1>
          </div>
        )}
      </div>
    </div>
  );
}

export default Summarize;
