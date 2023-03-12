import React, { useEffect, useState } from "react";
import { findAvrEmotion, splitMonth } from "../utils/getEmotionInCompany";
import Image from "next/image";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/emotion";
import { getArrayEmotion } from "../utils/getArrayEmotion";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import PercentChart from "./chart/PercentChart";
import { makeChartData } from "../utils/makeChartData";
import CountEmotion from "./CountEmotion";
import ReasonIntoEmotion from "./admin/ReasonIntoEmotion";

type Props = {
  showType: string;
  month: string | null;
};

const AverageEmotion = (props: Props) => {
  const user = useSelector((state: RootState) => state.auth);
  const [emotion, setEmotion] = useState<emotion[]>();
  const getArrayEmotionWithMonth = async (lineId: string, month: string) => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().line_id === lineId) {
        let ed = new Date(doc.data().date.seconds * 1000);

        if (splitMonth(ed) === month) {
          emotionArray.push(doc.data() as emotion);
        }
      }
    });
    return emotionArray;
  };

  useEffect(() => {
    const fecthData = async () => {
      if (props.showType === "All") {
        let data = await getArrayEmotion(user.userId);
        setEmotion(data);
      } else {
        let data = await getArrayEmotionWithMonth(user.userId, props.month);
        setEmotion(data);
      }
    };

    fecthData();
  }, [props.showType, props.month, user.userId]);

  if (emotion) {
    const chartData = makeChartData(emotion);
    return (
      <div>
        <div className="flex flex-col shadow-md justify-center items-center my-5 p-5 h-64    rounded-lg bg-white">
          {emotion?.length != 0 ? (
            <>
              <p className="text-xl ">
                อารมณ์ของคุณอยู่ในระดับ : {findAvrEmotion(emotion)}
              </p>
              <div className="w-32 h-32 relative my-5">
                <Image
                  src={`/images/emotion/${findAvrEmotion(emotion)}.png`}
                  alt="emotion"
                  layout="fill"
                />
              </div>
              <p className="text-red-600">
                *เฉลี่ยจากการบันทึกจำนวน {emotion.length} ครั้ง
              </p>
            </>
          ) : (
            <h1 className="text-xl">ไม่มีการบันทึกในเดือนนี้</h1>
          )}
        </div>
        {emotion?.length != 0 ? (
          <>
            <div className="bg-white p-5 rounded-lg shadow-md">
              <CountEmotion emotion={chartData} />
            </div>
            <div className="mt-4"></div>
            <ReasonIntoEmotion emotion={emotion} />
          </>
        ) : (
          ""
        )}
      </div>
    );
  }
};

export default AverageEmotion;
