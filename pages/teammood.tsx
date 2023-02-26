import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordItem from "../components/RecordItem";
import { makeChartData } from "../utils/makeChartData";
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

const TeamMood = () => {
  const user = useSelector((state: any) => state.user);
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const [date, setDate] = useState(new Date());

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

  const chartData = makeChartData(emotionInCompany);

  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

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

          <h1 className="text-lg">{thaiDate}</h1>
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
          <h1 className="text-center text-2xl my-4">
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

        <div className="">
          <h1 className="text-center text-2xl my-4 w-">การบันทึก</h1>
          {emotionInCompany.length !== 0 ? (
            emotionInCompany.map((item: any, i: number) => (
              <RecordItem id={`record ${i}`} key={i} item={item} />
            ))
          ) : (
            <h1 className="text-center opacity-50">ไม่มีการบันทึก</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamMood;
