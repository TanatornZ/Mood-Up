import useSWR from "swr";
import React, { useState, useEffect } from "react";
import { Data } from "../interface/data";
import Chart from "../components/Chart";
import {  useSelector } from "react-redux";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/data", fetcher);

  const user = useSelector((state: any) => state.auth.user);

  console.log("user",user);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-center text-3xl mb-10">กราฟความรู้สึก</h1>
      <Chart
        motion={data.map((data: Data) => data.motion)}
        performance={data.map((data: Data) => data.performance)}
      />
    </div>
  );
}
