import React from "react";
import Footer from "../Footer";
import SideBar from "../SideBar";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <>
    <SideBar />
    {/* <Header siteMetadata={data.site.siteMetadata} /> */}
    <div className="pt-8 px-4 overflow-hidden w-full md:w-3/4 md:px-12 md:ml-[25%]">
      {children}
      <Footer />
    </div>
  </>
);

export default Layout;
