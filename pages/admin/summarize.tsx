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
import { findAvrEmotion, splitDate } from "../../utils/getEmotionInCompany";
import HorizontalChart from "../../components/admin/HorizontalChart";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";
import { emotion } from "../../interface/interface";
import { ChartType } from "chart.js";
import { makeChartData } from "../../utils/makeChartData";

function Summarize() {
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const [userInCompany, setUserInCompany] = useState<number>();
  const admin = useSelector((state: RootState) => state.adminAuth);

  const getMonth = (date: Date) => {
    return date.toISOString().slice(0, 7);
  };

  const [day, setDay] = useState(splitDate(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()));
  const [typeShow, setTypeShow] = useState<string>("All");
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  const getUserInCompany = async (company_id: string) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let totalUser: number = 0;
    querySnapshot.forEach((doc) => {
      if (doc.data().company_id === admin.companyId) {
        totalUser += 1;
      }
    });
    console.log(totalUser);
    return totalUser;
  };

  const getEmotion = async () => {
    const querySnapshot = await getDocs(collection(db, "emotion"));

    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().line_id !== undefined) {
        emotionArray.push(doc.data() as emotion);
      }
    });

    setEmotionInCompany(emotionArray);
  };

  useEffect(() => {
    getEmotion();
    const fecthUser = async () => {
      const user = await getUserInCompany(admin.companyId);
      setUserInCompany(user);
    };
    fecthUser();
    return setEmotionInCompany([]);
  }, []);

  const findUserRecord = (emotionArray: emotion[]) => {
    const userRecord: string[] = [];

    emotionArray.map((emotion) => [userRecord.push(emotion.line_id)]);

    console.log("user all ", userRecord);
    const result = [new Set(userRecord)];

    return result;
  };

  let userRecord = findUserRecord(emotionInCompany);
  // console.log("split user ", findUserRecord(emotionInCompany));
  let chartData = makeChartData(emotionInCompany);
  console.log(chartData);


  return (
    <div className="flex w-screen bg-gray-100 h-screen">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">สรุปผลอารมณ์</h1>
        <div className="flex mt-3">
          <div className=" mr-3">
            <label htmlFor="job_select">รูปแบบแสดงผลการบันทึก</label>
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
              className="relative"
              onClick={() => {
                monthRef.current.showPicker();
              }}
            >
              <label htmlFor="Month_select">เลือกเดือน</label>
              <input
                type="month"
                className="bg-white rounded-lg ml-3 text-center"
                id="Month_select"
                name="Month_select"
                ref={monthRef}
                value={month}
                onChange={() => setMonth(monthRef.current.value)}
              />
            </div>
          )}
          {typeShow === "Day" && (
            <div className="relative">
              <label id="Day_select">เลือกวัน</label>
              <input
                type="date"
                className="bg-white rounded-lg ml-3 text-center"
                id="Day_select"
                name="Day_select"
                ref={dayRef}
                value={day}
                onChange={() => setDay(dayRef.current.value)}
              />
            </div>
          )}
        </div>

        <div className="flex  mt-5 justify-between  items-center">
          <FromCard>
            <ConcludeEmotion emotion={findAvrEmotion(emotionInCompany)} />
          </FromCard>
          <FromCard>
            <TotalRecord totalRecord={emotionInCompany.length} />
          </FromCard>
          <FromCard>
            <CheckEmployee
              totalEmployee={userInCompany}
              totalRecord={userRecord.length}
            
            />
          </FromCard>
          <FromCard>
            <PercentChart chartData={chartData} />
          </FromCard>
        </div>

        <div className="h-[55%] mt-5 flex justify-between ">
          <ReasonIntoEmotion />
          <div className="w-[60%]  min-h-fit bg-white rounded-xl ">
            <HorizontalChart chartData={chartData} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Summarize;
function aynsc() {
  throw new Error("Function not implemented.");
}
