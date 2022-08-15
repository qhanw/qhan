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
    <div className="content w-full md:w-3/4 md:ml-[25%]">
      {children}
      <Footer />
    </div>
  </>
);
