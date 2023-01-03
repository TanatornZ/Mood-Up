import React, { useState, useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { MenuSlide, MenuSlideContext } from "../context/MenuSlideProvider";
import SlidingBar from "./SlidingBar";
function Navbar() {

  const { openMenu } = useContext<MenuSlide>(MenuSlideContext);

  return (
    <div className="relative z-10">
      <div className="w-full h-20 bg-white p-5 flex justify-between items-center drop-shadow-lg">
        <div className="w-10 h-10 relative">
          <Image src="/images/mood.png" layout="fill" alt="mood" />
        </div>
        <AiOutlineMenu className="text-3xl" onClick={openMenu} />
      </div>
      <SlidingBar />
    </div>
  );
}

export default Navbar;
