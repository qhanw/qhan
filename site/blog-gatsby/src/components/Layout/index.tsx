import React from "react";
// import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
// import "purecss/build/pure.css";
// import "purecss/build/grids-responsive.css";

import "./common.scss";

export default ({ children }: any) => (
  <>
    <SideBar />
    {/* <Header siteMetadata={data.site.siteMetadata} /> */}
    <div className="pt-8 px-4 overflow-hidden w-full md:w-3/4 md:px-12 md:ml-[25%]">
      {children}
      <Footer />
    </div>
  </>
);
