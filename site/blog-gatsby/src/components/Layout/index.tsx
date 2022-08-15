import React from "react";
// import Header from "../Header";
import Footer from "../Footer";
import SideBar from "../SideBar";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive.css";
import "./index.scss";
import "./common.scss";

export default ({ children }: any) => (
  <div id="layout" className="pure-g">
    <SideBar />
    {/* <Header siteMetadata={data.site.siteMetadata} /> */}
    <div className="content pure-u-1 pure-u-md-3-4">
      {children}
      <Footer />
    </div>
  </div>
);
