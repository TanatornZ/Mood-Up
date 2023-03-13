import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordItem from "../components/RecordItem";
import { emotion } from "../interface/emotion";
import { RootState } from "../store";

import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { Toaster } from "react-hot-toast";

function Record() {
  const [emotion, setEmotion] = useState<emotion[]>([]);
  const user = useSelector((state: RootState) => state.auth.userId);

  const getArrayEmotion = async (lineId: string) => {
    // const querySnapshot = await getDocs(collection(db, "emotion"));

    const querySnapshot = await getDocs(
      query(collection(db, "emotion"), orderBy("date"))
    );

    const emotionArray: any = [];
    querySnapshot.forEach((doc) => {
      if (doc.data().line_id === lineId) {
        emotionArray.push({ id: doc.id, emotion: doc.data() as emotion });
      }
    });

    return emotionArray;
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArrayEmotion(user);
      setEmotion(data.reverse());
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <div>
        <Toaster />
      </div>
      <h1 className="text-center text-xl font-bold">ประวัติการบันทึก</h1>
      {emotion
        ? emotion.map((item: any, i: number) => (
            <RecordItem key={i} id={item.id} item={item.emotion} showDate />
          ))
        : "test2"}
    </div>
  );
}

export default Record;
