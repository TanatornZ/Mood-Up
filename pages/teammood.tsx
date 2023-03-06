import React, { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { addEmotion, makeChartData } from "../utils/makeChartData";
import DoughnutChart from "../components/chart/DoughnutChart";
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
import Image from "next/image";
import {
  findAvrEmotion,
  getArrayEmotionWithDate,
  getUserInCompany,
} from "../utils/getEmotionInCompany";
import { RootState } from "../store";
import { emotion } from "../interface/emotion";
import ReasonIntoEmotion from "../components/admin/ReasonIntoEmotion";
import CountEmotion from "../components/CountEmotion";
import { ChartType } from "../interface/chart";

const TeamMood = () => {
  const user = useSelector((state: RootState) => state.user);
  const [emotionInCompany, setEmotionInCompany] = useState<emotion[]>([]);
  const [date, setDate] = useState(new Date());
  const dateRef = useRef<any>(null);

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
      const userInCompany = await getUserInCompany(user.companyId);

      const companyEmotion = await getArrayEmotionWithDate(userInCompany, date);

      setEmotionInCompany(companyEmotion);
    };
    getUser();
  }, [user.companyId, date]);

  console.log(user)

  const chartData: any[] = makeChartData(emotionInCompany);

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  if (!user.accept_company) {
    return <h1 className="text-xl text-center">รอการยืนยันจากผู้ดูแลองค์กร</h1>
  }

  return (
    <div>
      <div className="mx-auto">
        <div className="text-center bg-white relative rounded-full p-2 flex justify-between items-center">
          <Image
            src="/svg/arrow-left-circle-svgrepo-com.svg"
            alt="arrow"
            width={32}
            height={32}
            onClick={() => {
              setDate(new Date(date.getTime() - 86400000));
            }}
          />

          <h1
            className="text-lg text-center  w-full"
            onClick={() => {
              dateRef.current.showPicker();
            }}
          >
            <input
              type="date"
              onChange={(event) => setDate(new Date(event.target.value))}
              className="absolute opacity-0"
              ref={dateRef}
            />
            {thaiDate}
          </h1>
          <Image
            src="/svg/arrow-right-circle-svgrepo-com.svg"
            alt="arrow"
            width={32}
            height={32}
            onClick={() => {
              setDate(new Date(date.getTime() + 86400000));
            }}
          />
        </div>
        <div className="">
          <h1
            className="text-center text-2xl my-4"
            onClick={() => {
              addEmotion();
            }}
          >
            ผลรวมระดับอารมณ์ประจำวัน
          </h1>
          <div className=" h-[300px] bg-white rounded-lg flex flex-col justify-center items-center">
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

        <div className="mt-5">
          <CountEmotion emotion={chartData} />

          <div className="mt-4"></div>
          <ReasonIntoEmotion emotion={emotionInCompany} />
        </div>
      </div>
    </div>
  );
};

export default TeamMood;
