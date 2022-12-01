import React, { useEffect, useState } from "react";
import useSWR from "swr";
import RecordItem from "../components/RecordItem";
import { Data } from "../interface/data";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);

  return (
    <div>
      {data.map((item: any, key: any) => (
        <RecordItem key={key} item={item} />
      ))}
    </div>
  );
}

export default Record;
