import { collection, DocumentData, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import RecordItem from "../components/RecordItem";
import { db } from "../firebase/firebaseConfig";
import { emotion } from "../interface/interface";
import { getArrayEmotion } from "../utils/getArrayEmotion";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);
  const [emotion, setEmotion] = useState<emotion[]>([]);
  const user = useSelector((state: any) => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArrayEmotion(user);
      setEmotion(data);
    };

    fetchData();
  }, []);

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
