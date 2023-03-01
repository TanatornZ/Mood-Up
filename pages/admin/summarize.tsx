import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import AdminNavber from "../../components/admin/AdminNavber";
import CheckEmployee from "../../components/admin/CheckEmployee";
import ConcludeEmotion from "../../components/admin/ConcludeEmotion";
import FromCard from "../../components/admin/FromCard";
import PercentChart from "../../components/admin/PercentChart";
import TotalRecord from "../../components/admin/TotalRecord";
import { RootState } from "../../store";
import { splitDate } from "../../utils/getEmotionInCompany";

function Summarize() {
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const admin = useSelector((state: RootState) => state.adminAuth);

  const getMonth = (date: Date) => {
    return date.toISOString().slice(0, 7);
  };

  const [day, setDay] = useState(splitDate(new Date()));
  const [month, setMonth] = useState(getMonth(new Date()));
  const [typeShow, setTypeShow] = useState<string>("All");
  const monthRef = useRef(null);
  const dayRef = useRef(null);

  return (
    <div className="flex w-screen bg-gray-100">
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

        <div className="flex mt-5 justify-between">
          <FromCard>
            <ConcludeEmotion emotion={3} />
          </FromCard>
          <FromCard>
            <TotalRecord totalRecord={50} />
          </FromCard>
          <FromCard>
            <CheckEmployee totalEmployee={50} totalRecord={30} />
          </FromCard>
          <FromCard>
            <PercentChart />
          </FromCard>
        </div>

        <div className="h-[55%] mt-5">
            <div className="bg-white h-full"></div>
        </div>
      </div>
    </div>
  );
}

export default Summarize;
