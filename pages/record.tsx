import React, { useEffect, useState } from "react";
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
      {data.map((item: any, key: any) => (
        <RecordItem key={key} item={item} />
      ))}
    </div>
  );
}

export default Record;
