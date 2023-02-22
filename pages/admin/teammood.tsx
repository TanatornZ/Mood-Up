import { getAuth } from "firebase/auth";
import { AnyObject } from "immer/dist/internal";
import React, { useRef, useState } from "react";
import AdminNavber from "../../components/admin/AdminNavber";

function TeamMoodAdmin() {
  const [date, setDate] = useState(new Date());
  const dateRef = useRef<any>(null);
  const thaiDate = date.toLocaleDateString("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });

  return (
    <div className="flex w-screen bg-gray-100">
      <AdminNavber />
      <div className="p-8 w-[80%]">
        <h1 className="text-3xl text-center">อารมณ์ประจำวัน</h1>
        <h1
          className="text-xl mt-3 text-center underline text-sky-700 w-full"
          onClick={() => {
            dateRef.current.showPicker();
          }}
        >
          <input
            type="date"
            onChange={(event) => setDate(new Date(event.target.value))}
            className="absolute opacity-0 "
            ref={dateRef}
          />
          {thaiDate}
        </h1>
        <div className="flex mt-5 justify-between">
          <div className="w-1/2">
            <h1 className="text-xl">ภาพรวมของอารทณ์โดยเฉลี่ย</h1>
            <div className="h-[300px] mt-5 rounded-xl bg-white w-3/4">
              {/* <DoughnutChart data={chartData} /> */}
            </div>
          </div>
          <div className="w-1/2">
            <h1 className="text-xl">การบันทึกระดับอารมณ์</h1>
            <div className="h-[500px] overflow-auto mt-5 rounded-xl bg-white w-3/4">
              {/* {emotionInCompany
            ? emotionInCompany.map((item: any, i: number) => (
                <RecordItem id={`record ${i}`} key={i} item={item} />
              ))
            : ""} */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamMoodAdmin;
