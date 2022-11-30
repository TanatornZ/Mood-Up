import React from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";

interface SlidingBar {
  showSlide: boolean;
  setShowSlide: React.Dispatch<React.SetStateAction<boolean>>;
}

function SlidingBar(props: SlidingBar) {
  return (
    <div
      className={`bg-black w-2/3 h-screen absolute top-0 transition-all ${
        props.showSlide ? "right-0" : " right-[-100%]"
      } p-12 items-center flex flex-col text-white`}
    >
      <BsFillArrowRightCircleFill
        className=" text-4xl absolute top-4 right-4"
        onClick={() => props.setShowSlide(false)}
      />

      <div className="flex flex-col items-center">
        <FaUserCircle className="text-[7em] " />
        <h1 className="text-xl p-5 mb-5">User Name</h1>
      </div>
      <ul className="leading-[5em] text-center">
        <li>ผลสุปการบันทึก</li>
        <li>การบันทึกประจำวัน</li>
        <li>ความรู้สึกของคนในองค์กร</li>
      </ul>
    </div>
  );
}

export default SlidingBar;
