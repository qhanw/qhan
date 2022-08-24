import React from "react";
import { css } from "@emotion/react";
import Footer from "../Footer";
import SideBar from "../SideBar";
import Header from "../Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <SideBar />

    <div
      className="pt-8 px-4 overflow-hidden w-full md:w-3/4 md:px-12 md:ml-[25%]"
      css={css`
        padding-top: 120px;
      `}
    >
      <Header />
      {children}
      <Footer />
    </div>
  </>
);

export default Layout;
