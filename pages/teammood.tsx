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
import DatePicker from "react-date-picker";

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
  const [userInCompany, setUserInCompany] = useState<any[]>([]);
  const [emotionInCompany, setEmotionInCompany] = useState<any[]>([]);
  const [date, setDate] = useState(new Date());

  // useEffect(() => {
  //   const getUser = async () => {
  //     const userInCompany = await getUserInCompany(user.companyId);
  //     const companyEmotion = await getArrayEmotion(userInCompany);

  //     setUserInCompany(userInCompany);
  //     setEmotionInCompany(companyEmotion);
  //   };
  //   getUser();

  // }, [user.companyId, userInCompany]);

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

  const getArrayEmotion = async (userArray: any[]) => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      // check id
      if (userArray.includes(doc.data().line_id)) {
        emotionArray.push(doc.data() as emotion);
      }
    });
    return emotionArray;
  };

  // if (emotionInCompany) {
  //   let chartData = makeChartData(emotionInCompany);
  return (
    <div>
      <div className="mx-auto">
        <DatePicker onChange={setDate} value={date} />
        <div className="">
          <h1 className="text-center text-2xl my-4">
            ผลรวมระดับอารมณ์ประจำวัน
          </h1>
          <div className=" h-[300px] bg-white rounded-lg">
            {/* <DoughnutChart data={chartData} /> */}
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
