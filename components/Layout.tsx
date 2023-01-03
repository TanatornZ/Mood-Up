import React, { useContext } from "react";
import { MenuSlide, MenuSlideContext } from "../context/MenuSlideProvider";
import Navbar from "./Navbar";

type layoutProp = {
  children: React.ReactNode;
};

function Layout({ children }: layoutProp) {
  const { isOpen, closeMenu } = useContext<MenuSlide>(MenuSlideContext);

  return (
    <div className="overflow-x-hidden h-screen">
      <Navbar />
      <main
        className={`p-5 bg-secondary min-h-[92%] ${isOpen ? "opacity-50" : ""}`}
      >
        {children}
      </main>
    </div>
  );
}

export default Layout;
