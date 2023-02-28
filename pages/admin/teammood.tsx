import { getAuth } from "firebase/auth";
import { AnyObject } from "immer/dist/internal";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import AdminNavber from "../../components/admin/AdminNavber";
import DoughnutChart from "../../components/chart/DoughnutChart";
import RecordItem from "../../components/RecordItem";
import { AuthAdmin } from "../../store/adminAuth-slice";
import {
  findAvrEmotion,
  getArrayEmotionWithDate,
  getUserInCompany,
} from "../../utils/getEmotionInCompany";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  BarElement,
  LinearScale,
  Title,
} from "chart.js";
import { makeChartData } from "../../utils/makeChartData";

function TeamMoodAdmin() {
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);

  const [date, setDate] = useState(new Date());
  const dateRef = useRef<any>(null);
  const admin: AuthAdmin = useSelector((state: any) => state.adminAuth);

  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  useEffect(() => {
    const getUser = async () => {
      const userInCompany = await getUserInCompany(admin.companyId);
      const companyEmotion = await getArrayEmotionWithDate(userInCompany, date);

      setEmotionInCompany(companyEmotion);
    };
    getUser();
  }, [admin.companyId, date]);

  const chartData = makeChartData(emotionInCompany);
  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="flex w-screen bg-gray-100">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">อารมณ์ประจำวัน</h1>
        <h1
          className="text-xl mt-3 text-center underline text-sky-700 w-full"
          onClick={() => {
            dateRef.current.showPicker();
          }}
        >
          <input
            type="date"
            onChange={(event) => setDate(new Date(event.target.value))}
            className="absolute opacity-0 "
            ref={dateRef}
          />
          {thaiDate}
        </h1>
        <div className="flex mt-5 justify-between">
          <div className="w-1/2">
            <h1 className="text-xl">ภาพรวมของอารมณ์โดยเฉลี่ย</h1>
            <div className="h-[300px] flex flex-col justify-center items-center mt-5 rounded-xl bg-white w-3/4">
              {emotionInCompany.length !== 0 ? (
                <DoughnutChart data={chartData} size={32} />
              ) : (
                ""
              )}
              <h1 className="text-xl">
                ระดับอารมณ์โดยเฉลี่ย :{" "}
                {emotionInCompany.length !== 0
                  ? findAvrEmotion(emotionInCompany)
                  : "ไม่มีการบันทึก"}
              </h1>
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-xl">การบันทึกระดับอารมณ์</h1>
            <div className="h-[500px] overflow-auto mt-5 rounded-xl bg-white w-3/4 p-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-thumb-rounded-full scrollbar-track-rounded-full ">
              {emotionInCompany.length !== 0 ? (
                emotionInCompany.map((item: any, i: number) => (
                  <RecordItem id={`record ${i}`} key={i} item={item} />
                ))
              ) : (
                <h1 className="text-center opacity-50 text-xl mt-5">
                  ไม่มีการบันทึก
                </h1>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMoodAdmin;
