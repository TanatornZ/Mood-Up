import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useSelector } from "react-redux";
import { emotion } from "../interface/interface";
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
import DatePicker from "react-date-picker/dist/entry.nostyle";
import Image from "next/image";

const TeamMood = () => {
  ChartJS.register(
    CategoryScale,
    BarElement,
    LinearScale,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
  const user = useSelector((state: any) => state.user);
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const [date, setDate] = useState(new Date());
  const [chartData, setChartData] = useState<any[]>([]);

  useEffect(() => {
    const getUser = async () => {
      const userInCompany = await getUserInCompany(user.companyId);
      const companyEmotion = await getArrayEmotion(userInCompany, date);

      setEmotionInCompany(companyEmotion);
    };
    getUser();
  }, [user.companyId, date]);

  const getUserInCompany = async (companyId: string) => {
    //get data
    console.log(companyId);
    const querySnapshot = await getDocs(collection(db, "user"));
    const userId: any[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().company_id === companyId) {
        userId.push(doc.data().line_id);
      }
    });
    return userId;
  };

  // check day
  const getArrayEmotion = async (userArray: any[], date: Date) => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      // check id.secconds * 1000.secconds * 1000
      if (userArray.includes(doc.data().line_id)) {
        let ed = new Date(doc.data().date.seconds * 1000);
        console.log(ed);
        if (
          ed.toISOString().split("T")[0] === date.toISOString().split("T")[0]
        ) {
          emotionArray.push(doc.data() as emotion);
        }
      }
    });
    return emotionArray;
  };

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
          <div className=" h-[300px] bg-white rounded-lg">
            <DoughnutChart data={chartData} />
            <h1>ระดับอารมณ์โดยเฉลี่ย : {1}</h1>
          </div>
        </div>

        <div className="">
          <h1 className="text-center text-2xl my-4">การบันทึก</h1>
          {emotionInCompany
            ? emotionInCompany.map((item: any, i: number) => (
                <RecordItem id={`record ${i}`} key={i} item={item} />
              ))
            : ""}
        </div>
      </div>
    </div>
  );
};

export default TeamMood;
