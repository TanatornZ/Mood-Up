import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import SlidingBar from "./slidingBar";
function Navbar() {
  const [showSlide, setShowSlide] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="w-full h-20 bg-slate-500 p-5 flex justify-between items-center">
        <FaUserCircle className="text-3xl" />
        <AiOutlineMenu
          className="text-3xl"
          onClick={() => setShowSlide(true)}
        />
      </div>
      <SlidingBar showSlide={showSlide} setShowSlide={setShowSlide} />
    </div>
  );
}

export default Navbar;
