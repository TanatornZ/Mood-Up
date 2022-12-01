import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { AiOutlineMenu } from "react-icons/ai";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import SlidingBar from "./slidingBar";
import Image from "next/image";
function Navbar() {
  const [showSlide, setShowSlide] = useState<boolean>(false);

  return (
    <div className="relative">
      <div className="w-full h-20 bg-white p-5 flex justify-between items-center drop-shadow-lg">
        <div className="w-10 h-10 relative">
          <Image src="/images/mood.png" layout="fill" alt="mood" />
        </div>
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
