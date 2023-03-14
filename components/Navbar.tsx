import React, { useState, useContext, useEffect } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import Image from "next/image";
import { MenuSlide, MenuSlideContext } from "../context/MenuSlideProvider";
import SlidingBar from "./SlidingBar";
import { useDispatch, useSelector } from "react-redux";
import { setLineUser } from "../store/auth-slice";
import { getDocs, collection } from "firebase/firestore";
import router from "next/router";
import { db } from "../firebase/firebaseConfig";
import { setUser } from "../store/user-slice";
import { RootState } from "../store";
import first from "../pages/first";

const Navbar = () => {
  const dispatch = useDispatch();
  const { openMenu } = useContext<MenuSlide>(MenuSlideContext);

  useEffect(() => {
    import("@line/liff").then((liff) => {
      liff
        .init({ liffId: "1660709285-D5QggOXl" })
        .then(async () => {
          if (liff.isLoggedIn()) {
            const profile = await liff.getProfile();

            dispatch(
              setLineUser({
                userId: profile.userId as string,
                pictureUrl: profile.pictureUrl,
              })
            );
          } else {
            liff.login();
          }
        })
        .catch(() => {
          console.log("error");
        });
    });

    
  }, []);

  const lineAuth = useSelector((state: RootState) => state.auth);

  const checkUserRegister = async (lineId: string) => {
    const querySnapshot = await getDocs(collection(db, "user"));
    let registered = false;
    querySnapshot.forEach((doc) => {
      // check id
      if (doc.data().line_id === lineId) {
        dispatch(
          setUser({
            firstName: doc.data().first_name,
            lastName: doc.data().last_name,
            userId: doc.id,
            companyId: doc.data().company_id,
            pictureUrl: doc.data().pictureUrl,
            accept_company: doc.data().accept_company,
          })
        );
        registered = true;
      }
    });
    if (registered) {
    } else {
      router.push("/first");
    }
  };

  if (lineAuth.userId !== "") {
    checkUserRegister(lineAuth.userId);
  }
  return (
    <div className="relative z-10">
      <div className="w-full h-20 bg-white p-5 flex justify-between items-center drop-shadow-lg">
        <div className="w-14 h-16 relative">
          <Image src="/images/logo.png" layout="fill" alt="mood" />
        </div>
        <AiOutlineMenu className="text-3xl" onClick={openMenu} />
      </div>
      <SlidingBar />
    </div>
  );
};

export default Navbar;
