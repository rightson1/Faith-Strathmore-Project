import NavBar from "@/components/Navbar";
import React from "react";
import { childrenProps } from "@/types";

const Layout = ({ children }: childrenProps) => {
  return (
    <div
      className="bg-background  min-h-screen max-w-screen overflow-x-hidden 
    "
    >
      <NavBar />
      <div className="mt-20">{children}</div>
      {/* <Bottombar /> */}
    </div>
  );
};

export default Layout;
