import React from "react";
import Navbar from "./navbar";

type layoutProp = {
  children: React.ReactNode;
};

function Layout({ children }: layoutProp) {
  return (
    <div className="overflow-x-hidden h-screen">
      <Navbar />
      <main className="p-5 bg-secondary min-h-[92%]">{children}</main>
    </div>
  );
}

export default Layout;
