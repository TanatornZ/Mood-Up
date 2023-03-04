import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import RecordItem from "../components/RecordItem";
import { emotion } from "../interface/emotion";
import { RootState } from "../store";
import { getArrayEmotion } from "../utils/getArrayEmotion";


function Record() {
  const [emotion, setEmotion] = useState<emotion[]>([]);
  const user = useSelector((state: RootState) => state.auth.userId);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getArrayEmotion(user);
      setEmotion(data);
    };

    fetchData();
  }, [user]);

  return (
    <div>
      <h1 className="text-center text-xl font-bold">ประวัติการบันทึก</h1>
      {emotion
        ? emotion.map((item: any, i: number) => (
            <RecordItem key={i} item={item} showDate />
          ))
        : "test2"}
    </div>
  );
}

export default Record;
