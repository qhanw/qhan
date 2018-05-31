import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import "purecss/build/pure.css";
import "purecss/build/grids-responsive.css";
import "./index.scss";
import "./common.scss";

const Layout = ({ children, data }) => (
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
      {children()}
      <Footer />
    </div>
  </div>
);

Layout.propTypes = {
  children: PropTypes.func
};

export default Layout;

export const query = graphql`
  query SiteTitleQuery {
    site {
      siteMetadata {
        title
        subtitle
      }
    }
  }
`;
