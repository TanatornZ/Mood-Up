import Link from "next/link";
import React, { useContext } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { MenuSlide, MenuSlideContext } from "../context/MenuSlideProvider";

interface SlidingBar {
  showSlide: boolean;
  setShowSlide: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlidingBar = () => {
  const { isOpen, closeMenu } = useContext<MenuSlide>(MenuSlideContext);

  return (
    <div
      className={`bg-secondary w-7/12 h-screen absolute top-0 transition-all duration-300	 ${
        isOpen ? "right-0" : " right-[-100%]"
      } p-5 items-center flex flex-col text-dark `}
    >
      <BsFillArrowRightCircleFill
        className=" text-4xl absolute top-4 right-4 "
        onClick={closeMenu}
      />

      <div className="flex flex-col items-center mt-12">
        <FaUserCircle className="text-[7em] " />
        <h1 className="text-xl p-5 mb-5 font-bold">User Name</h1>
      </div>
      <ul className="leading-[5em] text-center text-md">
        <li>
          <Link href={"/"}>ผลสุปการบันทึก</Link>
        </li>
        <li>
          <Link href={"/record"}>การบันทึกประจำวัน</Link>
        </li>
        <li>
          <Link href={"/teammood"}>ความรู้สึกของคนในองค์กร</Link>
        </li>
      </ul>
    </div>
  );
};

export default SlidingBar;
