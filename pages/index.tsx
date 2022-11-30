import useSWR from "swr";
import Chart from "../components/chart";
import React, { useState, useEffect } from "react";
import { Data } from "../interface/data";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/data", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className="">
      <h1 className="text-center text-3xl mb-5">กราฟความรู้สึก</h1>
      <Chart
        motion={data.map((data: Data) => data.motion)}
        performance={data.map((data: Data) => data.performance)}
      />
    </div>
  );
}
