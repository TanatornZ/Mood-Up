import useSWR from "swr";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { Data } from "../interface/data";
import Chart from "../components/Chart";
import { useSelector } from "react-redux";
import { AuthContext } from "../context/AuthProvider";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  
  const userContext = useContext(AuthContext);
  const [user, setUser] = useState<string>("");

  useEffect(() => {
    userContext?.setUser("id123");
  });



  return (
    <div className="">
      <h1>home</h1>
      {/* <h1 className="text-center text-3xl mb-10">กราฟความรู้สึก</h1>
      <Chart
        motion={data.map((data: Data) => data.motion)}
        performance={data.map((data: Data) => data.performance)}
      /> */}
    </div>
  );
}
