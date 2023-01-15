import React from "react";
import { useSelector } from "react-redux";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

function Record() {
  const { data } = useSWR("/api/data", fetcher);

  const user = useSelector((state: any) => state.auth.user);

  console.log(typeof data);
  return (
    <div>
      <h1 className="">record</h1>
    </div>
  );
}

export default Record;
