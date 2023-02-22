import { collection, getDocs } from "firebase/firestore";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import AdminNavber from "../../components/admin/AdminNavber";
import { db } from "../../firebase/firebaseConfig";
import { emotion } from "../../interface/interface";
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
import DoughnutChart from "../../components/chart/DoughnutChart";
import { ChartType } from "../../interface/chart";
import BarChart from "../../components/chart/BarChart";
import { getAuth } from "firebase/auth";
import router from "next/router";

function Conclusion() {
  const [emotion, setEmotion] = useState<emotion[]>();

  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

  const getEmotion = async () => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      emotionArray.push(doc.data() as emotion);
    });

    setEmotion(emotionArray);
  };

  useEffect(() => {
    getEmotion();    
  }, []);

  const findAvrEmotion = (emotionArray: emotion[]) => {
    let sumEmotion = emotionArray.reduce(function (prev, curr) {
      return prev + curr.emotion;
    }, 0);

    let avr = sumEmotion / emotionArray?.length;

    return Math.floor(avr);
  };

  const makeChartData = (emotionArray: emotion[]) => {
    let data = [
      { emotion: 1, count: 0, color: "rgb(230, 76, 60)" },
      { emotion: 2, count: 0, color: "rgb(240, 196, 25)" },
      { emotion: 3, count: 0, color: "rgb(59, 151, 211)" },
      { emotion: 4, count: 0, color: "rgb(151, 242, 177)" },
      { emotion: 5, count: 0, color: "rgb(79, 186, 111)" },
    ];

    emotionArray.map((emotion) => {
      switch (emotion.emotion) {
        case 1:
          data[0].count += 1;
          break;
        case 2:
          data[1].count += 1;
          break;
        case 3:
          data[2].count += 1;
          break;
        case 4:
          data[3].count += 1;
          break;
        case 5:
          data[4].count += 1;
          break;
      }
    });

    return data;
  };

  if (emotion) {
    let chartData: ChartType[] = makeChartData(emotion);
    return (
      <div className="flex w-screen bg-gray-100">
        <AdminNavber />
        <div className="p-8 w-[80%]">
          <h1 className="text-3xl text-center">สรุปผลอารมณ์</h1>
          <div className="grid grid-cols-3 gap-6 mt-5 my-auto">
            <div className="bg-white h-52 rounded-xl flex flex-col pt-5 items-center">
              <h1 className="text-xl">
                อารมณ์ของพนักงานเฉลี่ยอยู่ในระดับ : {findAvrEmotion(emotion)}
              </h1>
              <div className="w-24 h-24 relative my-5">
                <Image
                  src={`/images/emotion/${findAvrEmotion(emotion)}.png`}
                  alt="emotion"
                  layout="fill"
                />
              </div>
            </div>
            <div className="bg-white h-52 rounded-xl flex flex-col pt-5 items-center">
              <h1 className="text-xl">จาการบันทึกทั้งหมด</h1>
              <h1 className="my-5 text-6xl font-bold">{emotion?.length}</h1>
              <p>ครั้ง</p>
            </div>
            <div className="bg-white h-52 rounded-xl flex flex-col pt-5 items-center">
              <h1 className="text-xl">การบันทึกระดับอารณ์</h1>
              <DoughnutChart data={chartData} />
            </div>
            <BarChart data={chartData} />
          </div>
        </div>
      </div>
    );
  }
}

export default Conclusion;
