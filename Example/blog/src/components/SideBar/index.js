import React from "react";
import Link from "gatsby-link";

const SideBar = ({ siteMetadata }) => (
  <div className="sidebar pure-u-1 pure-u-md-1-4">
    <div className="header">
      <h1 className="brand-title">{siteMetadata.title}</h1>
      <h2 className="brand-tagline">
        Fear can hold you prisoner. Hope cna set you free.
      </h2>
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item">
            <Link className="pure-button" to="/">
              Home
            </Link>
          </li>
          <li className="nav-item" style={{ marginLeft: 8 }}>
            <Link className="pure-button" to="/archives">
              Archives
            </Link>
          </li>
          <li className="nav-item" style={{ marginLeft: 8 }}>
            <Link className="pure-button" to="/about">
              About
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  </div>
);

export default SideBar;
