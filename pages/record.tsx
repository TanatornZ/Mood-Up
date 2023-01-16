import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import RecordItem from "../components/RecordItem";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);

  const user = useSelector((state: any) => state.auth.user);

  console.log(data);
  return (
    <div>
      <h1 className="text-center text-xl font-bold">ประวัติการบันทึก</h1>
      {data
        ? data.map((item: any, i: number) => <RecordItem key={i} item={item} />)
        : "test2"}
    </div>
  );
}

export default Record;
