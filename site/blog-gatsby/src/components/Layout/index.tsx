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
      {/* <SideBar siteMetadata={siteMetadata} /> */}
      <Header siteMetadata={siteMetadata} />
      <main className="pt-8 px-4 w-full mx-auto mt-[82px] md:mt-auto md:pt-[120px] md:w-3/4 md:px-12">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
