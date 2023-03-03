import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { BsFillArrowRightCircleFill } from "react-icons/bs";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import { MenuSlide, MenuSlideContext } from "../context/MenuSlideProvider";
import { RootState } from "../store";

interface SlidingBarType {
  showSlide: boolean;
  setShowSlide: React.Dispatch<React.SetStateAction<boolean>>;
}

const SlidingBar = () => {
  const { isOpen, closeMenu } = useContext<MenuSlide>(MenuSlideContext);
  const user = useSelector((state: RootState) => state.user);

  return (
    <div
      className={`bg-secondary w-8/12 h-screen absolute top-0 transition-all duration-300	 ${
        isOpen ? "right-0" : " right-[-100%]"
      } p-5 items-center flex flex-col text-dark `}
    >
      <BsFillArrowRightCircleFill
        className=" text-4xl absolute top-4 right-4 "
        onClick={closeMenu}
      />

      <div className="flex flex-col items-center mt-12">
        <div className="relative w-32 h-32 rounded-full overflow-hidden">
          <Image
            src={user.pictureUrl}
            layout="fill"
            objectFit="cover"
            alt="user"
          />
        </div>
        <h1 className="text-xl p-5 mb-5 font-bold">{user.firstName}</h1>
      </div>
      <ul className="leading-[5em] text-center text-sm">
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
