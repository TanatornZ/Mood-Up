import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import RecordItem from "../components/RecordItem";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);
  const [emotion, setEmotion] = useState<emotion[]>([]);
  const user = useSelector((state: any) => state.auth.line_id);

  const getEmotion = async (lineId: string) => {
    const querySnapshot = await getDocs(collection(db, "emotion"));
    const emotionArray: emotion[] = [];
    querySnapshot.forEach((doc) => {
      // check id
      if (doc.data().line_id === lineId) {
        emotionArray.push(doc.data() as emotion);
        // console.log(doc.data())
      }
    });

    return emotionArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getEmotion(user);
      setEmotion(data);
    };

    fetchData();
  });

  return (
    <div>
      <h1 className="text-center text-xl font-bold">ประวัติการบันทึก</h1>
      {data
        ? emotion.map((item: any, i: number) => (
            <RecordItem key={i} item={item} />
          ))
        : "test2"}
    </div>
  );
}

export default Record;
