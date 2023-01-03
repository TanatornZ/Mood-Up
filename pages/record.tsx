import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";
import RecordItem from "../components/RecordItem";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);

  const user = useSelector((state: any) => state.auth.user);

  console.log(typeof data);
  return (
    <div>
      <h1 className="text-center">mood</h1>
    </div>
  );
}

export default Record;
