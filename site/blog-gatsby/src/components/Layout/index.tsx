import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
import { css } from "@emotion/react";
import Footer from "../Footer";
import SideBar from "../SideBar";
import Header from "../Header";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    site: { siteMetadata },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );
  return (
    <>
      <SideBar siteMetadata={siteMetadata} />

      <div className="pt-8 px-4 overflow-hidden w-full md:pt-[120px] md:w-3/4 md:px-12 md:ml-[25%]">
        <Header siteMetadata={siteMetadata} />
        {children}
        <Footer />
      </div>
    </>
  );
};

export default Layout;
