import React from "react";
import Helmet from "react-helmet";
import { StaticQuery, graphql } from "gatsby";
import Footer from "../Footer";
import SideBar from "../SideBar";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive.css";
import "./index.scss";
import "./common.scss";

export default ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
            subtitle
          }
        }
      }
    `}
    render={data => (
      <div id="layout" className="pure-g">
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            { name: "description", content: "Sample" },
            { name: "keywords", content: "sample, something" }
          ]}
        />
        <SideBar siteMetadata={data.site.siteMetadata} />
        {/* <Header siteMetadata={data.site.siteMetadata} /> */}
        <div className="content pure-u-1 pure-u-md-3-4">
          {children}
          <Footer />
        </div>
      </div>
    )}
  />
);
