import React from "react";
import { Link, useStaticQuery, graphql } from "gatsby";
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
      <main className="container mx-auto px-4 pt-10">
        {children}
        <Footer />
      </main>
    </>
  );
};

export default Layout;
